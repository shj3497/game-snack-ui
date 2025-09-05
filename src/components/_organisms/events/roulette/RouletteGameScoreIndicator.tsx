import GameScoreIndicator from '@/components/_molecules/GameScoreIndicator';
import useRouletteStore from '@/lib/store/events/useRoulette';

const RouletteGameScoreIndicator = () => {
  const {gameScores} = useRouletteStore();

  return <GameScoreIndicator gameScores={gameScores} successColor="#00FCFF" />;
};
export default RouletteGameScoreIndicator;
