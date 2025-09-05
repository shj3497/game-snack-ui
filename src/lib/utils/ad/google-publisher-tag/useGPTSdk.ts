import {create} from 'zustand';
import {GPTSdk} from '.';
import waitForVariable from '@/lib/utils/waitForVariable';

interface GPTStore {
  sdk: GPTSdk | null;
  setSdk: (sdk: GPTSdk) => void;
  init: () => Promise<void>;
}

export const useGPTSdk = create<GPTStore>((set) => ({
  sdk: null,
  setSdk: (sdk) => set({sdk}),
  init: async () => {
    const gptSdk = await waitForVariable(
      () => window.googletag,
      (value) => !!value,
    );

    set(() => ({
      sdk: gptSdk,
    }));
  },
}));
