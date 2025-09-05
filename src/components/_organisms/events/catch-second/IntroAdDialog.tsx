import {forwardRef} from 'react';
import {AdDialog, AdDialogProps, AdDialogRef} from '../../ad';
import {useNavigate} from 'react-router-dom';
import paths from '@/lib/utils/paths';

interface Props
  extends Omit<AdDialogProps, 'adCompleteCallback' | 'adFailCallback'> {
  adViewSuccess?: (mediaType?: string) => void;
}

const IntroAdDialog = forwardRef<AdDialogRef, Props>(
  ({adViewSuccess, ...props}, ref) => {
    const navigate = useNavigate();
    const adCompleteCallback = (mediaType?: string) => {
      navigate(paths.event.catch_second.participate);
      adViewSuccess?.(mediaType);
    };

    return (
      <AdDialog {...props} ref={ref} adCompleteCallback={adCompleteCallback} />
    );
  },
);

export default IntroAdDialog;
