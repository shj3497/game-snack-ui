import {
  AdPopcornConfig,
  DawinConfig,
  GPTConfig,
  GPTInterstitialEventListeners,
  MezzoConfig,
} from '@/lib/utils/ad';
import {AdOrder} from './type';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  InterstitialDialog as GPTInterstitialDialog,
  RewardVideoDialog as GPTRewardDialog,
  RewardVideoDialogRef as GPTRewardDialogRef,
} from './google-publisher-tag';

import {
  InterstitialDialog as AdPopcornDaDialog,
  VideoDialog as AdPopcornVideoDialog,
  InterstitialDialogRef as AdPopcornDaRef,
  VideoDialogRef as AdPopcornVideoRef,
} from './ad-popcorn';
import {
  InterstitialDialog as MezzoDaDialog,
  VideoDialog as MezzoVideoDialog,
  InterstitialDialogRef as MezzoDaRef,
  VideoDialogRef as MezzoVideoRef,
} from './mezzo-media';
import {
  VideoDialog as DawinVideoDialog,
  VideoDialogRef as DawinVideoRef,
} from './dawin';
import NoAdDialog from './NoAdDialog';
import useAdHistory from '@/lib/store/ad-history/useAdHistory';
import {AdHistory} from '@/lib/store/ad-history/type';

export interface AdDialogProps {
  adOrder: AdOrder[];

  adCompleteCallback?: (mediaType?: string) => void;
  adFailCallback?: (mediaType?: string) => void;
  gptInterstitialConfig?: GPTConfig;
  gptRewardConfig?: GPTConfig;
  adPopcornDaConfigs?: AdPopcornConfig[];
  adPopcornVideoConfigs?: AdPopcornConfig[];
  mezzoDaConfigs?: MezzoConfig[];
  mezzoVideoConfigs?: MezzoConfig[];
  dawinVideoConfigs?: DawinConfig[];
}

export type AdConfigs = Pick<
  AdDialogProps,
  | 'gptInterstitialConfig'
  | 'gptRewardConfig'
  | 'adPopcornDaConfigs'
  | 'adPopcornVideoConfigs'
  | 'mezzoDaConfigs'
  | 'mezzoVideoConfigs'
  | 'dawinVideoConfigs'
>;

export type AdDialogRef = {
  onAdView: () => void;
};

