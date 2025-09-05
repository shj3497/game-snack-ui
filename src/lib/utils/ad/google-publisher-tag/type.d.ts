export type GPTSdk = typeof googletag;

export type GPTConfig = {
  adUnitPath: string;
};

export type EventListeners = {
  gptAdUsable?: (isUsable?: boolean) => void;
};

export type GPTRewardEventListeners = {
  onGranted?: (payload: googletag.Reward | null) => void;
  onClosedBeforeGrant?: () => void;
  onClosedAfterGrant?: () => void;
  onLoadFailed?: () => void;
  onReady?: () => void;
};

export type GPTInterstitialEventListeners = {
  onLoadFailed?: () => void;
  onReady?: () => void;
};
