import {useMezzoSdk} from '@/lib/utils/ad/mezzo-media';
import {useEffect} from 'react';

const MEZZO_SCRIPT_SRC =
  'https://advimg.ad-mapps.com/sdk/js/ver/3.0.0/ad_script.min.js';

const MezzoMediaScript = () => {
  useMezzoSdk.getState().init();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = MEZZO_SCRIPT_SRC;
    script.async = true;

    script.onload = () => {
      console.log('mezzo Script loaded');
    };

    script.onerror = () => {
      console.error('mezzo Script load error');
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

export default MezzoMediaScript;
