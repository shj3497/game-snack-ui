import {GPTConfig, GPTRewardEventListeners} from '@/lib/utils/ad';
import useGPTReward from '@/lib/utils/ad/google-publisher-tag/useGPTReward';
import {forwardRef, useImperativeHandle} from 'react';

interface Props {
  config: GPTConfig;
}

export type RewardVideoDialogRef = {
  onAdView: (eventListeners?: GPTRewardEventListeners) => void;
};

const RewardVideoDialog = forwardRef<RewardVideoDialogRef, Props>(
  ({config}, ref) => {
    const {onAdOpen} = useGPTReward(config);

    useImperativeHandle(ref, () => ({
      onAdView: onAdOpen,
    }));

    return null;
  },
);

RewardVideoDialog.displayName = 'RewardVideoDialog';

export default RewardVideoDialog;
