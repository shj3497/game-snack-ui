import {styled} from '@mui/material';
import {motion} from 'framer-motion';
import {FC} from 'react';

import ResultWinCoin01_1x from '@/assets/event/common/result_win-coin_01@1x.webp';
import ResultWinCoin01_2x from '@/assets/event/common/result_win-coin_01@2x.webp';
import ResultWinCoin01_3x from '@/assets/event/common/result_win-coin_01@3x.webp';

import ResultWinCoin02_1x from '@/assets/event/common/result_win-coin_02@1x.webp';
import ResultWinCoin02_2x from '@/assets/event/common/result_win-coin_02@2x.webp';
import ResultWinCoin02_3x from '@/assets/event/common/result_win-coin_02@3x.webp';

import ResultWinCoin03_1x from '@/assets/event/common/result_win-coin_03@1x.webp';
import ResultWinCoin03_2x from '@/assets/event/common/result_win-coin_03@2x.webp';
import ResultWinCoin03_3x from '@/assets/event/common/result_win-coin_03@3x.webp';

import ResultWinStar01_1x from '@/assets/event/common/result_win-star_01@1x.webp';
import ResultWinStar01_2x from '@/assets/event/common/result_win-star_01@2x.webp';
import ResultWinStar01_3x from '@/assets/event/common/result_win-star_01@3x.webp';

import ResultWinStar02_1x from '@/assets/event/common/result_win-star_02@1x.webp';
import ResultWinStar02_2x from '@/assets/event/common/result_win-star_02@2x.webp';
import ResultWinStar02_3x from '@/assets/event/common/result_win-star_02@3x.webp';

import ResultWinHeart01_1x from '@/assets/event/common/result_win-heart_01@1x.webp';
import ResultWinHeart01_2x from '@/assets/event/common/result_win-heart_01@2x.webp';
import ResultWinHeart01_3x from '@/assets/event/common/result_win-heart_01@3x.webp';

import ResultWinHeart02_1x from '@/assets/event/common/result_win-heart_02@1x.webp';
import ResultWinHeart02_2x from '@/assets/event/common/result_win-heart_02@2x.webp';
import ResultWinHeart02_3x from '@/assets/event/common/result_win-heart_02@3x.webp';

import ResultWinSquare01_1x from '@/assets/event/common/result_win-square_01@1x.webp';
import ResultWinSquare01_2x from '@/assets/event/common/result_win-square_01@2x.webp';
import ResultWinSquare01_3x from '@/assets/event/common/result_win-square_01@3x.webp';
import Picture, {PictureProps} from '../_atoms/Picture';
import FloatingMotionIcon from '../_atoms/FloatingMotion';

interface Props {}

const Container = styled(motion.div)`
  position: relative;
  width: 250px;
  height: 256px;

  .coin_01,
  .coin_02,
  .coin_03,
  .heart_01,
  .heart_02,
  .star_01,
  .star_02,
  .square_01 {
    position: absolute;
  }

  .coin_01 {
    top: 0;
    left: 14px;
  }

  .coin_02 {
    top: 102px;
    right: 0;
  }

  .coin_03 {
    bottom: 0;
    left: 51px;
  }

  .star_01 {
    top: 0;
    right: 41px;
  }

  .star_02 {
    bottom: 77px;
    left: 0;
  }

  .heart_01 {
    top: 45px;
    right: 0;
  }

  .heart_02 {
    bottom: 74px;
    left: 128px;
  }

  .square_01 {
    bottom: 21px;
    right: 55px;
  }
`;

const ResultWinEmoji: FC<Props> = () => {
  const coinSources_01: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultWinCoin01_1x,
      '2x': ResultWinCoin01_2x,
    },
    type: 'image/webp',
  };

  const coinSources_02: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultWinCoin02_1x,
      '2x': ResultWinCoin02_2x,
    },
    type: 'image/webp',
  };

  const coinSources_03: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultWinCoin03_1x,
      '2x': ResultWinCoin03_2x,
    },
    type: 'image/webp',
  };

  const starSources_01: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultWinStar01_1x,
      '2x': ResultWinStar01_2x,
    },
    type: 'image/webp',
  };

  const starSources_02: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultWinStar02_1x,
      '2x': ResultWinStar02_2x,
    },
    type: 'image/webp',
  };

  const heartSources_01: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultWinHeart01_1x,
      '2x': ResultWinHeart01_2x,
    },
    type: 'image/webp',
  };

  const heartSources_02: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultWinHeart02_1x,
      '2x': ResultWinHeart02_2x,
    },
    type: 'image/webp',
  };

  const squareSources_01: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultWinSquare01_1x,
      '2x': ResultWinSquare01_2x,
    },
    type: 'image/webp',
  };

  return (
    <Container animate="initial">
      <FloatingMotionIcon className="coin_01" delay={0.5}>
        <Picture
          sources={coinSources_01}
          alt="coin_01"
          src={coinSources_01.srcSet['2x']}
          width={162}
          height={134}
        />
      </FloatingMotionIcon>
      <FloatingMotionIcon className="coin_02" delay={0}>
        <Picture
          sources={coinSources_02}
          alt="coin_02"
          src={coinSources_02.srcSet['2x']}
          width={68}
          height={96}
        />
      </FloatingMotionIcon>
      <FloatingMotionIcon className="coin_03" delay={1}>
        <Picture
          sources={coinSources_03}
          alt="coin_03"
          src={coinSources_03.srcSet['2x']}
          width={73}
          height={87}
        />
      </FloatingMotionIcon>
      <FloatingMotionIcon className="heart_01" delay={0.5}>
        <Picture
          sources={heartSources_01}
          alt="heart_01"
          src={heartSources_01.srcSet['2x']}
          width={43}
          height={43}
        />
      </FloatingMotionIcon>
      <FloatingMotionIcon className="heart_02" delay={0}>
        <Picture
          sources={heartSources_02}
          alt="heart_02"
          src={heartSources_02.srcSet['2x']}
          width={27}
          height={27}
        />
      </FloatingMotionIcon>
      <FloatingMotionIcon className="star_01" delay={0.5}>
        <Picture
          sources={starSources_01}
          alt="star_01"
          src={starSources_01.srcSet['2x']}
          width={50}
          height={50}
        />
      </FloatingMotionIcon>
      <FloatingMotionIcon className="star_02" delay={0}>
        <Picture
          sources={starSources_02}
          alt="star_02"
          src={starSources_02.srcSet['2x']}
          width={58}
          height={58}
        />
      </FloatingMotionIcon>
      <FloatingMotionIcon className="square_01" delay={0.5}>
        <Picture
          sources={squareSources_01}
          alt="square_01"
          src={squareSources_01.srcSet['2x']}
          width={39}
          height={39}
        />
      </FloatingMotionIcon>
    </Container>
  );
};
export default ResultWinEmoji;
