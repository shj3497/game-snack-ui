import {create} from 'zustand';
import createGameScoreSlice, {GameScoreStore} from './common/game-score';

type CatchSecondStore = GameScoreStore<3>;

// 기본 최대 참여 3회
const useCatchSecondStore = create<CatchSecondStore>(createGameScoreSlice(3));

export default useCatchSecondStore;
