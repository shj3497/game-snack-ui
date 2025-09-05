import ResultWin from '../common/ResultWin';
import ResultWinEmoji from '@/components/_molecules/ResultWinEmoji';
import GameButton from '@/components/_atoms/GameButton';
import DrawSecondLayout from './DrawSecondLayout';
import {FC, useRef, useState} from 'react';
import RewardConfirmDialog from '../common/RewardConfirmDialog';
import {ResultWinLoaderResponse} from '@/pages/event/draw-second/loader';
import ResultWinAdDialog from './ResultWinAdDialog';
import {AdDialogRef} from '../../ad';
import useUserInfoConfig from '@/lib/store/user-info-config/useUserInfoConfig';
import useAlert from '@/lib/store/useAlert';
import {useGiveReward} from '@/lib/service/api/mini-game/mini-game';

interface Props {
  loaderData?: ResultWinLoaderResponse;
}

const DrawSecondResultWin: FC<Props> = ({loaderData}) => {
  const {pid, clickKey, userId} = useUserInfoConfig();
  const onAlertOpen = useAlert((store) => store.onOpen);

  const [open, setOpen] = useState(false);
  const adDialogRef = useRef<AdDialogRef>(null);

  const {mutate, isSuccess} = useGiveReward({
    mutation: {
      onSuccess: () => {
        setOpen(true);
      },
      onError: (error: any) => {
        const message = error.response.data.detail.message;

        onAlertOpen(
          message || '에러가 발생하였습니다.\n관리자에게 문의해주세요.',
          'miniGame',
        );
      },
    },
  });

  const handleClick = () => {
    if (!loaderData) {
      adViewSuccess();
      return;
    }
    adDialogRef.current?.onAdView();
  };

  const adViewSuccess = () => {
    if (isSuccess) return;
    mutate({
      publicEventId: pid,
      params: {
        clickKey,
        userId,
      },
    });
  };

  return (
    <DrawSecondLayout>
      <ResultWin>
        <ResultWin.Title>리워드 획득!</ResultWin.Title>
        <ResultWinEmoji />
        <ResultWin.ButtonWrap>
          <GameButton
            onClick={handleClick}
            disabled={isSuccess}
            sx={{backgroundColor: 'game_green.main', color: '#000'}}
          >
            리워드 받기
          </GameButton>
        </ResultWin.ButtonWrap>
      </ResultWin>
      {loaderData?.ads && (
        <ResultWinAdDialog
          ref={adDialogRef}
          adOrder={loaderData.ads.adOrder}
          adViewSuccess={adViewSuccess}
          {...loaderData.ads.adConfigs}
        />
      )}
      <RewardConfirmDialog open={open} onClose={() => setOpen(false)} />
    </DrawSecondLayout>
  );
};

export default DrawSecondResultWin;
