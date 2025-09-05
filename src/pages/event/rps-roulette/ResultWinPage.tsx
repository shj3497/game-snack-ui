import {RpsRouletteResultWin} from '@/components/_organisms/events/rps-roulette';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData, useSearchParams} from 'react-router-dom';
import {ResultWinLoaderResponse} from './loader';

const ResultWinPage = () => {
  const loaderData = useLoaderData() as ResultWinLoaderResponse;
  const [params] = useSearchParams();
  const point = params.get('point');
  return (
    <GamePageLayout>
      <RpsRouletteResultWin point={point} loaderData={loaderData} />
    </GamePageLayout>
  );
};
export default ResultWinPage;
