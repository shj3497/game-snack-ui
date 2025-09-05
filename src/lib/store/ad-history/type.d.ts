import {AdConfigs} from '@/components/_organisms/ad/AdDialog';
import {AdOrder} from '@/components/_organisms/ad/type';

export interface AdHistoryStore {
  adHistory: AdHistory[];
  setAdHistory: (adHistory: AdHistory) => void;
  reset: () => void;
}

export interface AdHistory {
  adCallType: 'success' | 'fail' | 'noAd' | 'error';
  provider: 'mezzo' | 'adpopcorn' | 'dawin' | 'gpt' | 'etc';
  adOrder: AdOrder;
  timestamp: number;
  config?: any;
  details?: any;
}
