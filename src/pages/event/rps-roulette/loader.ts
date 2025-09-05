import {AdOrder} from '@/components/_organisms/ad/type';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';

import {useGPTReady} from '@/lib/utils/ad/google-publisher-tag/useGPT';
import {testAdData} from '@/lib/utils/ad/test-adData';
import {transAdConfigs} from '@/lib/utils/ad/transAdConfigs';

const introLoader = async () => {
  const apiResponse = {
    isNoAdPass: false,
    adData: testAdData,
  };
  const {adData, isNoAdPass} = apiResponse;
  const {platform, adid, idfa} = useUserInfoConfig.getState();

  const useGPTAd = adData.some((item) => item.type === 'gpt_interstitial');
  if (useGPTAd) {
    useGPTReady.setState({isLoading: true});
  }

  const adOrder: AdOrder[] = adData
    .map((item) => item.type)
    .filter((item) => item !== 'gpt_interstitial');
  if (isNoAdPass) {
    adOrder.push('pass');
  }

  const adConfigs = transAdConfigs(adData, {platform, adid, idfa});

  const response = {
    ads: {
      adConfigs,
      adOrder,
    },
  };

  return response;
};

const resultWinLoader = async () => {
  const apiResponse = {
    isNoAdPass: true,
    adData: testAdData,
  };
  const {adData, isNoAdPass} = apiResponse;
  const {platform, adid, idfa} = useUserInfoConfig.getState();

  const useGPTAd = adData.some((item) => item.type === 'gpt_interstitial');
  if (useGPTAd) {
    useGPTReady.setState({isLoading: true});
  }

  const adOrder: AdOrder[] = adData
    .map((item) => item.type)
    .filter((item) => item !== 'gpt_interstitial');

  if (isNoAdPass) {
    adOrder.push('pass');
  }

  const adConfigs = transAdConfigs(adData, {platform, adid, idfa});

  const response = {
    ads: {
      adConfigs,
      adOrder,
    },
  };

  return response;
};

type IntroLoaderResponse = Awaited<ReturnType<typeof introLoader>>;
type ResultWinLoaderResponse = Awaited<ReturnType<typeof resultWinLoader>>;

export {introLoader, resultWinLoader};
export type {IntroLoaderResponse, ResultWinLoaderResponse};
