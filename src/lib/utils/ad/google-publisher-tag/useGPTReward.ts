import {useCallback, useRef} from 'react';
import {GPTConfig, GPTRewardEventListeners} from './type';
import {useGPTSdk} from './useGPTSdk';

export const useGPTReward = (config: GPTConfig) => {
  const sdk = useGPTSdk((store) => store.sdk);
  const isRewardGranted = useRef(false);

  const onAdOpen = useCallback(
    (eventListeners: GPTRewardEventListeners = {}) => {
      if (!sdk) {
        eventListeners.onLoadFailed?.();
        return;
      }
      // 1. 광고가 열릴 때마다 보상 상태를 초기화합니다.
      isRewardGranted.current = false;

      sdk.cmd.push(() => {
        // 2. config에서 광고 단위를 가져와 재사용성을 높입니다.
        const rewardedSlot = sdk.defineOutOfPageSlot(
          config.adUnitPath,
          sdk.enums.OutOfPageFormat.REWARDED,
        );
        if (!rewardedSlot) {
          eventListeners.onLoadFailed?.();
          return;
        }

        const cleanup = () => {
          sdk.pubads().removeEventListener('rewardedSlotReady', onReady);
          sdk.pubads().removeEventListener('rewardedSlotClosed', onSlotClosed);
          sdk.pubads().removeEventListener('rewardedSlotGranted', onGranted);
          sdk.pubads().removeEventListener('slotRenderEnded', onRenderEnded);
          sdk.destroySlots([rewardedSlot]);
        };

        const onReady = (event: googletag.events.RewardedSlotReadyEvent) => {
          if (event.slot === rewardedSlot) {
            event.makeRewardedVisible();
            eventListeners?.onReady?.();
          }
        };

        const onSlotClosed = (
          event: googletag.events.RewardedSlotClosedEvent,
        ) => {
          if (event.slot === rewardedSlot) {
            // 3. 보상 여부에 따라 명확하게 분기된 콜백을 호출합니다.
            if (isRewardGranted.current) {
              eventListeners?.onClosedAfterGrant?.();
            } else {
              eventListeners?.onClosedBeforeGrant?.();
            }
            cleanup();
          }
        };

        const onGranted = (
          event: googletag.events.RewardedSlotGrantedEvent,
        ) => {
          if (event.slot === rewardedSlot) {
            isRewardGranted.current = true;
            // 4. 보상을 받았을 때, 외부로 payload와 함께 이벤트를 전달합니다.
            eventListeners?.onGranted?.(event.payload);
          }
        };

        const onRenderEnded = (
          event: googletag.events.SlotRenderEndedEvent,
        ) => {
          if (event.slot === rewardedSlot && event.isEmpty) {
            eventListeners?.onLoadFailed?.();
            cleanup();
          }
        };

        rewardedSlot.addService(sdk.pubads());
        sdk.pubads().addEventListener('rewardedSlotReady', onReady);
        sdk.pubads().addEventListener('rewardedSlotClosed', onSlotClosed);
        sdk.pubads().addEventListener('rewardedSlotGranted', onGranted);
        sdk.pubads().addEventListener('slotRenderEnded', onRenderEnded);

        sdk.enableServices();
        sdk.display(rewardedSlot);
      });
    },
    [sdk, config],
  ); // useCallback으로 감싸고 의존성을 명시합니다.

  return {onAdOpen};
};

export default useGPTReward;
