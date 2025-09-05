import {create} from 'zustand';
import createGameScoreSlice, {GameScoreStore} from './common/game-score';

type FindSecondStore = GameScoreStore<3>;

const useFindSecondStore = create<FindSecondStore>(createGameScoreSlice(3));

export default useFindSecondStore;
