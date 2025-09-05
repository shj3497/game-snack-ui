import {isEqual} from 'lodash';
import {
  MezzoInterstitialCallbacks,
  MezzoInterstitialConfigType,
  useMezzoSdk,
} from '.';
import {useRef} from 'react';

const defaultConfig: Partial<MezzoInterstitialConfigType> = {
  uAgeLevel: '1',
  keyword: '',
  closeBtn: true,
  closeBtnLocation: 3,
};

export const useMezzoMediaInterstitial = (
  config: MezzoInterstitialConfigType,
) => {
  const sdk = useMezzoSdk((store) => store.sdk);

  const configRef = useRef<MezzoInterstitialConfigType>(undefined);

  if (!isEqual(configRef.current, config)) {
    configRef.current = {...defaultConfig, ...config};
  }

  const optimalConfig = configRef.current;

  const onAdOpen = (eventListeners: MezzoInterstitialCallbacks = {}) => {
    if (!sdk || !optimalConfig) return;

    sdk.mezzoAd({
      ...optimalConfig,
      callbacks: eventListeners,
    });
  };

  return {onAdOpen};
};
