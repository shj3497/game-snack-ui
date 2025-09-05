import {
  MezzoConfig,
  MezzoInterstitialCallbacks,
  useMezzoMediaInterstitial,
} from '@/lib/utils/ad';
import {styled} from '@mui/material';
import {forwardRef, useId, useImperativeHandle} from 'react';
import {createPortal} from 'react-dom';
import Dialog from '../common/Dialog';

interface Props {
  open: boolean;
  onClose?: () => void;
  config: MezzoConfig;
}

const AdDiv = styled('div')`
  width: 300px;
  height: 450px;
  margin: 0 auto;
`;

export type InterstitialDialogRef = {
  onAdView: (callback?: MezzoInterstitialCallbacks) => void;
};

const InterstitialDialog = forwardRef<InterstitialDialogRef, Props>(
  ({open, onClose, config}, ref) => {
    const id = useId();
    const {onAdOpen} = useMezzoMediaInterstitial({...config, targetId: id});

    useImperativeHandle(ref, () => ({
      onAdView: onAdOpen,
    }));

    return (
      <>
        {createPortal(
          <Dialog open={open} className="mezzo-interstitial-dialog">
            <AdDiv id={id} />
          </Dialog>,
          document.querySelector('#ad-dialogs')!,
        )}
      </>
    );
  },
);

export default InterstitialDialog;
