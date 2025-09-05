import {useRef} from 'react';
import {MezzoVideoCallbacks, MezzoVideoConfigType, useMezzoSdk} from '.';
import {isEqual} from 'lodash';

const defaultConfig: Partial<MezzoVideoConfigType> = {
  elementMode: 'INJECTION',
  uAgeLevel: '1',
  keyword: '',
  closeBtn: true,
  autoPlay: true,
  autoReplay: false,
  clickFullArea: false,
  muted: true,
  viewability: true,
  soundBtn: true,
  clickBtn: false,
  skipBtn: true,
  postClick: 2,
};

export const useMezzoMediaVideo = (config: MezzoVideoConfigType) => {
  const sdk = useMezzoSdk((store) => store.sdk);
  const configRef = useRef<MezzoVideoConfigType>(undefined);

  if (!isEqual(configRef.current, config)) {
    configRef.current = {...defaultConfig, ...config};
  }

  const optimalConfig = configRef.current;

  const onVideoOpen = (eventListeners: MezzoVideoCallbacks = {}) => {
    if (!sdk || !optimalConfig) return;
    sdk.mezzoAd({...optimalConfig, callbacks: eventListeners});
  };

  return {onVideoOpen};
};
