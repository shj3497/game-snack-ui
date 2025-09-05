import {useCallback, useEffect, useRef, useState} from 'react';
import {
  AdPopcornConfig,
  AdPopcornEventListener,
  AdPopcornEventListeners,
  adPopcornEventMap,
  AdPopcornInfo,
  useAdPopcornSdk,
} from '.';
import {isEqual} from 'lodash';

export const useAdPopcornNative = (config: AdPopcornConfig) => {
  const sdk = useAdPopcornSdk((store) => store.sdk);
  const [native, setNative] = useState<any>();
  const configRef = useRef<AdPopcornConfig>(undefined);

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

  const onGetData = useCallback(
    (eventListeners: AdPopcornEventListeners | undefined = {}) => {
      if (!sdk) return;
      sdk.cmd.push(() => {
        const native = sdk.createNative(optimalInfo);
        Object.entries(adPopcornEventMap).forEach(([key, name]) => {
          const listener: AdPopcornEventListener = (event) => {
            eventListeners[name]?.(event);

            //* 네이티브 배너의경우에만 로드 성공시 해당 report 함수 호출
            if (name === 'adLoadCompleted') {
              if (!event.isNoAd) {
                native.reportImpression();
              }
            }
          };
          native.addEventListener(key, listener);
          return () => native.removeEventListener(key, listener);
        });

        setNative(native);
        native.loadAd();
      });
    },
    [optimalInfo],
  );

  const onAdClick = useCallback(() => {
    if (!sdk || !native) return;
    sdk.cmd.push(() => {
      native.reportClick();
    });
  }, []);

  useEffect(() => {
    if (!sdk || !optimalInfo || !optimalConfig) return;
    sdk.cmd.push(() => {
      sdk.init(optimalInfo);
      sdk.setConfig(optimalConfig);
    });
  }, [optimalInfo, optimalConfig, sdk]);

  return {onGetData, onAdClick, native};
};
