import {FindSecondIntro} from '@/components/_organisms/events/find-second';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {IntroLoaderResponse} from './loader';
import useFindSecondStore from '@/lib/store/events/useFindSecond';
import {useEffect} from 'react';
import {FixedLengthArray} from '@/lib/utils/FixedLengthArray';
import {GameScoreItem} from '@/lib/store/events/common/game-score';

const IntroPage = () => {
  const loaderData = useLoaderData() as IntroLoaderResponse;
  const initGameScores = useFindSecondStore((store) => store.setGameScores);

  useEffect(() => {
    if (loaderData.gameScores.length === 0) return;
    initGameScores(loaderData.gameScores as FixedLengthArray<GameScoreItem, 3>);
  }, [loaderData]);
  return (
    <GamePageLayout>
      <FindSecondIntro loaderData={loaderData} />
    </GamePageLayout>
  );
};
export default IntroPage;
