import {FixedLengthArray} from '@/lib/utils/FixedLengthArray';
import {StateCreator} from 'zustand';
import {produce} from 'immer';

/**
 * 게임 점수 스토어 공통 타입
 * N: 게임별 최대 참여 횟수(배열 길이)
 * 기본값을 number 로 두어 기존 generic 미지정 코드도 동작하게 한다.
 */
export type GameScoreStore<N extends number = number> = {
  participationCount: number;
  isLimited: boolean; // 더 이상 참여 불가 여부
  isSuccess: boolean; // 한번이라도 success 가 나왔는지
  maxGameCount: N; // 게임별 최대 참여 횟수(=배열 길이)
  gameScores: FixedLengthArray<GameScoreItem, N>;
  setGameScores: (
    gameScore: FixedLengthArray<Omit<GameScoreItem, 'useAnimate'>, N>,
  ) => void;
  updateGameScores: (
    gameScore: Omit<GameScoreItem, 'useAnimate'>,
    endGame?: boolean,
  ) => void;
  reset: () => void;
};

export type GameScoreItem = {
  type: 'fail' | 'success' | 'normal';
  score?: string | null;
  useAnimate?: boolean;
};

/**
 * 주어진 길이만큼 기본 GameScoreItem 배열을 생성한다.
 */
export const defaultGameScores = <N extends number>(
  maxGameCount: N,
): FixedLengthArray<GameScoreItem, N> =>
  Array.from({length: maxGameCount}, () => ({
    type: 'normal',
    score: undefined,
    useAnimate: false,
  })) as FixedLengthArray<GameScoreItem, N>;

export const initGameScoreStore = <N extends number>(maxGameCount: N) => ({
  participationCount: 0,
  isLimited: false,
  isSuccess: false,
  maxGameCount,
  gameScores: defaultGameScores(maxGameCount),
});

const createGameScoreSlice =
  <N extends number>(maxGameCount: N): StateCreator<GameScoreStore<N>> =>
  (set, get) => ({
    ...initGameScoreStore(maxGameCount),
    setGameScores: (gameScores) => {
      const participationCount = gameScores.filter(
        (item) => item.type !== 'normal',
      ).length;
      const isSuccess = gameScores.some((item) => item.type === 'success');
      const isLimited = participationCount === maxGameCount || isSuccess;

      set(() => ({
        participationCount,
        isLimited,
        isSuccess,
        gameScores: gameScores.map((item) => ({
          ...item,
          useAnimate: false,
        })) as FixedLengthArray<GameScoreItem, N>,
      }));
    },

    updateGameScores: (gameScore) => {
      const count = get().participationCount;
      const isSuccess = gameScore.type === 'success';
      const isLimited = count + 1 === maxGameCount || isSuccess;

      set((state) => ({
        participationCount: count + 1,
        isLimited,
        isSuccess,
        gameScores: produce(state.gameScores, (draft) => {
          draft[count] = {...gameScore, useAnimate: true};
        }),
      }));

      // 애니메이션 flag 1초 후 해제
      setTimeout(() => {
        set((state) => ({
          gameScores: produce(state.gameScores, (draft) => {
            draft[count].useAnimate = false;
          }),
        }));
      }, 1000);
    },

    reset: () => set(() => initGameScoreStore(maxGameCount)),
  });

export default createGameScoreSlice;
