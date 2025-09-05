import {PictureProps} from '@/components/_atoms/Picture';
import {styled} from '@mui/material';
import {FC, HTMLAttributes} from 'react';

import winNeonOff1x from '@/assets/event/rps-roulette/neon_win_off@1x.webp';
import winNeonOff2x from '@/assets/event/rps-roulette/neon_win_off@2x.webp';
import winNeonOff3x from '@/assets/event/rps-roulette/neon_win_off@3x.webp';

import winNeonOn1x from '@/assets/event/rps-roulette/neon_win_on@1x.webp';
import winNeonOn2x from '@/assets/event/rps-roulette/neon_win_on@2x.webp';
import winNeonOn3x from '@/assets/event/rps-roulette/neon_win_on@3x.webp';

import tieNeonOff1x from '@/assets/event/rps-roulette/neon_tie_off@1x.webp';
import tieNeonOff2x from '@/assets/event/rps-roulette/neon_tie_off@2x.webp';
import tieNeonOff3x from '@/assets/event/rps-roulette/neon_tie_off@3x.webp';

import tieNeonOn1x from '@/assets/event/rps-roulette/neon_tie_on@1x.webp';
import tieNeonOn2x from '@/assets/event/rps-roulette/neon_tie_on@2x.webp';
import tieNeonOn3x from '@/assets/event/rps-roulette/neon_tie_on@3x.webp';

import loseNeonOff1x from '@/assets/event/rps-roulette/neon_lose_off@1x.webp';
import loseNeonOff2x from '@/assets/event/rps-roulette/neon_lose_off@2x.webp';
import loseNeonOff3x from '@/assets/event/rps-roulette/neon_lose_off@3x.webp';

import loseNeonOn1x from '@/assets/event/rps-roulette/neon_lose_on@1x.webp';
import loseNeonOn2x from '@/assets/event/rps-roulette/neon_lose_on@2x.webp';
import loseNeonOn3x from '@/assets/event/rps-roulette/neon_lose_on@3x.webp';
import ResultNeonItem from './ResultNeonItem';

interface Props extends HTMLAttributes<HTMLDivElement> {
  result?: RpsResultType | null;
}

export type RpsResultType = 'win' | 'tie' | 'lose';

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
`;

const winNeonOffSources: PictureProps['sources'] = {
  srcSet: {
    '1x': winNeonOff1x,
    '2x': winNeonOff2x,
  },
  type: 'image/webp',
  alt: '이겼다',
};

const winNeonOnSources: PictureProps['sources'] = {
  srcSet: {
    '1x': winNeonOn1x,
    '2x': winNeonOn2x,
  },
  type: 'image/webp',
  alt: '이겼다',
};

const tieNeonOffSources: PictureProps['sources'] = {
  srcSet: {
    '1x': tieNeonOff1x,
    '2x': tieNeonOff2x,
  },
  type: 'image/webp',
  alt: '비겼다',
};

const tieNeonOnSources: PictureProps['sources'] = {
  srcSet: {
    '1x': tieNeonOn1x,
    '2x': tieNeonOn2x,
  },
  type: 'image/webp',
  alt: '비겼다',
};

const loseNeonOffSources: PictureProps['sources'] = {
  srcSet: {
    '1x': loseNeonOff1x,
    '2x': loseNeonOff2x,
  },
  type: 'image/webp',
  alt: '졌다',
};

const loseNeonOnSources: PictureProps['sources'] = {
  srcSet: {
    '1x': loseNeonOn1x,
    '2x': loseNeonOn2x,
  },
  type: 'image/webp',
  alt: '졌다',
};

const ResultNeon: FC<Props> = ({result, ...props}) => {
  return (
    <Container {...props}>
      <ResultNeonItem
        neonOffSources={winNeonOffSources}
        neonOnSources={winNeonOnSources}
        isNeonOn={result === 'win'}
      />
      <ResultNeonItem
        neonOffSources={tieNeonOffSources}
        neonOnSources={tieNeonOnSources}
        isNeonOn={result === 'tie'}
      />
      <ResultNeonItem
        neonOffSources={loseNeonOffSources}
        neonOnSources={loseNeonOnSources}
        isNeonOn={result === 'lose'}
      />
    </Container>
  );
};

export default ResultNeon;
