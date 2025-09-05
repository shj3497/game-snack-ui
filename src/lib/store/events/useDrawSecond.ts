import {create} from 'zustand';
import createGameScoreSlice, {GameScoreStore} from './common/game-score';

type DrawSecondStore = GameScoreStore<3>;

const useDrawSecondStore = create<DrawSecondStore>(createGameScoreSlice(3));

export default useDrawSecondStore;
