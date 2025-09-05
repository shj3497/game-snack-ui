import {FindSecondResultWin} from '@/components/_organisms/events/find-second';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {ResultWinLoaderResponse} from './loader';

const ResultWinPage = () => {
  const loaderData = useLoaderData() as ResultWinLoaderResponse;
  return (
    <GamePageLayout>
      <FindSecondResultWin loaderData={loaderData} />
    </GamePageLayout>
  );
};
export default ResultWinPage;
