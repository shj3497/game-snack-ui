export interface UserInfo {
  pid: string;
  clickKey: string;
  userId: string;
  platform: 'IOS' | 'ANDROID' | 'ETC' | '';
  adid: string;
  idfa: string;
  environment: string; // 'development' | 'test' | 'production'
}

export interface UserInfoConfigStore extends UserInfo {
  updatePid: (pid: string) => void;
  updateClickKey: (clickKey: string) => void;
  updateUserId: (userId: string) => void;
  updatePlatform: (platform: 'IOS' | 'ANDROID' | 'ETC' | '') => void;
  updateAdid: (adid: string) => void;
  updateIdfa: (idfa: string) => void;
  updateEnvironment: (environment: string) => void;
  updateUserInfo: (userInfo: Partial<UserInfo>) => void;
  init: () => void;
}
