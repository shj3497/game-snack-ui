import {forwardRef} from 'react';
import {AdDialog, AdDialogProps, AdDialogRef} from '../../ad';

interface Props
  extends Omit<AdDialogProps, 'adCompleteCallback' | 'adFailCallback'> {
  adViewSuccess?: (mediaType?: string) => void;
}

const ResultWinAdDialog = forwardRef<AdDialogRef, Props>(
  ({adViewSuccess, ...props}, ref) => {
    const adCompleteCallback = (mediaType?: string) => {
      adViewSuccess?.(mediaType);
    };

    return (
      <AdDialog {...props} ref={ref} adCompleteCallback={adCompleteCallback} />
    );
  },
);

export default ResultWinAdDialog;
