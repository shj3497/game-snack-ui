import {FC} from 'react';
import Picture, {PictureProps} from '../_atoms/Picture';
import {styled} from '@mui/material';

import ResultFailEmoji_1x from '@/assets/event/common/result_fail-emoji@1x.webp';
import ResultFailEmoji_2x from '@/assets/event/common/result_fail-emoji@1x.webp';
import ResultFailEmoji_3x from '@/assets/event/common/result_fail-emoji@1x.webp';

import ResultFailTear01_1x from '@/assets/event/common/result_fail-tear_02@1x.webp';
import ResultFailTear01_2x from '@/assets/event/common/result_fail-tear_02@2x.webp';
import ResultFailTear01_3x from '@/assets/event/common/result_fail-tear_02@3x.webp';

import ResultFailTear02_1x from '@/assets/event/common/result_fail-tear_01@1x.webp';
import ResultFailTear02_2x from '@/assets/event/common/result_fail-tear_01@2x.webp';
import ResultFailTear02_3x from '@/assets/event/common/result_fail-tear_01@3x.webp';

import FloatingMotion from '../_atoms/FloatingMotion';
import {motion} from 'framer-motion';

interface Props {}

const Container = styled(motion.div)`
  position: relative;
  width: 225px;
  height: 230px;

  .emoji {
    position: absolute;
    top: 34px;
    left: 15px;
    filter: drop-shadow(20px 20px 30px rgba(255, 185, 27, 0.3));
  }

  .tear_01 {
    position: absolute;
    top: 0;
    right: 0;
  }

  .tear_02 {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;

const ResultFailEmoji: FC<Props> = () => {
  const emojiSources: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultFailEmoji_1x,
      '2x': ResultFailEmoji_2x,
    },
    type: 'image/webp',
  };

  const tearSources_01: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultFailTear01_1x,
      '2x': ResultFailTear01_2x,
    },
    type: 'image/webp',
  };

  const tearSources_02: PictureProps['sources'] = {
    srcSet: {
      '1x': ResultFailTear02_1x,
      '2x': ResultFailTear02_2x,
    },
    type: 'image/webp',
  };
  return (
    <Container animate={['initial']}>
      <FloatingMotion className="emoji" delay={0.5}>
        <Picture
          sources={emojiSources}
          alt="emoji"
          src={emojiSources.srcSet['2x']}
          width={188}
          height={178}
        />
      </FloatingMotion>

      <FloatingMotion className="tear_01" delay={1}>
        <Picture
          sources={tearSources_01}
          alt="tear_01"
          src={tearSources_01.srcSet['2x']}
          width={41}
          height={57}
        />
      </FloatingMotion>

      <FloatingMotion className="tear_02" delay={0}>
        <Picture
          sources={tearSources_02}
          alt="tear_02"
          src={tearSources_02.srcSet['2x']}
          width={41}
          height={59}
        />
      </FloatingMotion>
    </Container>
  );
};
export default ResultFailEmoji;
