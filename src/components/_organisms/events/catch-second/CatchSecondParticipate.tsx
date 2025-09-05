import {styled} from '@mui/material';
import CatchSecondLayout from './CatchSecondLayout';
import CatchSecondScoreIndicator from './CatchSecondScoreIndicator';
import {FC, useRef, useState} from 'react';
import PlayButton from './PlayButton';
import Clock from './Clock';
import StopWatch, {StopWatchRef} from './StopWatch';
import {useNavigate} from 'react-router-dom';
import useCatchSecondStore from '@/lib/store/events/useCatchSecond';
import paths from '@/lib/utils/paths';
import {
  getCheckCatchEligibilityQueryKey,
  useSaveCatchMiniGameEntry,
} from '@/lib/service/api/mini-game/mini-game';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';
import useAlert from '@/lib/store/useAlert';
import queryClient from '@/lib/service/query-client';

interface Props {
  gameTime?: number;
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

  .catch-second-clock {
    margin-top: 39px;
    margin-bottom: 12px;
  }
`;

const ButtonWrap = styled('div')`
  width: 360px;
  position: absolute;
  bottom: 81px;
  padding: 0 21px;

  .notice {
    margin: 0;
    margin-bottom: 12px;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: 23px; /* 143.75% */
    letter-spacing: -0.32px;
  }
`;

const CatchSecondParticipate: FC<Props> = ({gameTime = 6000}) => {
  const navigate = useNavigate();

  const onAlertOpen = useAlert((store) => store.onOpen);
  const updateScore = useCatchSecondStore((store) => store.updateGameScores);
  const isLimited = useCatchSecondStore((store) => store.isLimited);
  const isSuccess = useCatchSecondStore((store) => store.isSuccess);

  const {adid, idfa, platform, clickKey, userId, pid} = useUserInfoConfig();

  const [playState, setPlayState] = useState({
    isPlaying: false,
    isDisabled: false,
    isParticipated: false,
  });
  const stopWatchRef = useRef<StopWatchRef>(null);
  const isDisabled = playState.isDisabled || isLimited || isSuccess;

  const {mutate} = useSaveCatchMiniGameEntry({
    mutation: {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: getCheckCatchEligibilityQueryKey(pid, {userId}),
        });
        const seconds = variables.data.seconds;
        const milliseconds = seconds * 1000; // 초를 ms로 변환
        const lowerBound = 0 - 200; // TIME의 -0.2s
        const upperBound = 0 + 200; // TIME의 +0.2s
        const isSuccess =
          milliseconds >= lowerBound && milliseconds <= upperBound;
        if (isSuccess) {
          updateScore({
            type: 'success',
            score: String(seconds),
          });
        } else {
          updateScore({
            type: 'fail',
            score: String(seconds),
          });
        }
        setTimeout(() => {
          goToNextPage(isSuccess);
        }, 4000);
      },
      onError: (error: any) => {
        const message = error.response.data.detail.message;
        onAlertOpen(
          message || '오류가 발생했습니다.\n관리자에게 문의해주세요.',
        );
      },
    },
  });

  const goToNextPage = (isSuccess: boolean) => {
    if (isSuccess) {
      navigate(paths.event.catch_second.result_win);
    } else {
      navigate(paths.event.catch_second.result_fail);
    }
  };

  const onGameStart = () => {
    setPlayState({
      isPlaying: true,
      isDisabled: false,
      isParticipated: true,
    });
  };
  const onGameStop = () => {
    setPlayState({
      isPlaying: false,
      isDisabled: true,
      isParticipated: true,
    });

    setTimeout(() => {
      const displayTime = stopWatchRef.current?.getDisplayTime() || '0.00';
      // const displayTimeMs = +displayTime * 1000; // 초를 ms로 변환
      // const lowerBound = 0 - 100; // TIME의 -0.1s
      // const upperBound = 0 + 100; // TIME의 +0.1s

      // const isSuccess =
      //   displayTimeMs >= lowerBound && displayTimeMs <= upperBound;

      mutate({
        data: {
          adid,
          idfa,
          platform,
          clickKey,
          userId,
          seconds: +displayTime,
        },
        publicEventId: pid,
      });

      // if (isSuccess) {
      //   updateScore({
      //     type: 'success',
      //     score: String(displayTime),
      //   });
      // } else {
      //   updateScore({
      //     type: 'fail',
      //     score: String(displayTime),
      //   });
      // }

      // setTimeout(() => {
      //   goToNextPage(isSuccess);
      // }, 3000);
    }, 500);
  };
  return (
    <CatchSecondLayout>
      <Inner>
        <CatchSecondScoreIndicator />
        <Clock
          className="catch-second-clock"
          useAnimate={playState.isPlaying}
        />
        <StopWatch
          ref={stopWatchRef}
          isPlaying={playState.isPlaying}
          totalTime={gameTime}
          onTimerEnd={onGameStop}
        />
        <ButtonWrap>
          <p className="notice">0.00초에 맞춰 멈춤 버튼을 누르세요!</p>
          <PlayButton
            isPlaying={playState.isParticipated}
            onGameStart={onGameStart}
            onGameStop={onGameStop}
            disabled={isDisabled}
          />
        </ButtonWrap>
      </Inner>
    </CatchSecondLayout>
  );
};
export default CatchSecondParticipate;
