import GameScroeIndicator from '@/components/_molecules/GameScoreIndicator';
import useRpsRouletteStore from '@/lib/store/events/useRpsRoulette';

const RpsRouletteGameScoreIndicator = () => {
  const gameScores = useRpsRouletteStore((store) => store.gameScores);
  return <GameScroeIndicator gameScores={gameScores} successColor="#00fcff" />;
};

export default RpsRouletteGameScoreIndicator;
