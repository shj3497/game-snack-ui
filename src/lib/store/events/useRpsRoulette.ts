import {create} from 'zustand';
import createGameScoreSlice, {GameScoreStore} from './common/game-score';

type RpsRouletteStore = GameScoreStore<3>;

const useRpsRouletteStore = create<RpsRouletteStore>(createGameScoreSlice(3));

export default useRpsRouletteStore;
