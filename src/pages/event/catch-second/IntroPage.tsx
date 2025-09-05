import {CatchSecondIntro} from '@/components/_organisms/events/catch-second';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {IntroLoaderResponse} from './loader';
import {useEffect} from 'react';
import useCatchSecondStore from '@/lib/store/events/useCatchSecond';
import {FixedLengthArray} from '@/lib/utils/FixedLengthArray';
import {GameScoreItem} from '@/lib/store/events/common/game-score';

const IntroPage = () => {
  const loaderData = useLoaderData() as IntroLoaderResponse;
  const initGameScores = useCatchSecondStore((store) => store.setGameScores);

  useEffect(() => {
    if (loaderData.gameScores.length === 0) return;
    initGameScores(loaderData.gameScores as FixedLengthArray<GameScoreItem, 3>);
  }, [loaderData]);

  return (
    <GamePageLayout>
      <CatchSecondIntro loaderData={loaderData} />
    </GamePageLayout>
  );
};
export default IntroPage;
