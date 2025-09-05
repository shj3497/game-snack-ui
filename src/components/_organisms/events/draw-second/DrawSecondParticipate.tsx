import {FC, useRef, useState} from 'react';
import DrawSecondLayout from './DrawSecondLayout';
import {styled} from '@mui/material';
import DrawSecondScoreIndicator from './DrawSecondScoreIndicator';
import PlayButton from './PlayButton';
import {useNavigate} from 'react-router-dom';
import useDrawSecondStore from '@/lib/store/events/useDrawSecond';
import Timer, {TimerRef} from './Timer';
import DrawingSection from './DrawingSection';
import paths from '@/lib/utils/paths';
import {DiagramType} from '@/lib/utils/draw-second';
import {
  getCheckDrawEligibilityQueryKey,
  useSaveDrawMiniGameEntry,
} from '@/lib/service/api/mini-game/mini-game';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';
import queryClient from '@/lib/service/query-client';

interface Props {
  gameTime?: number;
  gameDiagram?: DiagramType;
}

const Inner = styled('div')`
  width: 360px;
  height: 740px;
  margin: 0 auto;
  position: relative;
  padding-top: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .draw-second-timer {
    margin-top: 45px;
    transform: translateX(9px);
  }

  .draw-section {
    height: 300px;
  }
`;

const ButtonWrap = styled('div')`
  width: 360px;
  position: absolute;
  bottom: 81px;
  padding: 0 21px;
`;

const DrawSecondParticipate: FC<Props> = ({
  gameTime = 6000,
  gameDiagram = 'square',
}) => {
  const navigate = useNavigate();
  const updateScore = useDrawSecondStore((store) => store.updateGameScores);
  const isLimited = useDrawSecondStore((store) => store.isLimited);
  const isSuccess = useDrawSecondStore((store) => store.isSuccess);

  const {adid, idfa, platform, clickKey, userId, pid} = useUserInfoConfig();

  const timerRef = useRef<TimerRef>(null);

  const [playState, setPlayState] = useState({
    isPlaying: false,
    isDisabled: false,
    isParticipated: false,
    isFinish: false,
  });

  const isDisabled = playState.isDisabled || isLimited || isSuccess;

  const {mutate, isPending} = useSaveDrawMiniGameEntry({
    mutation: {
      onSuccess: (data, {data: {percent}}) => {
        // const isSuccess = percent>=75;
        // if (isSuccess) {
        //   updateScore({
        //     type: 'success',
        //     score: `${percent}%`,
        //   });
        // } else {
        //   updateScore({
        //     type: 'fail',
        //     score: `${percent}%`,
        //   });
        // }

        queryClient.invalidateQueries({
          queryKey: getCheckDrawEligibilityQueryKey(pid, {userId}),
        });

        setTimeout(() => {
          goToNextPage(isSuccess);
        }, 3000);
      },
    },
  });

  const goToNextPage = (isSuccess: boolean) => {
    if (isSuccess) {
      navigate(paths.event.draw_second.result_win);
    } else {
      navigate(paths.event.draw_second.result_fail);
    }
  };

  const onGameStart = () => {
    setPlayState({
      isPlaying: true,
      isDisabled: false,
      isParticipated: true,
      isFinish: false,
    });
  };

  const onGameEnd = (score: number) => {
    onTimerEnd();
    const isSuccess = score >= 65;
    setTimeout(() => {
      const displayTime = timerRef.current?.getDisplayTime() || '0.00';

      mutate({
        publicEventId: pid,
        data: {
          idfa,
          adid,
          userId,
          clickKey,
          platform,
          seconds: +displayTime,
          percent: score,
        },
      });

      if (isSuccess) {
        updateScore({
          type: 'success',
          score: `${score}%`,
        });
      } else {
        updateScore({
          type: 'fail',
          score: `${score}%`,
        });
      }
    }, 3000);
  };

  const onTimerEnd = () => {
    console.log('timer end');
    setPlayState({
      isPlaying: false,
      isDisabled: false,
      isParticipated: true,
      isFinish: true,
    });
  };

  return (
    <DrawSecondLayout>
      <Inner>
        <DrawSecondScoreIndicator />

        <Timer
          ref={timerRef}
          className="draw-second-timer"
          totalTime={gameTime}
          isPlaying={playState.isPlaying}
          onTimerEnd={onTimerEnd}
        />

        <DrawingSection
          className="draw-section"
          diagram={gameDiagram}
          isPlaying={playState.isParticipated}
          isFinish={playState.isFinish}
          onGameEnd={onGameEnd}
        />

        <ButtonWrap>
          <PlayButton
            isPlaying={playState.isParticipated}
            loading={isPending}
            onGameStart={onGameStart}
            disabled={isDisabled}
          />
        </ButtonWrap>
      </Inner>
    </DrawSecondLayout>
  );
};
export default DrawSecondParticipate;
