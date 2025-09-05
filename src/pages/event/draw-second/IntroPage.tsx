import {DrawSecondIntro} from '@/components/_organisms/events/draw-second';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {IntroLoaderResponse} from './loader';
import useDrawSecondStore from '@/lib/store/events/useDrawSecond';
import {useEffect} from 'react';
import {FixedLengthArray} from '@/lib/utils/FixedLengthArray';
import {GameScoreItem} from '@/lib/store/events/common/game-score';

const IntroPage = () => {
  const loaderData = useLoaderData() as IntroLoaderResponse;
  const initGameScores = useDrawSecondStore((store) => store.setGameScores);

  useEffect(() => {
    if (loaderData.gameScores.length === 0) return;
    initGameScores(loaderData.gameScores as FixedLengthArray<GameScoreItem, 3>);
  }, [loaderData]);
  return (
    <GamePageLayout>
      <DrawSecondIntro loaderData={loaderData} />
    </GamePageLayout>
  );
};
export default IntroPage;
