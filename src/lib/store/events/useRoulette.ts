import {create} from 'zustand';
import createGameScoreSlice, {GameScoreStore} from './common/game-score';

type RouletteStore = GameScoreStore<1>;

// 룰렛은 1회 제한
const useRouletteStore = create<RouletteStore>(createGameScoreSlice(1));

export default useRouletteStore;
