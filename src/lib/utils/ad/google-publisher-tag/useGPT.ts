import {create} from 'zustand';

interface GPTReadyStore {
  isReady: boolean;
  isLoading: boolean;
  setIsReady: (isReady: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export const useGPTReady = create<GPTReadyStore>((set) => ({
  isReady: false,
  isLoading: false,
  setIsReady: (isReady) => set({isReady}),
  setIsLoading: (isLoading) => set({isLoading}),
  reset: () =>
    set({
      isReady: false,
      isLoading: false,
    }),
}));

interface GPTAdUnitPathStore {
  adUnitPath?: string;
  setAdUnitPath: (adUnitPath?: string) => void;
}

export const useGPTAdUnitPath = create<GPTAdUnitPathStore>((set) => ({
  adUnitPath: undefined,
  setAdUnitPath: (adUnitPath) => set({adUnitPath}),
}));
