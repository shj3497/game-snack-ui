import {useEffect, useRef, useState} from 'react';
import {
  AdPopcornConfig,
  AdPopcornEventListener,
  AdPopcornEventListeners,
  AdPopcornVideoInfo,
  adPopcornEventMap,
  useAdPopcornSdk,
} from '.';
import {isEqual} from 'lodash';

export const useAdPopcornVideo = (config: AdPopcornConfig) => {
  const sdk = useAdPopcornSdk((store) => store.sdk);
  const [interstitialVideo, setInterstitialVideo] = useState<any>();

  const configRef = useRef<AdPopcornConfig>(undefined);

  if (!isEqual(configRef.current, config)) {
    configRef.current = config;
  }
  const optimalInfo: AdPopcornVideoInfo = {
    app_key: configRef.current?.app_key || '',
    placement_id: configRef.current?.placement_id || '',
    user_landing_enabled: false,
  };
  const optimalConfig = {
    adid: configRef.current?.adid,
    idfa: configRef.current?.idfa,
  };

  const onAdOpen = (
    targetId: string,
    eventListeners: AdPopcornEventListeners | undefined = {},
  ) => {
    if (!sdk || !optimalInfo || !optimalConfig) return;
    sdk.cmd.push(() => {
      const interstitialVideo = sdk.createInterstitialVideo(optimalInfo);

      Object.entries(adPopcornEventMap).forEach(([key, name]) => {
        const listener: AdPopcornEventListener = (event) => {
          eventListeners[name]?.(event);
        };

        interstitialVideo.addEventListener(key, listener);

        return () => interstitialVideo.removeEventListener(key, listener);
      });

      setInterstitialVideo(interstitialVideo);
      interstitialVideo.display(targetId);
    });
  };

  // 전면 비디오 광고 강제 제거 필요시 실행
  const onTerminateAd = (targetId: string) => {
    if (!sdk || !interstitialVideo) return;
    sdk.cmd.push(() => {
      interstitialVideo.terminateAd(targetId);
    });
  };

  useEffect(() => {
    if (!sdk || !optimalInfo || !optimalConfig) return;
    sdk.cmd.push(() => {
      sdk.init(optimalInfo);
      sdk.setConfig(optimalConfig);
    });
  }, [optimalInfo, optimalConfig]);

  return {onAdOpen, onTerminateAd};
};
