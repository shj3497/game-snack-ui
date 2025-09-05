import {CatchSecondResultWin} from '@/components/_organisms/events/catch-second';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {ResultWinLoaderResponse} from './loader';

const ResultWinPage = () => {
  const loaderData = useLoaderData() as ResultWinLoaderResponse;
  return (
    <GamePageLayout>
      <CatchSecondResultWin loaderData={loaderData} />
    </GamePageLayout>
  );
};
export default ResultWinPage;
