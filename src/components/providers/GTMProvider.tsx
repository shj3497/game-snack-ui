import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

interface GTMProviderProps {
  gtmId: string;
  children?: React.ReactNode;
}

const GTMProvider = ({ gtmId, children }: GTMProviderProps) => {
  useEffect(() => {
    TagManager.initialize({ gtmId });
  }, [gtmId]);

  return <>{children}</>;
};

export default GTMProvider;