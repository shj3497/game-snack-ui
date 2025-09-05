import {DrawSecondParticipate} from '@/components/_organisms/events/draw-second';
import GamePageLayout from '@/components/layout/GamePageLayout';
import {useLoaderData} from 'react-router-dom';
import {useEffect} from 'react';
import {FixedLengthArray} from '@/lib/utils/FixedLengthArray';
import {GameScoreItem} from '@/lib/store/events/common/game-score';
import {ParticipateLoaderResponse} from './loader';
import useDrawSecondStore from '@/lib/store/events/useDrawSecond';

const ParticipatePage = () => {
  const loaderData = useLoaderData() as ParticipateLoaderResponse;
  const initgameScores = useDrawSecondStore((store) => store.setGameScores);
  // 모바일 브라우저 스크롤/움직임 방지
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  useEffect(() => {
    if (loaderData.gameScores.length === 0) return;
    initgameScores(loaderData.gameScores as FixedLengthArray<GameScoreItem, 3>);
  }, [loaderData]);

  return (
    <GamePageLayout>
      <DrawSecondParticipate
        gameDiagram={loaderData.DIAGRAM}
        gameTime={loaderData.TIME}
      />
    </GamePageLayout>
  );
};
export default ParticipatePage;
