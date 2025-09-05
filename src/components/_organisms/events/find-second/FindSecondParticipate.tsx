import {FC, useRef, useState} from 'react';
import FindSecondLayout from './FindSecondLayout';
import {styled} from '@mui/material';
import FindSecondScoreIndicator from './FindSecondScoreIndicator';
import PlayButton from './PlayButton';
import {useNavigate} from 'react-router-dom';
import useFindSecondStore from '@/lib/store/events/useFindSecond';
import paths from '@/lib/utils/paths';
import Timer from './Timer';
import {PlayingTimerRef} from './PlayingTimer';
import FindBoxSection from './FindBoxSection';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';
import {
  getCheckFindEligibilityQueryKey,
  useSaveFindMiniGameEntry,
} from '@/lib/service/api/mini-game/mini-game';
import {PlayingFlipCardsRef} from './PlayingFlipCards';
import queryClient from '@/lib/service/query-client';

interface Props {
  gameTime?: number;
  gameCardCount?: number;
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

  .find-second-timer {
    margin-top: 32px;
    margin-bottom: 21px;
    transform: translateX(9px);
  }
`;

const ButtonWrap = styled('div')`
  width: 360px;
  position: absolute;
  bottom: 81px;
  padding: 0 21px;
`;

const FindSecondParticipate: FC<Props> = ({
  gameTime = 6000,
  gameCardCount = 5,
}) => {
  const introducingCountTime = 3900;
  const introducingTime = 8000;

  const navigate = useNavigate();
  const updateScore = useFindSecondStore((store) => store.updateGameScores);
  const isLimited = useFindSecondStore((store) => store.isLimited);
  const isSucceeded = useFindSecondStore((store) => store.isSuccess);

  const {adid, idfa, platform, clickKey, userId, pid} = useUserInfoConfig();

  const timerRef = useRef<PlayingTimerRef>(null);
  const gameRef = useRef<PlayingFlipCardsRef>(null);

  const [playState, setPlayState] = useState({
    isPlaying: false, // 유저가 카드 실제 선택중 여부
    isIntroducing: false, // 유저가 카드 선택하기 이전인 카드 소개중 여부
    isParticipated: false, // 게임 참여 여부
    isDisabled: false, // 게임 참가 불가 여부
    isFinish: false, // 게임 종료 여부
  });

  const isDisabled = playState.isDisabled || isLimited || isSucceeded;

  const {mutate, isPending} = useSaveFindMiniGameEntry({
    mutation: {
      onSuccess: (data, {data: {cards}}) => {
        const isSuccess = cards.split(',').length === gameCardCount;
        queryClient.invalidateQueries({
          queryKey: getCheckFindEligibilityQueryKey(pid, {userId}),
        });
        setTimeout(() => {
          goToNextPage(isSuccess);
        }, 5000);
      },
    },
  });

  const goToNextPage = (isSuccess: boolean) => {
    if (isSuccess) {
      navigate(paths.event.find_second.result_win);
    } else {
      navigate(paths.event.find_second.result_fail);
    }
  };

  const onIntroducingStart = () => {
    setPlayState({
      isPlaying: false,
      isIntroducing: true,
      isParticipated: true,
      isDisabled: false,
      isFinish: false,
    });
  };

  const onGameEnd = (isSuccess: boolean = false) => {
    onStopTimer();
    setTimeout(() => {
      const displayTime = timerRef.current?.getDisplayTime() || '0.00';
      const openCards = gameRef.current?.getOpenCards() || [];
      const cards = openCards.join(',');

      mutate({
        publicEventId: pid,
        data: {
          adid,
          idfa,
          platform,
          clickKey,
          userId,
          seconds: +displayTime,
          cards,
        },
      });

      if (isSuccess) {
        updateScore({
          type: 'success',
          score: '성공',
        });
      } else {
        updateScore({
          type: 'fail',
          score: '실패',
        });
      }
    }, 500);
  };

  //* === onGameStart ===
  const onIntroducingEnd = () => {
    setPlayState({
      isPlaying: true,
      isIntroducing: false,
      isParticipated: true,
      isDisabled: false,
      isFinish: false,
    });
  };

  const onStopTimer = () => {
    setPlayState({
      isPlaying: false,
      isIntroducing: false,
      isParticipated: true,
      isDisabled: false,
      isFinish: true,
    });
  };

  return (
    <FindSecondLayout>
      <Inner>
        <FindSecondScoreIndicator />

        <Timer
          ref={timerRef}
          className="find-second-timer"
          totalTime={gameTime}
          isPlaying={playState.isPlaying}
          isIntroducing={playState.isIntroducing}
          isParticipated={playState.isParticipated}
          introducingCountTime={introducingCountTime}
          introducingTime={introducingTime}
          onIntroducingEnd={onIntroducingEnd}
          onTimerEnd={onGameEnd}
        />

        <FindBoxSection
          ref={gameRef}
          isPlaying={playState.isPlaying}
          isIntroducing={playState.isIntroducing}
          isParticipated={playState.isParticipated}
          isFinish={playState.isFinish}
          searchCount={gameCardCount}
          onGameEnd={onGameEnd}
        />

        <ButtonWrap>
          <PlayButton
            isPlaying={playState.isParticipated}
            loading={isPending}
            onGameStart={onIntroducingStart}
            disabled={isDisabled}
          />
        </ButtonWrap>
      </Inner>
    </FindSecondLayout>
  );
};
export default FindSecondParticipate;
