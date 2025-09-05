import {AdOrder} from '@/components/_organisms/ad/type';
import {AdPopcornConfig} from './ad-popcorn';
import {MezzoConfig} from './mezzo-media';
import {DawinConfig} from './dawin';
import {UserInfo} from '@/lib/store/user-info-config/type';
import {GPTConfig} from './google-publisher-tag';

type GPTAd = {
  android: GPTConfig;
  ios: GPTConfig;
  type: Extract<AdOrder, 'gpt_interstitial'>;
};

type AdPopcornAd = {
  ios: AdPopcornConfig;
  android: AdPopcornConfig;
  type: Extract<AdOrder, 'adpopcorn_interstitial' | 'adpopcorn_video'>;
};

type MezzoAd = {
  ios: MezzoConfig;
  android: MezzoConfig;
  type: Extract<AdOrder, 'mezzo_interstitial' | 'mezzo_video'>;
};
type DawinAd = {
  ios: DawinConfig;
  android: DawinConfig;
  type: Extract<AdOrder, 'dawin_video'>;
};

export type AdData = GPTAd | AdPopcornAd | MezzoAd | DawinAd;

const transAdConfigs = (
  adData: AdData[],
  userInfo: Pick<UserInfo, 'platform' | 'adid' | 'idfa'>,
) => {
  const {platform, adid, idfa} = userInfo;
  const isIos = platform === 'IOS';

  const gptConfig = (() => {
    const configs = adData
      .filter((item) => item.type === 'gpt_interstitial')
      .map(({type, ...item}) => ({
        ...item[isIos ? 'ios' : 'android'],
      }))
      .map((item) => item as GPTConfig);

    //* 구글 전면의 경우 하나밖에 없으므로 일단 0번째 인덱스로 고정
    return configs.length > 0 ? configs[0] : undefined;
  })();

  const adPopcornDaConfigs = (() => {
    const configs = adData
      .filter((item) => item.type === 'adpopcorn_interstitial')
      .map(({type, ...item}) => ({
        ...item[isIos ? 'ios' : 'android'],
        idfa,
        adid,
      }))
      .map((item) => item as AdPopcornConfig);
    return configs.length > 0 ? configs : undefined;
  })();

  const adPopcornVideoConfigs = (() => {
    const configs = adData
      .filter((item) => item.type === 'adpopcorn_video')
      .map(({type, ...item}) => ({
        ...item[isIos ? 'ios' : 'android'],
        idfa,
        adid,
      }))
      .map((item) => item as AdPopcornConfig);
    return configs.length > 0 ? configs : undefined;
  })();

  const mezzoDaConfigs = (() => {
    const configs = adData
      .filter((item) => item.type === 'mezzo_interstitial')
      .map(({type, ...item}) => ({
        ...item[isIos ? 'ios' : 'android'],
        adid,
      }))
      .map((item) => item as MezzoConfig);
    return configs.length > 0 ? configs : undefined;
  })();

  const mezzoVideoConfigs = (() => {
    const configs = adData
      .filter((item) => item.type === 'mezzo_video')
      .map(({type, ...item}) => ({
        ...item[isIos ? 'ios' : 'android'],
        adid,
      }))
      .map((item) => item as MezzoConfig);
    return configs.length > 0 ? configs : undefined;
  })();

  const dawinVideoConfigs = (() => {
    const configs = adData
      .filter((item) => item.type === 'dawin_video')
      .map(({type, ...item}) => ({
        ...item[isIos ? 'ios' : 'android'],
      }))
      .map((item) => item as DawinConfig);
    return configs.length > 0 ? configs : undefined;
  })();

  return {
    gptConfig,
    adPopcornDaConfigs,
    adPopcornVideoConfigs,
    mezzoDaConfigs,
    mezzoVideoConfigs,
    dawinVideoConfigs,
  };
};

export {transAdConfigs};
