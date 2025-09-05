import {DawinAdCallbacks, DawinConfig, useDawinAdVideo} from '@/lib/utils/ad';
import {forwardRef, useImperativeHandle} from 'react';
import {createPortal} from 'react-dom';
import Dialog from '../common/Dialog';
import {styled} from '@mui/material';

interface Props {
  open: boolean;
  onClose?: () => void;
  config: DawinConfig;
}

const AdDiv = styled('div')`
  position: relative;

  width: 100%;
  max-width: 100%;
  min-height: 250px;
  height: auto;

  video {
    width: 100%;
  }
`;

const Notice = styled('p')`
  color: #bfdfe6;
  margin-top: 8px;
  text-align: center;
  font-size: 13px;
  font-weight: 400;
`;

export type VideoDialogRef = {
  onAdView: (eventListeners?: DawinAdCallbacks) => void;
};

const VideoDialog = forwardRef<VideoDialogRef, Props>(
  ({open, onClose, config}, ref) => {
    const VIDEO_ID = 'dawin-ad-video';
    const {onVideoOpen} = useDawinAdVideo({
      ...config,
      target: `#${VIDEO_ID}`,
    });

    useImperativeHandle(ref, () => ({
      onAdView: onVideoOpen,
    }));

    return (
      <>
        {createPortal(
          <Dialog open={open} useBackdrop>
            <AdDiv>
              <video id={VIDEO_ID} />
            </AdDiv>
            <Notice>
              Skip 종료없이 끝까지 시청하셔야 게임 참여가 가능합니다.
            </Notice>
          </Dialog>,
          document.querySelector('#ad-dialogs')!,
        )}
      </>
    );
  },
);

export default VideoDialog;
