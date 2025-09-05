import {CatchSecondParticipate} from '@/components/_organisms/events/catch-second';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {ParticipateLoaderResponse} from './loader';
import useCatchSecondStore from '@/lib/store/events/useCatchSecond';
import {FixedLengthArray} from '@/lib/utils/FixedLengthArray';
import {GameScoreItem} from '@/lib/store/events/common/game-score';
import {useEffect} from 'react';

const ParticipatePage = () => {
  const loaderData = useLoaderData() as ParticipateLoaderResponse;
  const initGameScores = useCatchSecondStore((store) => store.setGameScores);

  useEffect(() => {
    if (loaderData.gameScores.length === 0) return;
    initGameScores(loaderData.gameScores as FixedLengthArray<GameScoreItem, 3>);
  }, [loaderData]);
  return (
    <GamePageLayout>
      <CatchSecondParticipate gameTime={loaderData.TIME} />
    </GamePageLayout>
  );
};
export default ParticipatePage;
