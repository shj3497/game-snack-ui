import {styled} from '@mui/material';
import FindSecondLayout from './FindSecondLayout';

import FindSecondIntro1x from '@/assets/event/find-second/intro-bg@1x.webp';
import FindSecondIntro2x from '@/assets/event/find-second/intro-bg@2x.webp';
import FindSecondIntro3x from '@/assets/event/find-second/intro-bg@3x.webp';
import Picture, {PictureProps} from '@/components/_atoms/Picture';
import GameButton from '@/components/_atoms/GameButton';
import {Link} from 'react-router-dom';
import useFindSecondStore from '@/lib/store/events/useFindSecond';
import paths from '@/lib/utils/paths';
import {IntroLoaderResponse} from '@/pages/event/find-second/loader';
import {FC, useRef} from 'react';
import IntroAdDialog from './IntroAdDialog';
import {AdDialogRef} from '../../ad';
import {useGPTReady} from '@/lib/utils/ad/google-publisher-tag/useGPT';
import useAlert from '@/lib/store/useAlert';

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
    '1x': FindSecondIntro1x,
    '2x': FindSecondIntro2x,
  },
  type: 'image/webp',
};

const FindSecondIntro: FC<Props> = ({loaderData}) => {
  const isLimited = useFindSecondStore((store) => store.isLimited);
  const isSuccess = useFindSecondStore((store) => store.isSuccess);

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
    <FindSecondLayout>
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
            제한시간 내에 제시된 <b>숫자 박스를</b>
            <br />
            <b>순서대로 찾으면 리워드 획득</b>
            <br />
            도전기회는 총 3번
          </p>
        </GameDescSection>
        <ButtonWrap>
          <Link to={paths.event.find_second.participate} onClick={handleClick}>
            <GameButton
              sx={{
                backgroundColor: 'game_green.main',
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
    </FindSecondLayout>
  );
};
export default FindSecondIntro;
