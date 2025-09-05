import {AdPopcornConfig, AdPopcornEventListeners} from '@/lib/utils/ad';
import useAdPopcornInterstitial from '@/lib/utils/ad/ad-popcorn/useAdPopcornInterstitial';
import {forwardRef, useId, useImperativeHandle} from 'react';
import {createPortal} from 'react-dom';
import Dialog from '../common/Dialog';
import {styled} from '@mui/material';

interface Props {
  open: boolean;
  onClose?: () => void;
  config: AdPopcornConfig;
}

const AdDiv = styled('div')`
  width: 100%;
  max-width: 450px;
  height: auto;
  aspect-ratio: 2 / 3;
`;

export type InterstitialDialogRef = {
  onAdView: (eventListeners?: AdPopcornEventListeners) => void;
};

const InterstitialDialog = forwardRef<InterstitialDialogRef, Props>(
  ({open, onClose, config}, ref) => {
    const id = useId();
    const {onAdOpen} = useAdPopcornInterstitial(config);

    const onAdView = (eventListeners: AdPopcornEventListeners = {}) => {
      onAdOpen(id, eventListeners);
    };

    useImperativeHandle(ref, () => ({
      onAdView,
    }));

    return (
      <>
        {createPortal(
          <Dialog open={open} className="adpopcorn-interstitial-dialog">
            <AdDiv id={id} />
          </Dialog>,
          document.querySelector('#ad-dialogs')!,
        )}
      </>
    );
  },
);

export default InterstitialDialog;
