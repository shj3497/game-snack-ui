import {useRef} from 'react';
import {DawinAdCallbacks, DawinAdConfig, useDawinAdSdk} from '.';
import {isEqual} from 'lodash';

const defaultConfig: Partial<DawinAdConfig> = {
  videoTimeout: 5000,
  zindex: 1000,
  protocol: window.location.protocol.slice(0, -1) as 'http' | 'https',
};

export const useDawinAdVideo = (config: DawinAdConfig) => {
  const sdk = useDawinAdSdk((store) => store.sdk);
  const configRef = useRef<DawinAdConfig>(undefined);

  if (!isEqual(configRef.current, config)) {
    configRef.current = {...defaultConfig, ...config};
  }
  const optimalConfig = configRef.current;

  const onVideoOpen = (eventListeners: DawinAdCallbacks | undefined = {}) => {
    if (!sdk || !optimalConfig) return;

    sdk.initAd({
      ...optimalConfig,
      callback: {
        ...eventListeners,
        onAdLoaded: (key: string) => {
          eventListeners.onAdLoaded?.(key);
          sdk.startAd();
        },
      },
    });
  };

  return {onVideoOpen};
};
