import {useDawinAdSdk} from '@/lib/utils/ad';
import {useEffect} from 'react';

const DAWIN_SCRIPT_SRC =
  'https://vplayer.dawin.tv/dawin3/js/shinhan_play/dawin3.min.js';

const DawinScript = () => {
  useDawinAdSdk.getState().init();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = DAWIN_SCRIPT_SRC;
    script.async = true;

    script.onload = () => {
      console.log('Dawin Script loaded');
    };

    script.onerror = () => {
      console.error('Dawin Script load error');
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

export default DawinScript;
