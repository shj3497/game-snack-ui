import {AdOrder} from '@/components/_organisms/ad/type';
import {AdConfigs} from '@/components/_organisms/ad/AdDialog';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';

import {useGPTReady} from '@/lib/utils/ad/google-publisher-tag/useGPT';
import {produce} from 'immer';
import {getAdConfigs, getGameScore} from './loader-api';
import {
  defaultGameScores,
  GameScoreItem,
} from '@/lib/store/events/common/game-score';

const introLoader = async () => {
  const {platform, adid, idfa, userId, pid, environment} =
    useUserInfoConfig.getState();
  const isDevMode = environment === 'development';

  let result: {
    gameScores: GameScoreItem[];
    isWin: boolean;
    rate: number;
    ads: {adConfigs: AdConfigs; adOrder: AdOrder[]};
  } = {
    gameScores: defaultGameScores(1),
    isWin: false,
    rate: 0,
    ads: {adConfigs: {}, adOrder: ['pass']},
  };
  const gameScoreRes = await getGameScore(pid, userId, adid, idfa);
  const adConfigsRes = await getAdConfigs({pid, adid, idfa, platform}, 'intro');
  if (adConfigsRes.useGPTAd && !isDevMode) {
    useGPTReady.setState({isLoading: true});
  }

  return produce(result, (draft) => {
    draft.gameScores = gameScoreRes.gameScores;
    draft.isWin = gameScoreRes.isWin;
    draft.rate = gameScoreRes.rate;
    if (!isDevMode) {
      draft.ads.adConfigs = adConfigsRes.adConfigs;
      draft.ads.adOrder = adConfigsRes.adOrder;
    }
  });
};

const participateLoader = async () => {
  const {pid, userId} = useUserInfoConfig.getState();
  let result: {
    gameScores: GameScoreItem[];
    rate: number;
  } = {
    gameScores: defaultGameScores(1),
    rate: 0,
  };

  const gameScoreRes = await getGameScore(pid, userId);
  return produce(result, (draft) => {
    draft.gameScores = gameScoreRes.gameScores;
    draft.rate = gameScoreRes.rate;
  });
};

const resultWinLoader = async () => {
  const {platform, adid, idfa, pid, environment} = useUserInfoConfig.getState();
  const isDevMode = environment === 'development';

  let result: {
    ads: {adConfigs: AdConfigs; adOrder: AdOrder[]};
  } = {
    ads: {adConfigs: {}, adOrder: ['pass']},
  };

  const adConfigsRes = await getAdConfigs(
    {pid, adid, idfa, platform},
    'result',
  );

  if (adConfigsRes.useGPTAd && !isDevMode) {
    useGPTReady.setState({isLoading: true});
  }

  return produce(result, (draft) => {
    if (!isDevMode) {
      draft.ads.adConfigs = adConfigsRes.adConfigs;
      draft.ads.adOrder = adConfigsRes.adOrder;
    }
  });
};

type IntroLoaderResponse = Awaited<ReturnType<typeof introLoader>>;
type ParticipateLoaderResponse = Awaited<ReturnType<typeof participateLoader>>;
type ResultWinLoaderResponse = Awaited<ReturnType<typeof resultWinLoader>>;

export {introLoader, participateLoader, resultWinLoader};
export type {
  IntroLoaderResponse,
  ParticipateLoaderResponse,
  ResultWinLoaderResponse,
};
