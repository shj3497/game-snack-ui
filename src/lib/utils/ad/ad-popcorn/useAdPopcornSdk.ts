import {create} from 'zustand';
import {AdPopcornSdk} from '.';
import waitForVariable from '@/lib/utils/waitForVariable';

interface AdPopcornSdkStore {
  sdk: AdPopcornSdk | null;
  setSdk: (sdk: AdPopcornSdk) => void;
  init: () => Promise<void>;
}

export const useAdPopcornSdk = create<AdPopcornSdkStore>((set) => ({
  sdk: null,
  setSdk: (sdk) => set({sdk}),
  init: async () => {
    const adpopcorn = await waitForVariable(
      () => window.AdPopcornSSPWebSDK,
      (value) => !!value,
    );

    set(() => ({
      sdk: adpopcorn,
    }));
  },
}));
