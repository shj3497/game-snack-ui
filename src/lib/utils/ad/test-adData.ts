import {AdOrder} from '@/components/_organisms/ad/type';
import {AdPopcornConfig, DawinConfig, GPTConfig, MezzoConfig} from '.';
import {AdData} from './transAdConfigs';
import testConfig from './ad-popcorn/test-config';

const gptInterstitial: {
  android: GPTConfig;
  ios: GPTConfig;
  type: Extract<AdOrder, 'gpt_interstitial'>;
} = {
  android: {
    adUnitPath:
      '/23189939835/ca-pub-2467098367795773-tag/pen_solpay_MWEB_sh_5catch_Interstitials_1x1',
  },
  ios: {
    adUnitPath:
      '/23189939835/ca-pub-2467098367795773-tag/pen_solpay_MWEB_sh_5catch_Interstitials_1x1',
  },
  type: 'gpt_interstitial',
};

const adPopcornDa_01: {
  android: AdPopcornConfig;
  ios: AdPopcornConfig;
  type: Extract<AdOrder, 'adpopcorn_interstitial'>;
} = {
  android: {
    app_key: testConfig.interstitial.android.app_key,
    placement_id: 'interstitial-abab',
  },
  ios: {
    app_key: testConfig.interstitial.ios.app_key,
    placement_id: 'interstitial-abab',
  },
  type: 'adpopcorn_interstitial',
};
const adPopcornDa_02: {
  android: AdPopcornConfig;
  ios: AdPopcornConfig;
  type: Extract<AdOrder, 'adpopcorn_interstitial'>;
} = {...testConfig.interstitial, type: 'adpopcorn_interstitial'};

const adPopcornVideo_01: {
  android: AdPopcornConfig;
  ios: AdPopcornConfig;
  type: Extract<AdOrder, 'adpopcorn_video'>;
} = {
  android: {
    app_key: testConfig.video.android.app_key,
    placement_id: 'video-abab',
  },
  ios: {app_key: testConfig.video.ios.app_key, placement_id: 'video-abab'},
  type: 'adpopcorn_video',
};

const adPopcornVideo_02: {
  android: AdPopcornConfig;
  ios: AdPopcornConfig;
  type: Extract<AdOrder, 'adpopcorn_video'>;
} = {...testConfig.video, type: 'adpopcorn_video'};

const mezzoMediaDa_01: {
  android: MezzoConfig;
  ios: MezzoConfig;
  type: Extract<AdOrder, 'mezzo_interstitial'>;
} = {
  android: {publisher: '1714', media: '33010', section: '810186'},
  ios: {publisher: '1714', media: '33010', section: '810186'},
  type: 'mezzo_interstitial',
};

const mezzoMediaDa_02: {
  android: MezzoConfig;
  ios: MezzoConfig;
  type: Extract<AdOrder, 'mezzo_interstitial'>;
} = {
  android: {publisher: '1714', media: '33010', section: '810547'},
  ios: {publisher: '1714', media: '33010', section: '810547'},
  type: 'mezzo_interstitial',
};
const mezzoVideo_01: {
  android: MezzoConfig;
  ios: MezzoConfig;
  type: Extract<AdOrder, 'mezzo_video'>;
} = {
  android: {publisher: '1714', media: '33010', section: '810555'},
  ios: {publisher: '1714', media: '33010', section: '810556'},
  type: 'mezzo_video',
};

const dawinVideo_01: {
  android: DawinConfig;
  ios: DawinConfig;
  type: Extract<AdOrder, 'dawin_video'>;
} = {
  android: {adslotid: '5OVMLQFG21I6'},
  ios: {adslotid: '5OVMLQFG21I9'},
  type: 'dawin_video',
};

const testAdData: AdData[] = [
  // gptInterstitial,
  adPopcornDa_01,
  adPopcornDa_02,
  // adPopcornVideo_01,
  // adPopcornVideo_02,
  mezzoMediaDa_01,
  mezzoMediaDa_02,
  mezzoVideo_01,
  dawinVideo_01,
];

export {testAdData};
