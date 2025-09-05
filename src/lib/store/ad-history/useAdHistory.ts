import {create} from 'zustand';
import {AdHistoryStore} from './type';

const useAdHistory = create<AdHistoryStore>((set) => ({
  adHistory: [],
  setAdHistory: (adHistory) =>
    set((state) => ({
      adHistory: [adHistory, ...state.adHistory],
    })),
  reset: () => set({adHistory: []}),
}));

export default useAdHistory;
