import {useEffect} from 'react';
import {useGPTAdUnitPath, useGPTReady} from './useGPT';
import {useGPTSdk} from './useGPTSdk';

export const useGPTInterstitial = () => {
  const sdk = useGPTSdk((store) => store.sdk);
  const {setIsLoading, setIsReady} = useGPTReady();
  const adUnitPath = useGPTAdUnitPath((store) => store.adUnitPath);

  useEffect(() => {
    if (!sdk) return;
    if (!adUnitPath) {
      setIsLoading(false);
      sdk.cmd.push(() => {
        sdk.destroySlots();
      });
      return;
    }

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
        setIsLoading(false);
        if (slot === event.slot && event.isEmpty) {
          console.log('interstitial is fail');
          setIsReady(false);
        }
      });
      sdk.pubads().addEventListener('slotOnload', (event) => {
        setIsLoading(false);
        if (slot === event.slot) {
          console.log('interstitial is loaded');
          setIsReady(true);
        }
      });

      sdk.pubads().enableSingleRequest();
      sdk.enableServices();

      if (slot) {
        sdk.cmd.push(() => {
          sdk.display(slot);
        });
      }
    });
  }, [sdk, adUnitPath]);
};
