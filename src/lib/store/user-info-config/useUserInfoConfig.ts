import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {UserInfoConfigStore} from './type';
import {isIOS, isAndroid} from 'react-device-detect';
import queryString from 'query-string';

const getPlatform = (platform: string | null): 'IOS' | 'ANDROID' | 'ETC' => {
  if (!!platform) {
    return platform as 'IOS' | 'ANDROID';
  }

  if (isIOS) {
    return 'IOS';
  } else if (isAndroid) {
    return 'ANDROID';
  }

  return 'ETC';
};

const useUserInfoConfig = create(
  persist<UserInfoConfigStore>(
    (set) => ({
      pid: '',
      clickKey: '',
      userId: '',
      platform: '',
      adid: '',
      idfa: '',
      environment: '',
      updatePid: (pid) => set({pid}),
      updateClickKey: (clickKey) => set({clickKey}),
      updateUserId: (userId) => set({userId}),
      updatePlatform: (platform) => set({platform}),
      updateAdid: (adid) => set({adid}),
      updateIdfa: (idfa) => set({idfa}),
      updateEnvironment: (environment) => set({environment}),
      updateUserInfo: (userInfo) => {
        set((state) => ({
          ...state,
          ...userInfo,
        }));
      },
      init: () => {
        const searchParams = new URLSearchParams(window.location.search);
        const parsedSearchParams = queryString.parse(searchParams.toString());

        const pid = parsedSearchParams.pid as string | null;
        const clickKey = parsedSearchParams.click_key as string | null; //*
        const userId = parsedSearchParams.userId as string | null; //*
        const rawPlatform = parsedSearchParams.platform as string | null;
        const platform = getPlatform(rawPlatform);
        const adid = parsedSearchParams.adid as string | null;
        const idfa = parsedSearchParams.idfa as string | null;
        const environment = process.env.NODE_ENV || 'development';

        searchParams.delete('pid');
        searchParams.delete('click_key');
        searchParams.delete('userId');
        searchParams.delete('platform');
        searchParams.delete('adid');
        searchParams.delete('idfa');

        //*
        const appUid = parsedSearchParams.app_uid as string | null;
        searchParams.delete('app_uid');

        const uid = userId || appUid;

        const newUrl = queryString.stringifyUrl({
          url: window.location.pathname,
          query: queryString.parse(searchParams.toString()),
        });
        window.history.replaceState({}, '', newUrl);

        if (!pid && !clickKey && !userId && !rawPlatform && !adid && !idfa)
          return;

        set(() => ({
          pid: pid || '',
          clickKey: clickKey || '',
          userId: uid || '',
          platform: platform || 'ETC',
          adid: adid || '',
          idfa: idfa || '',
          environment,
        }));
      },
    }),
    {
      name: 'user-info',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: (_state) => (state) => {
        // _state : zustand state
        // state  : session storage state
        // session storage에 있는 상태를 확인 후 init 을 진행함

        if (!state) return;
        if (
          !state?.pid &&
          !state?.userId &&
          !state?.adid &&
          !state?.platform &&
          !state?.idfa &&
          !state?.clickKey
        ) {
          state.updatePid('test-pid');
          state.updateClickKey('test-clickKey');
          state.updateUserId('test-userId');
          state.updatePlatform('ETC');
          state.updateAdid('test-adid');
          state.updateIdfa('test-idfa');
          state.updateEnvironment(process.env.NODE_ENV || 'development');
        }
      },
    },
  ),
);

useUserInfoConfig.getState().init();

export default useUserInfoConfig;
