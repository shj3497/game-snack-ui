import {AdDialog, AdDialogProps, AdDialogRef} from '@/components/_organisms/ad';
import paths from '@/lib/utils/paths';
import {forwardRef} from 'react';
import {useNavigate} from 'react-router-dom';

interface Props
  extends Omit<AdDialogProps, 'adCompleteCallback' | 'adFailCallback'> {
  adViewSuccess?: (mediaType?: string) => void;
}

const IntroAdDialog = forwardRef<AdDialogRef, Props>(
  ({adViewSuccess, ...props}, ref) => {
    const navigate = useNavigate();
    const adCompleteCallback = (mediaType?: string) => {
      navigate(paths.event.roulette.participate);
      adViewSuccess?.(mediaType);
    };

    return (
      <AdDialog {...props} ref={ref} adCompleteCallback={adCompleteCallback} />
    );
  },
);
export default IntroAdDialog;
