import {styled} from '@mui/material';
import RpsRouletteLayout from './RpsRouletteLayout';

import RpsRouletteIntro1x from '@/assets/event/rps-roulette/intro-bg@1x.webp';
import RpsRouletteIntro2x from '@/assets/event/rps-roulette/intro-bg@1x.webp';
import RpsRouletteIntro3x from '@/assets/event/rps-roulette/intro-bg@1x.webp';

import Picture, {PictureProps} from '@/components/_atoms/Picture';
import GameButton from '@/components/_atoms/GameButton';
import {Link} from 'react-router-dom';
import paths from '@/lib/utils/paths';
import useRpsRouletteStore from '@/lib/store/events/useRpsRoulette';
import {IntroLoaderResponse} from '@/pages/event/rps-roulette/loader';
import {FC, useRef} from 'react';
import {useGPTReady} from '@/lib/utils/ad/google-publisher-tag/useGPT';
import useAlert from '@/lib/store/useAlert';
import {AdDialogRef} from '../../ad';
import IntroAdDialog from './IntroAdDialog';

interface Props {
  loaderData?: IntroLoaderResponse;
}

const Inner = styled('div')`
  width: 360px;
  height: 740px;
  margin: 0 auto;
  position: relative;
  padding-top: 101px;
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
    '1x': RpsRouletteIntro1x,
    '2x': RpsRouletteIntro2x,
  },
  type: 'image/webp',
};

const RpsRouletteIntro: FC<Props> = ({loaderData}) => {
  const isLimited = useRpsRouletteStore((store) => store.isLimited);
  const isSuccess = useRpsRouletteStore((store) => store.participationCount);
  const isGPTLoading = useGPTReady((store) => store.isLoading);
  const isGPTReady = useGPTReady((store) => store.isReady);
  const onAlertOpen = useAlert((store) => store.onOpen);

  const adDialogRef = useRef<AdDialogRef>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!loaderData) return;
    if (isGPTLoading) return;
    if (isGPTReady) return;
    event.preventDefault();
    if (isLimited) {
      if (isSuccess) {
        onAlertOpen('이미 참여하셨습니다');
      } else {
        onAlertOpen('하루에 3회만 도전 가능합니다.');
      }
      return;
    }
    adDialogRef.current?.onAdView();
  };

  return (
    <RpsRouletteLayout>
      <Inner>
        <Picture
          sources={bgSources}
          src={bgSources.srcSet['2x']}
          alt="intro-bg"
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
            text text text text
            <br />
            <b>text text text text</b>
            <br />
            text text text text
          </p>
        </GameDescSection>
        <ButtonWrap>
          <Link to={paths.event.rps_roulette.participate} onClick={handleClick}>
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
    </RpsRouletteLayout>
  );
};

export default RpsRouletteIntro;
