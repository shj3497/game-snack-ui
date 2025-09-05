import GameScoreIndicator from '@/components/_molecules/GameScoreIndicator';
import useDrawSecondStore from '@/lib/store/events/useDrawSecond';

const DrawSecondScoreIndicator = () => {
  const {gameScores} = useDrawSecondStore();
  return <GameScoreIndicator gameScores={gameScores} />;
};
export default DrawSecondScoreIndicator;
