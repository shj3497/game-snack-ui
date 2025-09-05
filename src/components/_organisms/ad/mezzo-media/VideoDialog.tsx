import {
  MezzoConfig,
  MezzoVideoCallbacks,
  useMezzoMediaVideo,
} from '@/lib/utils/ad';
import {forwardRef, useId, useImperativeHandle} from 'react';
import {createPortal} from 'react-dom';
import Dialog from '../common/Dialog';
import {styled} from '@mui/material';

interface Props {
  open: boolean;
  onClose?: () => void;
  config: MezzoConfig;
}

const AdDiv = styled('div')`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 100%;

  video {
    width: 100%;
  }
`;

export type VideoDialogRef = {
  onAdView: (callbacks?: MezzoVideoCallbacks) => void;
};

const VideoDialog = forwardRef<VideoDialogRef, Props>(
  ({open, onClose, config}, ref) => {
    const id = useId();
    const {onVideoOpen} = useMezzoMediaVideo({
      ...config,
      targetId: id,
    });

    useImperativeHandle(ref, () => ({
      onAdView: onVideoOpen,
    }));

    return (
      <>
        {createPortal(
          <Dialog open={open} useBackdrop className="mezzo-video-dialog">
            <AdDiv>
              <video id={id} />
            </AdDiv>
          </Dialog>,
          document.querySelector('#ad-dialogs')!,
        )}
      </>
    );
  },
);

export default VideoDialog;
