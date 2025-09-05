import {AdConfigs} from '@/components/_organisms/ad/AdDialog';
import {AdOrder} from '@/components/_organisms/ad/type';
import {
  checkFindEligibility,
  getCheckFindEligibilityQueryKey,
  getEventAdPlacementInfo,
  getGetEventAdPlacementInfoQueryKey,
} from '@/lib/service/api/mini-game/mini-game';
import queryClient from '@/lib/service/query-client';
import {
  defaultGameScores,
  GameScoreItem,
} from '@/lib/store/events/common/game-score';
import {UserInfo} from '@/lib/store/user-info-config/type';
import {convertAdData} from '@/lib/utils/ad/convert-ad-data';
import {produce} from 'immer';

const getGameScore = async (
  pid: string,
  userId: string,
  adid?: string,
  idfa?: string,
) => {
  let result: {
    TIME: number;
    CARD_COUNT: number;
    gameScores: GameScoreItem[];
    isWin: boolean;
  } = {
    TIME: 6000,
    CARD_COUNT: 5,
    gameScores: defaultGameScores(3),
    isWin: false,
  };
  try {
    const res = await queryClient.fetchQuery({
      queryKey: getCheckFindEligibilityQueryKey(pid, {adid, idfa, userId}),
      queryFn: () => checkFindEligibility(pid, {adid, idfa, userId}),
      staleTime: 1000 * 60, // 1 minute
    });
    const systemSeconds = res.system.seconds || 6;
    const TIME = systemSeconds * 1000;
    const CARD_COUNT = res.system.cardCount || 5;

    result = produce(result, (draft) => {
      res.user.forEach((item, index) => {
        const isSuccess = (item.cards || '').split(',').length === CARD_COUNT;
        draft.gameScores[index] = {
          type: isSuccess ? 'success' : 'fail',
          score: isSuccess ? '성공' : '실패',
        };
      });
      draft.TIME = TIME;
      draft.CARD_COUNT = CARD_COUNT;
      // isWin 값을 추가
      (draft as any).isWin = res.isWin;
    });
  } catch (error) {
    console.log(error);
  }

  return result;
};

const getAdConfigs = async (
  userInfo: Pick<UserInfo, 'pid' | 'adid' | 'idfa' | 'platform'>,
  pageType: 'intro' | 'result',
) => {
  const {pid, adid, idfa, platform} = userInfo;
  let result: {
    adOrder: AdOrder[];
    adConfigs: AdConfigs;
    useGPTAd: boolean;
  } = {
    adOrder: ['pass'],
    adConfigs: {},
    useGPTAd: false,
  };

  try {
    const res = await queryClient.fetchQuery({
      queryKey: getGetEventAdPlacementInfoQueryKey(pid),
      queryFn: () => getEventAdPlacementInfo(pid),
      staleTime: 1000 * 60 * 60, // 1 hour
    });
    const adInfo = res.data[pageType];

    const adOrder: AdOrder[] = adInfo.info
      .map((item) => item.adOrderType)
      .filter((item) => !!item)
      .filter((item) => item !== 'gpt_interstitial');
    if (adInfo.isNoAdPass) {
      adOrder.push('pass');
    }

    const useGPTAd = adInfo.info.some(
      (item) => item.adOrderType === 'gpt_interstitial',
    );

    const adConfigs = convertAdData(adInfo.info, {platform, adid, idfa});

    result = produce(result, (draft) => {
      draft.adOrder = adOrder;
      draft.adConfigs = adConfigs;
      draft.useGPTAd = useGPTAd;
    });
  } catch (error) {
    console.log(error);
  }
  return result;
};

export {getGameScore, getAdConfigs};
