import ResultWin from '../common/ResultWin';
import RpsRouletteLayout from './RpsRouletteLayout';
import GameButton from '@/components/_atoms/GameButton';
import ResultWinEmoji from '@/components/_molecules/ResultWinEmoji';
import {FC, useRef, useState} from 'react';
import RewardConfirmDialog from '../common/RewardConfirmDialog';
import {ResultWinLoaderResponse} from '@/pages/event/rps-roulette/loader';
import ResultWinAdDialog from './ResultWinAdDialog';
import {AdDialogRef} from '../../ad';

interface Props {
  point: string | null;
  loaderData?: ResultWinLoaderResponse;
}

const RpsRouletteResultWin: FC<Props> = ({point, loaderData}) => {
  const [open, setOpen] = useState(false);
  const adDialogRef = useRef<AdDialogRef>(null);

  const handleClick = () => {
    if (!loaderData) {
      adViewSuccess();
      return;
    }
    adDialogRef.current?.onAdView();
  };

  const adViewSuccess = () => {
    setOpen(true);
  };

  return (
    <RpsRouletteLayout>
      <ResultWin>
        <ResultWin.Title>
          {!!point ? `${point}P 획득!` : '\u00A0'}
        </ResultWin.Title>
        <ResultWinEmoji />
        <ResultWin.ButtonWrap>
          <GameButton
            onClick={handleClick}
            sx={{backgroundColor: 'game_mint.main', color: '#000'}}
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
    </RpsRouletteLayout>
  );
};
export default RpsRouletteResultWin;
