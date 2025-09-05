import {
  AdPopcornConfig,
  AdPopcornEventListeners,
  useAdPopcornVideo,
} from '@/lib/utils/ad';
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

export type VideoDialogRef = {
  onAdView: (eventListeners?: AdPopcornEventListeners) => void;
  onAdTerminate: () => void;
};

const VideoDialog = forwardRef<VideoDialogRef, Props>(
  ({open, onClose, config}, ref) => {
    const id = useId();
    const {onAdOpen, onTerminateAd} = useAdPopcornVideo(config);

    const onAdView = (eventListeners: AdPopcornEventListeners = {}) => {
      onAdOpen(id, eventListeners);
    };
    const onAdTerminate = () => {
      onTerminateAd(id);
    };

    useImperativeHandle(ref, () => ({
      onAdView,
      onAdTerminate,
    }));

    return (
      <>
        {createPortal(
          <Dialog open={open} className="adpopcorn-video-dialog">
            <AdDiv id={id} />
          </Dialog>,
          document.querySelector('#ad-dialogs')!,
        )}
      </>
    );
  },
);
export default VideoDialog;
