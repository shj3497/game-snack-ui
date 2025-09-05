import {
  GPTConfig,
  GPTInterstitialEventListeners,
  useGPTSdk,
} from '@/lib/utils/ad';
import {useGPTReady} from '@/lib/utils/ad/google-publisher-tag/useGPT';
import {FC, useLayoutEffect} from 'react';

interface Props {
  config: GPTConfig;
  eventListeners?: GPTInterstitialEventListeners;
}

const InterstitialDialog: FC<Props> = ({config, eventListeners}) => {
  const sdk = useGPTSdk((store) => store.sdk);
  const setIsGPTLoading = useGPTReady((store) => store.setIsLoading);
  const setIsGPTReady = useGPTReady((store) => store.setIsReady);
  const adUnitPath = config.adUnitPath;

  useLayoutEffect(() => {
    if (!sdk) return;
    if (!adUnitPath) return;
    setIsGPTLoading(true);

    sdk.cmd.push(() => {
      const slot = sdk.defineOutOfPageSlot(
        adUnitPath,
        sdk.enums.OutOfPageFormat.INTERSTITIAL,
      );
      if (slot) {
        slot.addService(sdk.pubads()).setConfig({
          interstitial: {
            triggers: {
              unhideWindow: true,
            },
          },
        });
      }

      sdk.pubads().addEventListener('slotRenderEnded', (event) => {
        setIsGPTLoading(false);
        eventListeners?.onLoadFailed?.();
        if (slot === event.slot && event.isEmpty) {
          console.log('interstitial is fail');
          setIsGPTReady(false);
        }
      });
      sdk.pubads().addEventListener('slotOnload', (event) => {
        setIsGPTLoading(false);
        if (slot === event.slot) {
          console.log('interstitial is loaded');
          eventListeners?.onReady?.();
          setIsGPTReady(true);
        }
      });

      sdk.pubads().enableSingleRequest();
      sdk.pubads().set('page_url', 'www.game-snack.co.kr');
      sdk.enableServices();

      if (slot) {
        sdk.cmd.push(() => {
          sdk.display(slot);
        });
      }
    });

    //? 웹에서 가끔 GPT Loading이 false로 바뀌지 않은 경우가 있어서 5초 후에 강제로 false로 바꿔줌
    setTimeout(() => {
      setIsGPTLoading(false);
    }, 5000);

    return () => {
      setIsGPTLoading(false);
      setIsGPTReady(false);
      sdk.cmd.push(() => {
        sdk.destroySlots();
      });
    };
  }, [sdk, adUnitPath]);

  return null;
};
export default InterstitialDialog;
