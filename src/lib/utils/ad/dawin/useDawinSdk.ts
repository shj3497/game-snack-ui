import {create} from 'zustand';
import {DawinSdk} from '.';
import waitForVariable from '@/lib/utils/waitForVariable';

interface DawinSdkStore {
  sdk: DawinSdk | null;
  setSdk: (sdk: DawinSdk) => void;
  init: () => Promise<void>;
}

export const useDawinAdSdk = create<DawinSdkStore>((set) => ({
  sdk: null,
  setSdk: (sdk) => set({sdk}),
  init: async () => {
    const dawin = await waitForVariable(
      () => window.dawin3,
      (value) => !!value,
    );

    set(() => ({
      sdk: dawin,
    }));
  },
}));
