import {styled} from '@mui/material';
import RouletteLayout from './RouletteLayout';
import Roulette, {RouletteRef} from './Roulette';
import {FC, useRef} from 'react';
import GameButton from '@/components/_atoms/GameButton';
import Picture, {PictureProps} from '@/components/_atoms/Picture';
import ParticipateTitle1x from '@/assets/event/roulette/participate-title@1x.webp';
import ParticipateTitle2x from '@/assets/event/roulette/participate-title@2x.webp';
import ParticipateTitle3x from '@/assets/event/roulette/participate-title@3x.webp';

interface Props {
  systemRate: number;
}

const Inner = styled('div')`
  width: 360px;
  height: 740px;
  margin: 0 auto;
  position: relative;
  padding-top: 69px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .roulette {
    margin-top: 17px;
  }
`;

const TitleWrap = styled('div')`
  .text {
    margin: 0;
    margin-top: 6px;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px; /* 164.286% */
    letter-spacing: -0.28px;
  }
`;

const ButtonWrap = styled('div')`
  width: 360px;
  position: absolute;
  bottom: 81px;
  padding: 0 21px;
`;

const RouletteParticipate: FC<Props> = ({systemRate}) => {
  const ref = useRef<RouletteRef>(null);
  const titleSources: PictureProps['sources'] = {
    srcSet: {
      '1x': ParticipateTitle1x,
      '2x': ParticipateTitle2x,
    },
    type: 'image/webp',
  };
  const handleClick = () => {
    ref.current?.startRoulette();
  };
  return (
    <RouletteLayout>
      <Inner>
        {/* <RouletteGameScoreIndicator /> */}
        <TitleWrap>
          <Picture
            sources={titleSources}
            src={titleSources.srcSet['2x']}
            alt=""
            width={289}
            height={118}
          />
          <p className="text">시작버튼을 눌러 룰렛을 돌려보세요!</p>
        </TitleWrap>

        <Roulette ref={ref} className="roulette" systemRate={systemRate} />

        <ButtonWrap>
          <GameButton
            onClick={handleClick}
            sx={{
              backgroundColor: 'game_yellow.main',
              color: '#000',
            }}
          >
            시작
          </GameButton>
        </ButtonWrap>
      </Inner>
    </RouletteLayout>
  );
};
export default RouletteParticipate;
