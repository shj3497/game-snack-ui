import {useEffect, useRef} from 'react';
import {
  AdPopcornConfig,
  AdPopcornEventListener,
  AdPopcornEventListeners,
  AdPopcornInfo,
  useAdPopcornSdk,
  adPopcornEventMap,
} from '.';
import {isEqual} from 'lodash';

const useAdPopcornInterstitial = (config: AdPopcornConfig) => {
  const sdk = useAdPopcornSdk((store) => store.sdk);
  const configRef = useRef<AdPopcornConfig | undefined>(undefined);

  if (!isEqual(configRef.current, config)) {
    configRef.current = config;
  }
  const optimalInfo: AdPopcornInfo = {
    app_key: configRef.current?.app_key || '',
    placement_id: configRef.current?.placement_id || '',
  };
  const optimalConfig = {
    adid: configRef.current?.adid,
    idfa: configRef.current?.idfa,
  };

  const onAdOpen = (
    targetId: string,
    eventListeners: AdPopcornEventListeners = {},
  ) => {
    if (!sdk || !optimalInfo || !optimalConfig) return;

    sdk.cmd.push(() => {
      const interstitial = sdk.createInterstitial(optimalInfo);

      Object.entries(adPopcornEventMap).forEach(([key, name]) => {
        const listener: AdPopcornEventListener = (event) => {
          eventListeners[name]?.(event);
        };

        interstitial.addEventListener(key, listener);

        return () => interstitial.removeEventListener(key, listener);
      });

      interstitial.display(targetId);
    });
  };

  useEffect(() => {
    if (!sdk || !optimalInfo || !optimalConfig) return;
    sdk.cmd.push(() => {
      sdk.init(optimalInfo);
      sdk.setConfig(optimalConfig);
    });
  }, [optimalConfig, optimalInfo]);

  return {
    onAdOpen,
  };
};

export default useAdPopcornInterstitial;
