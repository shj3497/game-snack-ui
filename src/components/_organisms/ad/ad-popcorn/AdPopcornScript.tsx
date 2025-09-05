import {useAdPopcornSdk} from '@/lib/utils/ad';
import {useEffect} from 'react';

const ADPOPCORN_SCRIPT_SRC =
  'https://webapi.adpopcorn.com/ssp/web-sdk/ap-ssp-web-sdk-1.8.1.min.js';

const AdpopcornScript = () => {
  useAdPopcornSdk.getState().init();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = ADPOPCORN_SCRIPT_SRC;
    script.async = true;

    script.onload = () => {
      console.log('Ad popcorn Script loaded');
    };

    script.onerror = () => {
      console.error('Ad popcorn Script load error');
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default AdpopcornScript;
