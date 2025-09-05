import {styled} from '@mui/material';

import PcRock1x from '@/assets/event/rps-roulette/pc_rock@1x.webp';
import PcRock2x from '@/assets/event/rps-roulette/pc_rock@2x.webp';
import PcRock3x from '@/assets/event/rps-roulette/pc_rock@3x.webp';

import PcPaper1x from '@/assets/event/rps-roulette/pc_paper@1x.webp';
import PcPaper2x from '@/assets/event/rps-roulette/pc_paper@2x.webp';
import PcPaper3x from '@/assets/event/rps-roulette/pc_paper@3x.webp';

import PcScissors1x from '@/assets/event/rps-roulette/pc_scissors@1x.webp';
import PcScissors2x from '@/assets/event/rps-roulette/pc_scissors@2x.webp';
import PcScissors3x from '@/assets/event/rps-roulette/pc_scissors@3x.webp';
import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {RpsType} from './RpsButtonList';
import {RpsResultType} from './ResultNeon';
import {FC, useCallback, useEffect, useState} from 'react';

interface Props {
  value?: RpsType | null;
  result?: RpsResultType | null;
}

const Container = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
`;

const rockSource: PictureProps['sources'] = {
  srcSet: {
    '1x': PcRock1x,
    '2x': PcRock2x,
  },
  type: 'image/webp',
};

const paperSource: PictureProps['sources'] = {
  srcSet: {
    '1x': PcPaper1x,
    '2x': PcPaper2x,
  },
  type: 'image/webp',
};

const scissorsSource: PictureProps['sources'] = {
  srcSet: {
    '1x': PcScissors1x,
    '2x': PcScissors2x,
  },
  type: 'image/webp',
};

const PcRpsPicture: FC<Props> = ({value, result}) => {
  const [state, setState] = useState<RpsType>('rock');

  const handlePcResult = useCallback(() => {
    if (!value || !result) return;
    if (result === 'win') {
      let temp_value: RpsType = 'rock';
      if (value === 'rock') temp_value = 'scissors';
      if (value === 'scissors') temp_value = 'paper';
      if (value === 'paper') temp_value = 'rock';
      return setState(temp_value);
    }

    if (result === 'lose') {
      let temp_value: RpsType = 'rock';
      if (value === 'rock') temp_value = 'paper';
      if (value === 'scissors') temp_value = 'rock';
      if (value === 'paper') temp_value = 'scissors';
      return setState(temp_value);
    }

    if (result === 'tie') {
      return setState(value);
    }
  }, [result, value]);

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        if (prev === 'rock') return 'scissors';
        if (prev === 'scissors') return 'paper';
        if (prev === 'paper') return 'rock';
        return 'rock';
      });
    }, 150);

    if (!!result && !!value) {
      clearInterval(interval);
      handlePcResult();
    }

    return () => window.clearInterval(interval);
  }, [result, value, handlePcResult]);
  return (
    <Container>
      <Picture
        sources={rockSource}
        alt=""
        src={rockSource.srcSet['2x']}
        width={66}
        height={93}
        sx={{
          position: 'absolute',
          left: '73px',
          opacity: state === 'rock' ? 1 : 0,
        }}
      />
      <Picture
        sources={paperSource}
        alt=""
        src={paperSource.srcSet['2x']}
        width={66}
        height={93}
        sx={{
          position: 'absolute',
          left: '73px',
          opacity: state === 'paper' ? 1 : 0,
        }}
      />
      <Picture
        sources={scissorsSource}
        alt=""
        src={scissorsSource.srcSet['2x']}
        width={66}
        height={93}
        sx={{
          position: 'absolute',
          left: '73px',
          opacity: state === 'scissors' ? 1 : 0,
        }}
      />
    </Container>
  );
};
export default PcRpsPicture;
