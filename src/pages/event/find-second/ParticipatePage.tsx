import {FindSecondParticipate} from '@/components/_organisms/events/find-second';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {ParticipateLoaderResponse} from './loader';
import useFindSecondStore from '@/lib/store/events/useFindSecond';
import {useEffect} from 'react';
import {FixedLengthArray} from '@/lib/utils/FixedLengthArray';
import {GameScoreItem} from '@/lib/store/events/common/game-score';

const ParticipatePage = () => {
  const loaderData = useLoaderData() as ParticipateLoaderResponse;
  const initGameScores = useFindSecondStore((store) => store.setGameScores);
  const gameTime = loaderData.TIME;
  const gameCardCount = loaderData.CARD_COUNT;

  useEffect(() => {
    if (loaderData.gameScores.length === 0) return;
    initGameScores(loaderData.gameScores as FixedLengthArray<GameScoreItem, 3>);
  }, [loaderData]);
  return (
    <GamePageLayout>
      <FindSecondParticipate
        gameTime={gameTime}
        gameCardCount={gameCardCount}
      />
    </GamePageLayout>
  );
};
export default ParticipatePage;
