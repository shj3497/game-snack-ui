import GameScoreIndicator from '@/components/_molecules/GameScoreIndicator';
import useFindSecondStore from '@/lib/store/events/useFindSecond';

const FindSecondScoreIndicator = () => {
  const {gameScores} = useFindSecondStore();
  return <GameScoreIndicator gameScores={gameScores} />;
};
export default FindSecondScoreIndicator;
