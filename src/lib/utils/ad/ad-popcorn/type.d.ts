export type AdPopcornSdk = {
  cmd: Array<any>;
  init: (info: AdPopcornInfo) => void;
  setConfig: (config: Pick<AdPopcornConfig, 'adid' | 'idfa'>) => void;
  createInterstitial: (info: AdPopcornInfo) => any;
  createNative: (info: AdPopcornInfo) => any;
  createInterstitialVideo: (info: AdPopcornInfo) => any;
  [key: string]: any;
};

export type AdPopcornConfig = {
  app_key: string;
  placement_id: string;
  adid?: string;
  idfa?: string;
};

export type AdPopcornInfo = Pick<AdPopcornConfig, 'app_key' | 'placement_id'>;
export type AdPopcornVideoInfo = AdPopcornInfo & {
  user_landing_enabled?: boolean;
};

export type AdPopcornEventListener = (event: any) => void;

export interface AdPopcornEventListeners {
  sdkError?: AdPopcornEventListener; // SDK 연동 실패
  adInventoryRendered?: AdPopcornEventListener; // 광고 렌더링 결과에 따른 이벤트처리
  adClicked?: AdPopcornEventListener; // 광고 클릭시
  adClosed?: AdPopcornEventListener; // 광고 닫기 클릭시
  adClickthrough?: AdPopcornEventListener; // user_landing_enabled가 false인 환경에서 광고 인벤토리 클릭시 발생
  adPlaybackCompleted?: AdPopcornEventListener; // 리워드 비디오 광고 재생 완료시 발생
  adLoadCompleted?: AdPopcornEventListener; // 광고 호출 결과에 따른 이벤트 처리
}

export interface AdPopcornNativeData {
  ctaText?: string;
  desc?: string;
  iconImageURL?: string;
  landingURL?: string;
  mainImageURL?: string;
  privacyPolicyImageURL?: string;
  privacyPolicyURL?: string;
  title?: string;
}
