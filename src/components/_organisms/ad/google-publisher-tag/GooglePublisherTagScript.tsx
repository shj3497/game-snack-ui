import {useGPTSdk} from '@/lib/utils/ad';
import {useEffect} from 'react';

const GOOGLE_PUBLISHER_TAG_SRC =
  'https://securepubads.g.doubleclick.net/tag/js/gpt.js';

const GooglePublisherTagScript = () => {
  useGPTSdk.getState().init();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = GOOGLE_PUBLISHER_TAG_SRC;
    script.async = true;

    script.onload = () => {
      console.log('gpt Script loaded');
    };

    script.onerror = () => {
      console.error('gpt Script load error');
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

export default GooglePublisherTagScript;
