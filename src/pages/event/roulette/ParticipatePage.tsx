import {RouletteParticipate} from '@/components/_organisms/events/roulette';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {ParticipateLoaderResponse} from './loader';
import useRouletteStore from '@/lib/store/events/useRoulette';
import {useEffect} from 'react';
import {FixedLengthArray} from '@/lib/utils/FixedLengthArray';
import {GameScoreItem} from '@/lib/store/events/common/game-score';

const ParticipatePage = () => {
  const loaerData = useLoaderData() as ParticipateLoaderResponse;
  const initGameScores = useRouletteStore((store) => store.setGameScores);

  useEffect(() => {
    if (loaerData.gameScores.length === 0) return;
    initGameScores(loaerData.gameScores as FixedLengthArray<GameScoreItem, 1>);
  }, [loaerData]);

  return (
    <GamePageLayout>
      <RouletteParticipate systemRate={loaerData.rate} />
    </GamePageLayout>
  );
};
export default ParticipatePage;
