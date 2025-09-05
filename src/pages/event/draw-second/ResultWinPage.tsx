import {DrawSecondResultWin} from '@/components/_organisms/events/draw-second';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {ResultWinLoaderResponse} from './loader';

const ResultWinPage = () => {
  const loaderData = useLoaderData() as ResultWinLoaderResponse;
  return (
    <GamePageLayout>
      <DrawSecondResultWin loaderData={loaderData} />
    </GamePageLayout>
  );
};

export default ResultWinPage;
