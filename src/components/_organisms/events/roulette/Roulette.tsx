import {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import useRouletteStore from '@/lib/store/events/useRoulette';
import {RouletteView, RouletteViewRef} from './RouletteView';
import {useNavigate} from 'react-router-dom';
import paths from '@/lib/utils/paths';
import {
  getCheckRouletteEligibilityQueryKey,
  useSaveRouletteMiniGameEntry,
} from '@/lib/service/api/mini-game/mini-game';
import queryClient from '@/lib/service/query-client';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';

interface Props extends HTMLAttributes<HTMLDivElement> {
  systemRate: number;
}

export type RouletteRef = {
  startRoulette: () => void;
};

const Roulette = forwardRef<RouletteRef, Props>(
  ({systemRate, ...props}, ref) => {
    const navigate = useNavigate();
    const {adid, idfa, platform, clickKey, userId, pid} = useUserInfoConfig();

    const viewRef = useRef<RouletteViewRef>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [point, setPoint] = useState<number | null>(null);
    const [userRate, setUserRate] = useState<number | null>(null);

    const updateScore = useRouletteStore((store) => store.updateGameScores);
    const isLimited = useRouletteStore((store) => store.isLimited);

    const disabled = isAnimating || isLimited;

    const {mutate} = useSaveRouletteMiniGameEntry({
      mutation: {
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries({
            queryKey: getCheckRouletteEligibilityQueryKey(pid, {userId}),
          });
          const userRate = variables.data.rate;
          const isWin = userRate <= systemRate;

          setTimeout(() => {
            goToNextPage(isWin);
          }, 4000);
        },
        onError: () => {},
      },
    });

    const goToNextPage = (isSuccess: boolean) => {
      if (isSuccess) {
        navigate(paths.event.roulette.result_win);
      } else {
        navigate(paths.event.roulette.result_fail);
      }
    };

    const entryRoulette = async (): Promise<{
      point: number;
      userRate: number;
    }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const userRate = Math.random() * 100;
          const isWin = userRate <= systemRate;
          resolve({
            point: isWin ? 1 : 0,
            userRate,
          });
        }, 2000);
      });
    };

    const onStart = async () => {
      if (isLimited) {
        alert('하루에 1회만 참여 가능합니다.');
      }
      if (disabled) return;

      setIsAnimating(true);

      const {point, userRate} = await entryRoulette();

      setPoint(point);
      setUserRate(userRate);
      viewRef.current?.rotateRoulette(point);
    };

    const updateScoreIndicator = (point: number) => {
      const scoreText = point === 0 ? '꽝' : `획득!`;
      const type = point === 0 ? 'fail' : 'success';

      updateScore({type, score: scoreText});
    };

    useEffect(() => {
      if (!viewRef.current?.rouletteRef.current) return;
      if (point === null) return;
      if (userRate === null) return;

      viewRef.current?.rouletteRef.current.addEventListener(
        'transitionend',
        () => {
          updateScoreIndicator(point);

          mutate({
            data: {adid, idfa, platform, clickKey, userId, rate: userRate},
            publicEventId: pid,
          });
        },
      );
    }, [userRate, point, updateScoreIndicator]);

    useImperativeHandle(ref, () => ({
      startRoulette: onStart,
    }));

    return <RouletteView {...props} ref={viewRef} onStart={onStart} />;
  },
);

export default Roulette;
