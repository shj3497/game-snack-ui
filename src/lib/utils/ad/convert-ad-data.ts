import {
  AdPopcornAdConfig,
  MezzoAdConfig,
  DawinAdConfig,
  EventAdPlacementInfoItems,
  GoogleAdConfig,
} from '@/lib/service/api/model';
import {AdPopcornConfig, MezzoConfig, DawinConfig, GPTConfig} from '.';
import {UserInfo} from '@/lib/store/user-info-config/type';

const convertAdData = (
  apiAdData: EventAdPlacementInfoItems[],
  userInfo: Pick<UserInfo, 'platform' | 'adid' | 'idfa'>,
) => {
  const {platform, adid, idfa} = userInfo;
  const isIos = platform === 'IOS';

  const gptInterstitialConfig: GPTConfig | undefined = (() => {
    const configs = apiAdData
      .filter((item) => item.adOrderType === 'gpt_interstitial')
      .map(({adOrderType, sort, ...item}) => ({
        ...(item[isIos ? 'ios' : 'android'] as GoogleAdConfig),
      }))
      .map(({adUnitPath}) => ({
        adUnitPath,
      }));

    return configs.length > 0 ? configs[0] : undefined;
  })();

  const gptRewardConfig: GPTConfig | undefined = (() => {
    const configs = apiAdData
      .filter((item) => item.adOrderType === 'gpt_reward')
      .map(({adOrderType, sort, ...item}) => ({
        ...(item[isIos ? 'ios' : 'android'] as GoogleAdConfig),
      }))
      .map(({adUnitPath}) => ({
        adUnitPath,
      }));

    return configs.length > 0 ? configs[0] : undefined;
  })();

  const adPopcornDaConfigs: AdPopcornConfig[] | undefined = (() => {
    const configs = apiAdData
      .filter((item) => item.adOrderType === 'adpopcorn_interstitial')
      .map(({adOrderType, sort, ...item}) => ({
        ...(item[isIos ? 'ios' : 'android'] as AdPopcornAdConfig),
      }))
      .map(({name, appKey, placementId}) => ({
        app_key: appKey,
        placement_id: placementId,
        idfa,
        adid,
      }));
    return configs.length > 0 ? configs : undefined;
  })();

  const adPopcornVideoConfigs: AdPopcornConfig[] | undefined = (() => {
    const configs = apiAdData
      .filter((item) => item.adOrderType === 'adpopcorn_video')
      .map(({adOrderType, sort, ...item}) => ({
        ...(item[isIos ? 'ios' : 'android'] as AdPopcornAdConfig),
      }))
      .map(({name, appKey, placementId}) => ({
        app_key: appKey,
        placement_id: placementId,
        idfa,
        adid,
      }));
    return configs.length > 0 ? configs : undefined;
  })();

  const mezzoDaConfigs: MezzoConfig[] | undefined = (() => {
    const configs = apiAdData
      .filter((item) => item.adOrderType === 'mezzo_interstitial')
      .map(({adOrderType, sort, ...item}) => ({
        ...(item[isIos ? 'ios' : 'android'] as MezzoAdConfig),
      }))
      .map(({name, media, publisher, section}) => ({
        media,
        publisher,
        section,
        adid,
      }));
    return configs.length > 0 ? configs : undefined;
  })();

  const mezzoVideoConfigs: MezzoConfig[] | undefined = (() => {
    const configs = apiAdData
      .filter((item) => item.adOrderType === 'mezzo_video')
      .map(({adOrderType, sort, ...item}) => ({
        ...(item[isIos ? 'ios' : 'android'] as MezzoAdConfig),
      }))
      .map(({name, media, publisher, section}) => ({
        media,
        publisher,
        section,
        adid,
      }));
    return configs.length > 0 ? configs : undefined;
  })();

  const dawinVideoConfigs: DawinConfig[] | undefined = (() => {
    const configs = apiAdData
      .filter((item) => item.adOrderType === 'dawin_video')
      .map(({adOrderType, sort, ...item}) => ({
        ...(item[isIos ? 'ios' : 'android'] as DawinAdConfig),
      }))
      .map(({name, adSlotId}) => ({
        adslotid: adSlotId,
      }));
    return configs.length > 0 ? configs : undefined;
  })();

  return {
    gptInterstitialConfig,
    gptRewardConfig,
    adPopcornDaConfigs,
    adPopcornVideoConfigs,
    mezzoDaConfigs,
    mezzoVideoConfigs,
    dawinVideoConfigs,
  };
};

export {convertAdData};
