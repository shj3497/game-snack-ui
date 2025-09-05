import {RouletteIntro} from '@/components/_organisms/events/roulette';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {IntroLoaderResponse} from './loader';
import useRouletteStore from '@/lib/store/events/useRoulette';
import {useEffect} from 'react';
import {FixedLengthArray} from '@/lib/utils/FixedLengthArray';
import {GameScoreItem} from '@/lib/store/events/common/game-score';

const IntroPage = () => {
  const loaderData = useLoaderData() as IntroLoaderResponse;
  const initGameScores = useRouletteStore((store) => store.setGameScores);

  useEffect(() => {
    if (loaderData.gameScores.length === 0) return;
    initGameScores(loaderData.gameScores as FixedLengthArray<GameScoreItem, 1>);
  }, [loaderData]);

  return (
    <GamePageLayout>
      <RouletteIntro loaderData={loaderData} />
    </GamePageLayout>
  );
};
export default IntroPage;
