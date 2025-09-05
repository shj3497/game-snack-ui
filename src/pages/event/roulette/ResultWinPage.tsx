import {RouletteResultWin} from '@/components/_organisms/events/roulette';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {ResultWinLoaderResponse} from './loader';

const ResultWinPage = () => {
  const loaderData = useLoaderData() as ResultWinLoaderResponse;

  return (
    <GamePageLayout>
      <RouletteResultWin loaderData={loaderData} />
    </GamePageLayout>
  );
};

export default ResultWinPage;
