import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {styled} from '@mui/material';
import RouletteIntro1x from '@/assets/event/roulette/intro-bg@1x.webp';
import RouletteIntro2x from '@/assets/event/roulette/intro-bg@2x.webp';
import RouletteIntro3x from '@/assets/event/roulette/intro-bg@3x.webp';

import GameButton from '@/components/_atoms/GameButton';
import {Link} from 'react-router-dom';
import paths from '@/lib/utils/paths';
import RouletteLayout from './RouletteLayout';
import useRouletteStore from '@/lib/store/events/useRoulette';
import {FC, useRef} from 'react';
import {useGPTReady} from '@/lib/utils/ad/google-publisher-tag/useGPT';
import useAlert from '@/lib/store/useAlert';
import {AdDialogRef} from '../../ad';
import {IntroLoaderResponse} from '@/pages/event/roulette/loader';
import IntroAdDialog from './IntroAdDialog';

interface Props {
  loaderData?: IntroLoaderResponse;
}

const Inner = styled('div')`
  width: 360px;
  height: 740px;
  margin: 0 auto;
  position: relative;
  padding: 93px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const GameDescSection = styled('div')`
  padding-bottom: 185px;
  .text {
    margin: 0;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px; /* 143.75% */
    letter-spacing: -0.32px;
    b {
      color: #00fcff;
    }
  }
`;

const ButtonWrap = styled('div')`
  width: 360px;
  position: absolute;
  bottom: 51px;
  padding: 0 21px;

  .notice {
    margin: 6px 0 0 0;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px; /* 164.286% */
    letter-spacing: -0.28px;
  }
`;

const bgSources: PictureProps['sources'] = {
  srcSet: {
    '1x': RouletteIntro1x,
    '2x': RouletteIntro2x,
  },
  type: 'image/webp',
};

const RouletteIntro: FC<Props> = ({loaderData}) => {
  const isGPTLoading = useGPTReady((store) => store.isLoading);
  const isGPTReady = useGPTReady((store) => store.isReady);

  const isLimited = useRouletteStore((store) => store.isLimited);
  const isSuccess = useRouletteStore((store) => store.isSuccess);
  const onAlertOpen = useAlert((store) => store.onOpen);

  const adDialogRef = useRef<AdDialogRef>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!loaderData) return;
    if (isGPTLoading) return;
    if (isGPTReady) return;
    event.preventDefault();
    if (isLimited || isSuccess || loaderData.isWin) {
      onAlertOpen('이미 참여하셨습니다');
      return;
    }
    adDialogRef.current?.onAdView();
  };

  return (
    <RouletteLayout>
      <Inner>
        <Picture
          sources={bgSources}
          alt="intro-bg"
          src={bgSources.srcSet['2x']}
          sx={{
            position: 'absolute',
            zIndex: 0,
            top: 0,
            width: '660px',
            height: '100%',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
        <GameDescSection>
          <p className="text">
            룰렛을 돌려
            <br />
            <b>리워드</b>를 획득해보세요
            <br />
            <b>1일 1회</b> 참여 가능합니다
          </p>
        </GameDescSection>
        <ButtonWrap>
          <Link to={paths.event.roulette.participate} onClick={handleClick}>
            <GameButton
              sx={{
                backgroundColor: 'game_mint.main',
                color: '#000',
              }}
            >
              도전하러 가기
            </GameButton>
          </Link>
          <p className="notice">*참여하기 전 광고가 노출됩니다</p>
        </ButtonWrap>
      </Inner>
      {loaderData?.ads && (
        <IntroAdDialog
          {...loaderData.ads.adConfigs}
          adOrder={loaderData.ads.adOrder}
          ref={adDialogRef}
        />
      )}
    </RouletteLayout>
  );
};

export default RouletteIntro;