const AdDialog = forwardRef<AdDialogRef, AdDialogProps>(
  (
    {
      adOrder,
      adCompleteCallback,
      adFailCallback,
      gptInterstitialConfig,
      gptRewardConfig,
      adPopcornDaConfigs,
      adPopcornVideoConfigs,
      mezzoDaConfigs,
      mezzoVideoConfigs,
      dawinVideoConfigs,
    },
    ref,
  ) => {
    const setAdHistory = useAdHistory((store) => store.setAdHistory);

    const useNoAdDialog = adOrder.some((item) => item !== 'pass');
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [adPopcornDaIndex, setAdPopcornDaIndex] = useState(0);
    const [adPopcornVideoIndex, setAdPopcornVideoIndex] = useState(0);
    const [mezzoDaIndex, setMezzoDaIndex] = useState(0);
    const [mezzoVideoIndex, setMezzoVideoIndex] = useState(0);
    const [dawinVideoIndex, setDawinVideoIndex] = useState(0);

    const gptRewardRef = useRef<GPTRewardDialogRef>(null);

    const [adPopcornDaOpen, setAdPopcornDaOpen] = useState(false);
    const adPopcornDaRef = useRef<AdPopcornDaRef>(null);

    const [adPopcornVideoOpen, setAdPopcornVideoOpen] = useState(false);
    const adPopcornVideoRef = useRef<AdPopcornVideoRef>(null);

    const [mezzoDaOpen, setMezzoDaOpen] = useState(false);
    const mezzoDaRef = useRef<MezzoDaRef>(null);

    const [mezzoVideoOpen, setMezzoVideoOpen] = useState(false);
    const mezzoVideoRef = useRef<MezzoVideoRef>(null);

    const [dawinVideoOpen, setDawinVideoOpen] = useState(false);
    const dawinVideoRef = useRef<DawinVideoRef>(null);

    const [noAdOpen, setNoAdOpen] = useState(false);

    //* ==== ad config (start) ==== *//
    const adPopcornDaConfig = adPopcornDaConfigs?.[adPopcornDaIndex];
    const adPopcornVideoConfig = adPopcornVideoConfigs?.[adPopcornVideoIndex];
    const mezzoDaConfig = mezzoDaConfigs?.[mezzoDaIndex];
    const mezzoVideoConfig = mezzoVideoConfigs?.[mezzoVideoIndex];
    const dawinVideoConfig = dawinVideoConfigs?.[dawinVideoIndex];
    //* ==== ad config (end) ==== *//

    const handleAddAdHistory = (adHistory: AdHistory) => {
      setAdHistory(adHistory);
    };

    const gptInterstitialEventListeners: GPTInterstitialEventListeners = {
      onLoadFailed: () => {
        handleAddAdHistory({
          adCallType: 'fail',
          provider: 'gpt',
          adOrder: 'gpt_interstitial',
          config: gptInterstitialConfig,
          timestamp: Date.now(),
        });
      },
      onReady: () => {
        handleAddAdHistory({
          adCallType: 'success',
          provider: 'gpt',
          adOrder: 'gpt_interstitial',
          config: gptInterstitialConfig,
          timestamp: Date.now(),
        });
      },
    };

    const handleGPTRewardOpen = () => {
      gptRewardRef.current?.onAdView({
        onGranted: () => {},
        onClosedAfterGrant: () => {
          console.log('구글 리워드 광고 보상 받은 후 닫기버튼 누름');
          adCompleteCallback?.('gpt_reward');
        },
        onClosedBeforeGrant: () => {
          console.log('구글 리워드 광고 보상 받기전에 닫기버튼 누름');
          handleNextAd();
        },
        onLoadFailed: () => {
          console.log('구글 리워드 광고 로드 실패');
          handleAddAdHistory({
            adCallType: 'noAd',
            provider: 'gpt',
            adOrder: 'gpt_reward',
            timestamp: Date.now(),
          });
          handleNextAd();
        },
        onReady: () => {
          handleAddAdHistory({
            adCallType: 'success',
            provider: 'gpt',
            adOrder: 'gpt_reward',
            timestamp: Date.now(),
            config: gptRewardConfig,
          });
        },
      });
    };

    const handleAdPopcornDaOpen = () => {
      adPopcornDaRef.current?.onAdView({
        adClicked: () => {
          setAdPopcornDaOpen(false);
          adCompleteCallback?.('adpopcorn_interstitial');
        },
        adClosed: () => {
          setAdPopcornDaOpen(false);
          adCompleteCallback?.('adpopcorn_interstitial');
        },
        sdkError: (error) => {
          handleAddAdHistory({
            adCallType: 'error',
            provider: 'adpopcorn',
            adOrder: 'adpopcorn_interstitial',
            timestamp: Date.now(),
            details: error,
          });
          handleNextAd();
        },
        adInventoryRendered: (event) => {
          const isNoAd = event.isNoAd;
          if (!isNoAd) {
            setAdPopcornDaOpen(true);
            handleAddAdHistory({
              adCallType: 'success',
              provider: 'adpopcorn',
              adOrder: 'adpopcorn_interstitial',
              timestamp: Date.now(),
              config: adPopcornDaConfig,
              details: event,
            });
            return;
          }
          handleAddAdHistory({
            adCallType: 'noAd',
            provider: 'adpopcorn',
            adOrder: 'adpopcorn_interstitial',
            timestamp: Date.now(),
            config: adPopcornDaConfig,
            details: event,
          });

          //! 흐음? 위에있는 index가 증가된 후 화면에 리렌더링이 일어난 후 아래에 있는 handleNextAd가 실행되어지는것이 보장됨
          //* 이유 : setTimeout은 비동기 큐에 들어가기 때문에, 모든 동기 작업(setState 포함)이 완료된 후에 처리 된다고 함
          setAdPopcornDaIndex((prev) => {
            if (prev + 1 === adPopcornDaConfigs?.length) {
              return prev;
            }
            return prev + 1;
          });
          setTimeout(() => handleNextAd());
        },
      });
    };

    const handleAdPopcornVideoOpen = () => {
      adPopcornVideoRef.current?.onAdView({
        adClosed: () => {
          setAdPopcornVideoOpen(false);
          adCompleteCallback?.('adpopcorn_video');
        },
        //? user_landing_enabled가 false 인 환경에서 광고클릭
        adClickthrough: (event) => {
          const url = event.clickthroughURL;
          window.open(url, '_blank');
          setAdPopcornVideoOpen(false);
          adCompleteCallback?.('adpopcorn_video');
        },
        sdkError: (error) => {
          setAdPopcornVideoOpen(false);
          handleAddAdHistory({
            adCallType: 'error',
            provider: 'adpopcorn',
            adOrder: 'adpopcorn_video',
            timestamp: Date.now(),
            details: error,
          });
          handleNextAd();
        },
        adInventoryRendered: (event) => {
          const isNoAd = event.isNoAd;
          if (!isNoAd) {
            setAdPopcornVideoOpen(true);
            handleAddAdHistory({
              adCallType: 'success',
              provider: 'adpopcorn',
              adOrder: 'adpopcorn_video',
              timestamp: Date.now(),
              config: adPopcornVideoConfig,
              details: event,
            });
            return;
          }
          handleAddAdHistory({
            adCallType: 'noAd',
            provider: 'adpopcorn',
            adOrder: 'adpopcorn_video',
            timestamp: Date.now(),
            config: adPopcornVideoConfig,
            details: event,
          });

          setAdPopcornVideoIndex((prev) => {
            if (prev + 1 === adPopcornVideoConfigs?.length) {
              return prev;
            }
            return prev + 1;
          });
          setTimeout(() => handleNextAd());
        },
      });
    };

    const handleMezzoDaOpen = () => {
      mezzoDaRef.current?.onAdView({
        success: (type, status) => {
          setMezzoDaOpen(true);
          console.log(`Mezzo Da [SUCCESS] type : ${type}, status : ${status}`);
          handleAddAdHistory({
            adCallType: 'success',
            provider: 'mezzo',
            adOrder: 'mezzo_interstitial',
            timestamp: Date.now(),
            config: mezzoDaConfig,
          });
        },
        fail: (type, status) => {
          if (type === 'noad') {
            handleAddAdHistory({
              adCallType: 'noAd',
              provider: 'mezzo',
              adOrder: 'mezzo_interstitial',
              timestamp: Date.now(),
              config: mezzoDaConfig,
            });
          } else {
            handleAddAdHistory({
              adCallType: 'error',
              provider: 'mezzo',
              adOrder: 'mezzo_interstitial',
              timestamp: Date.now(),
              config: mezzoDaConfig,
            });
          }
          console.log(`Mezzo Da [FAIL] type : ${type}, status : ${status}`);
          setMezzoDaIndex((prev) => {
            if (prev + 1 === mezzoDaConfigs?.length) {
              return prev;
            }
            return prev + 1;
          });
          setTimeout(() => handleNextAd());
        },
        event: (type) => {
          if (type === 'adclick' || type === 'close') {
            setMezzoDaOpen(false);
            adCompleteCallback?.('mezzo_interstitial');
          }
        },
      });
    };

    const handleMezzoVideoOpen = () => {
      mezzoVideoRef.current?.onAdView({
        success: (type, status) => {
          setMezzoVideoOpen(true);
          console.log(
            `Mezzo Video [SUCCESS] type : ${type}, status : ${status}`,
          );
          handleAddAdHistory({
            adCallType: 'success',
            provider: 'mezzo',
            adOrder: 'mezzo_video',
            timestamp: Date.now(),
            config: mezzoVideoConfig,
          });
        },
        fail: (type, status) => {
          if (type === 'noad') {
            handleAddAdHistory({
              adCallType: 'noAd',
              provider: 'mezzo',
              adOrder: 'mezzo_video',
              timestamp: Date.now(),
              config: mezzoVideoConfig,
            });
          } else {
            handleAddAdHistory({
              adCallType: 'error',
              provider: 'mezzo',
              adOrder: 'mezzo_video',
              timestamp: Date.now(),
              config: mezzoVideoConfig,
            });
          }
          console.log(`Mezzo Video [FAIL] type : ${type}, status : ${status}`);
          setMezzoVideoIndex((prev) => {
            if (prev + 1 === mezzoVideoConfigs?.length) {
              return prev;
            }
            return prev + 1;
          });
          setTimeout(() => handleNextAd());
        },
        event: (type) => {
          if (type === 'ended' || type === 'close') {
            setMezzoVideoOpen(false);
            adCompleteCallback?.('mezzo_video');
          }
        },
      });
    };

    const handleDawinVideoOpen = () => {
      dawinVideoRef.current?.onAdView({
        onAdLoaded: () => {
          console.log('Dawin [SUCCESS]');
          setDawinVideoOpen(true);
          handleAddAdHistory({
            adCallType: 'success',
            provider: 'dawin',
            adOrder: 'dawin_video',
            timestamp: Date.now(),
            config: dawinVideoConfig,
          });
        },
        onAdClickThru: (click) => {
          setDawinVideoOpen(false);
          adCompleteCallback?.('dawin_video');
        },
        onAdVideoComplete: () => {
          setDawinVideoOpen(false);
          adCompleteCallback?.('dawin_video');
        },
        onAdSkipped: () => {
          setDawinVideoOpen(false);
          //TODO skip을 누르면 다음 광고를 노출시켜야함 스킵한다고 게임참여 X
          setDawinVideoIndex((prev) => {
            if (prev + 1 === dawinVideoConfigs?.length) {
              return prev;
            }
            return prev + 1;
          });
          setTimeout(() => handleNextAd());
        },
        onAdStoped: () => {
          setDawinVideoOpen(false);
          //TODO 광고를 멈춰도 다음 광고를 노출 게임참여 X
          setDawinVideoIndex((prev) => {
            if (prev + 1 === dawinVideoConfigs?.length) {
              return prev;
            }
            return prev + 1;
          });
          setTimeout(() => handleNextAd());
        },
        onAdError: (error, key) => {
          console.log('Dawin [FAIL]');
          handleAddAdHistory({
            adCallType: 'error',
            provider: 'dawin',
            adOrder: 'dawin_video',
            timestamp: Date.now(),
            details: error,
          });
          setDawinVideoOpen(false);
          setDawinVideoIndex((prev) => {
            if (prev + 1 === dawinVideoConfigs?.length) {
              return prev;
            }
            return prev + 1;
          });
          setTimeout(() => handleNextAd());
        },
      });
    };

    const handleAdOpen = (adOrder: AdOrder) => {
      if (adOrder === 'gpt_reward') {
        handleGPTRewardOpen();
      } else if (adOrder === 'adpopcorn_interstitial') {
        handleAdPopcornDaOpen();
      } else if (adOrder === 'adpopcorn_video') {
        handleAdPopcornVideoOpen();
      } else if (adOrder === 'mezzo_interstitial') {
        handleMezzoDaOpen();
      } else if (adOrder === 'mezzo_video') {
        handleMezzoVideoOpen();
      } else if (adOrder === 'dawin_video') {
        handleDawinVideoOpen();
      } else if (adOrder === 'pass') {
        console.log('광고가 없습니다.');
        setTimeout(() => {
          adCompleteCallback?.('pass');
        }, 1000);
      }
    };

    const handleNoAdOpen = () => {
      setNoAdOpen(true);
      adFailCallback?.();
    };

    const handleNextAd = () => {
      setCurrentAdIndex((currentAdIndex) => currentAdIndex + 1);
    };

    const onAdView = () => {
      const firstAd = adOrder[0];
      handleAdOpen(firstAd);
    };

    useEffect(() => {
      if (currentAdIndex === 0) return;
      if (currentAdIndex === -1 || currentAdIndex === adOrder.length) {
        setCurrentAdIndex(0);
        setAdPopcornDaIndex(0);
        setAdPopcornVideoIndex(0);
        setMezzoDaIndex(0);
        setMezzoVideoIndex(0);
        setDawinVideoIndex(0);
        handleNoAdOpen();
        return;
      }

      const nextAd = adOrder[currentAdIndex];
      handleAdOpen(nextAd);
    }, [currentAdIndex, adOrder]);

    useImperativeHandle(ref, () => ({
      onAdView,
    }));

    return (
      <>
        {gptInterstitialConfig && (
          <GPTInterstitialDialog
            config={gptInterstitialConfig}
            eventListeners={gptInterstitialEventListeners}
          />
        )}

        {gptRewardConfig && (
          <GPTRewardDialog ref={gptRewardRef} config={gptRewardConfig} />
        )}

        {adPopcornDaConfig && (
          <AdPopcornDaDialog
            ref={adPopcornDaRef}
            open={adPopcornDaOpen}
            config={adPopcornDaConfig}
          />
        )}

        {adPopcornVideoConfig && (
          <AdPopcornVideoDialog
            ref={adPopcornVideoRef}
            open={adPopcornVideoOpen}
            config={adPopcornVideoConfig}
          />
        )}

        {mezzoDaConfig && (
          <MezzoDaDialog
            ref={mezzoDaRef}
            open={mezzoDaOpen}
            config={mezzoDaConfig}
          />
        )}

        {mezzoVideoConfig && (
          <MezzoVideoDialog
            ref={mezzoVideoRef}
            open={mezzoVideoOpen}
            config={mezzoVideoConfig}
          />
        )}

        {dawinVideoConfig && (
          <DawinVideoDialog
            ref={dawinVideoRef}
            open={dawinVideoOpen}
            config={dawinVideoConfig}
          />
        )}

        {useNoAdDialog && (
          <NoAdDialog open={noAdOpen} onClose={() => setNoAdOpen(false)} />
        )}
      </>
    );
  },
);

export default AdDialog;
