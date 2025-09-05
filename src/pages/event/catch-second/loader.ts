import {AdOrder} from '@/components/_organisms/ad/type';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';
import {produce} from 'immer';

import {
  defaultGameScores,
  GameScoreItem,
} from '@/lib/store/events/common/game-score';
import {getAdConfigs, getGameScore} from './loader-api';
import {AdConfigs} from '@/components/_organisms/ad/AdDialog';
import {useGPTReady} from '@/lib/utils/ad/google-publisher-tag/useGPT';

const introLoader = async () => {
  const {platform, adid, idfa, userId, pid, environment} =
    useUserInfoConfig.getState();
  const isDevMode = environment === 'development';

  let result: {
    TIME: number;
    gameScores: GameScoreItem[];
    isWin: boolean;
    ads: {adConfigs: AdConfigs; adOrder: AdOrder[]};
  } = {
    TIME: 6000,
    gameScores: defaultGameScores(3),
    isWin: false,
    ads: {adConfigs: {}, adOrder: ['pass']},
  };
  const gameScoreRes = await getGameScore(pid, userId, adid, idfa);
  const adConfigsRes = await getAdConfigs({pid, adid, idfa, platform}, 'intro');
  if (adConfigsRes.useGPTAd && !isDevMode) {
    useGPTReady.setState({isLoading: true});
  }

  return produce(result, (draft) => {
    draft.gameScores = gameScoreRes.gameScores;
    draft.TIME = gameScoreRes.TIME;
    draft.isWin = gameScoreRes.isWin;
    if (!isDevMode) {
      draft.ads.adConfigs = adConfigsRes.adConfigs;
      draft.ads.adOrder = adConfigsRes.adOrder;
    }
  });
};

const participateLoader = async () => {
  const {pid, userId} = useUserInfoConfig.getState();
  let result: {
    TIME: number;
    gameScores: GameScoreItem[];
  } = {
    TIME: 6000,
    gameScores: defaultGameScores(3),
  };

  const gameScoreRes = await getGameScore(pid, userId);
  return produce(result, (draft) => {
    draft.gameScores = gameScoreRes.gameScores;
    draft.TIME = gameScoreRes.TIME;
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
