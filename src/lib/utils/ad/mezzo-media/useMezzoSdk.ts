import waitForVariable from '@/lib/utils/waitForVariable';
import {MezzoSdk} from './type';
import {create} from 'zustand';

interface MezzoSdkStore {
  sdk: MezzoSdk | null;
  setSdk: (sdk: MezzoSdk) => void;
  init: () => Promise<void>;
}

export const useMezzoSdk = create<MezzoSdkStore>((set) => ({
  sdk: null,
  setSdk: (sdk) => set({sdk}),
  init: async () => {
    const mezzoAd = await waitForVariable(
      () => window.mezzoAd,
      (value) => !!value,
    );

    set(() => ({
      sdk: {mezzoAd: mezzoAd!},
    }));
  },
}));
