import {styled} from '@mui/material';
import CatchSecondLayout from './CatchSecondLayout';

import CatchSecondIntro1x from '@/assets/event/catch-second/intro-bg@1x.webp';
import CatchSecondIntro2x from '@/assets/event/catch-second/intro-bg@2x.webp';
import CatchSecondIntro3x from '@/assets/event/catch-second/intro-bg@3x.webp';
import Picture, {PictureProps} from '@/components/_atoms/Picture';
import GameButton from '@/components/_atoms/GameButton';
import {Link} from 'react-router-dom';
import useCatchSecondStore from '@/lib/store/events/useCatchSecond';
import paths from '@/lib/utils/paths';
import IntroAdDialog from './IntroAdDialog';
import {FC, useRef} from 'react';
import {AdDialogRef} from '../../ad';
import {IntroLoaderResponse} from '@/pages/event/catch-second/loader';
import useAlert from '@/lib/store/useAlert';
import {useGPTReady} from '@/lib/utils/ad/google-publisher-tag/useGPT';

interface Props {
  loaderData?: IntroLoaderResponse;
}

const Inner = styled('div')`
  width: 360px;
  height: 740px;
  margin: 0 auto;
  position: relative;
  padding: 0 0 0 0;
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
      color: #00ffbc;
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
    '1x': CatchSecondIntro1x,
    '2x': CatchSecondIntro2x,
  },
  type: 'image/webp',
};

const CatchSecondIntro: FC<Props> = ({loaderData}) => {
  const isGPTLoading = useGPTReady((store) => store.isLoading);
  const isGPTReady = useGPTReady((store) => store.isReady);

  const isLimited = useCatchSecondStore((store) => store.isLimited);
  const isSuccess = useCatchSecondStore((store) => store.isSuccess);
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
      // if (isSuccess) {
      //   onAlertOpen('이미 참여하셨습니다');
      // } else {
      //   onAlertOpen('하루에 3회만 도전 가능합니다.');
      // }
      onAlertOpen('이미 참여하셨습니다');
      return;
    }

    adDialogRef.current?.onAdView();
  };

  return (
    <CatchSecondLayout>
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
            카운트다운 워치의
            <br />
            <b>0.00초를 맞추면 리워드 획득</b>
            <br />
            (± 0.20초까지 성공)
            <br />
            도전기회는 총 3번
          </p>
        </GameDescSection>
        <ButtonWrap>
          <Link to={paths.event.catch_second.participate} onClick={handleClick}>
            <GameButton
              loading={isGPTLoading}
              sx={{
                backgroundColor: !isGPTLoading
                  ? 'game_green.main'
                  : 'game_green.loading',
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
    </CatchSecondLayout>
  );
};
export default CatchSecondIntro;
