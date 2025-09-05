import GameScoreIndicator from '@/components/_molecules/GameScoreIndicator';
import useCatchSecondStore from '@/lib/store/events/useCatchSecond';

const CatchSecondScoreIndicator = () => {
  const {gameScores} = useCatchSecondStore();
  return <GameScoreIndicator gameScores={gameScores} />;
};
export default CatchSecondScoreIndicator;
