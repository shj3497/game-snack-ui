/// <reference types="vite/client" />

import {AdPopcornSdk} from './lib/utils/ad';
import {MezzoSdk} from './lib/utils/ad/mezzo-media';
import {DawinSdk} from './lib/utils/ad/dawin';

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_PUBLIC_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    AdPopcornSSPWebSDK?: AdPopcornSdk;
    mezzoAd?: MezzoSdk['mezzoAd'];
    dawin3?: DawinSdk;
  }
}
