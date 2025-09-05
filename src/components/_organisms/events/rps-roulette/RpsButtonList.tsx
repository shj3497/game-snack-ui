import {styled} from '@mui/material';
import {FC, HTMLAttributes, useEffect, useState} from 'react';

import paperBtnOff1x from '@/assets/event/rps-roulette/btn_paper_off@1x.webp';
import paperBtnOff2x from '@/assets/event/rps-roulette/btn_paper_off@2x.webp';
import paperBtnOff3x from '@/assets/event/rps-roulette/btn_paper_off@3x.webp';

import paperBtnOn1x from '@/assets/event/rps-roulette/btn_paper_on@1x.webp';
import paperBtnOn2x from '@/assets/event/rps-roulette/btn_paper_on@2x.webp';
import paperBtnOn3x from '@/assets/event/rps-roulette/btn_paper_on@3x.webp';

import rockBtnOff1x from '@/assets/event/rps-roulette/btn_rock_off@1x.webp';
import rockBtnOff2x from '@/assets/event/rps-roulette/btn_rock_off@2x.webp';
import rockBtnOff3x from '@/assets/event/rps-roulette/btn_rock_off@3x.webp';

import rockBtnOn1x from '@/assets/event/rps-roulette/btn_rock_on@1x.webp';
import rockBtnOn2x from '@/assets/event/rps-roulette/btn_rock_on@2x.webp';
import rockBtnOn3x from '@/assets/event/rps-roulette/btn_rock_on@3x.webp';

import scissorsBtnOff1x from '@/assets/event/rps-roulette/btn_scissors_off@1x.webp';
import scissorsBtnOff2x from '@/assets/event/rps-roulette/btn_scissors_off@2x.webp';
import scissorsBtnOff3x from '@/assets/event/rps-roulette/btn_scissors_off@3x.webp';

import scissorsBtnOn1x from '@/assets/event/rps-roulette/btn_scissors_on@1x.webp';
import scissorsBtnOn2x from '@/assets/event/rps-roulette/btn_scissors_on@2x.webp';
import scissorsBtnOn3x from '@/assets/event/rps-roulette/btn_scissors_on@3x.webp';
import {PictureProps} from '@/components/_atoms/Picture';
import RpsButtonItem from './RpsButtonItem';

interface Props extends HTMLAttributes<HTMLDivElement> {
  value?: RpsType | null;
  onBtnClick?: (rpsType: RpsType) => void;
  disabled?: boolean;
}

const paperBtnOffSources: PictureProps['sources'] = {
  srcSet: {
    '1x': paperBtnOff1x,
    '2x': paperBtnOff2x,
  },
  type: 'image/webp',
  alt: '보',
};

const paperBtnOnSources: PictureProps['sources'] = {
  srcSet: {
    '1x': paperBtnOn1x,
    '2x': paperBtnOn2x,
  },
  type: 'image/webp',
  alt: '보',
};

const rockBtnOffSources: PictureProps['sources'] = {
  srcSet: {
    '1x': rockBtnOff1x,
    '2x': rockBtnOff2x,
  },
  type: 'image/webp',
  alt: '바위',
};

const rockBtnOnSources: PictureProps['sources'] = {
  srcSet: {
    '1x': rockBtnOn1x,
    '2x': rockBtnOn2x,
  },
  type: 'image/webp',
  alt: '바위',
};

const scissorsBtnOffSources: PictureProps['sources'] = {
  srcSet: {
    '1x': scissorsBtnOff1x,
    '2x': scissorsBtnOff2x,
  },
  type: 'image/webp',
  alt: '가위',
};

const scissorsBtnOnSources: PictureProps['sources'] = {
  srcSet: {
    '1x': scissorsBtnOn1x,
    '2x': scissorsBtnOn2x,
  },
  type: 'image/webp',
  alt: '가위',
};

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 11px;
`;

export type RpsType = 'rock' | 'paper' | 'scissors';

const RpsButtonList: FC<Props> = ({value, onBtnClick, disabled, ...props}) => {
  const [intervalRps, setIntervalRps] = useState<RpsType>('rock');

  const isRock = intervalRps === 'rock' && (value === 'rock' || !value);
  const isPaper = intervalRps === 'paper' && (value === 'paper' || !value);
  const isScissors =
    intervalRps === 'scissors' && (value === 'scissors' || !value);

  const handleClick = (rpsType: RpsType) => {
    onBtnClick?.(rpsType);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalRps((prev) => {
        if (prev === 'rock') return 'scissors';
        if (prev === 'scissors') return 'paper';
        if (prev === 'paper') return 'rock';
        return 'rock';
      });
    }, 500);

    if (!!value) {
      setIntervalRps(value);
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return (
    <Container {...props}>
      <RpsButtonItem
        btnOffSources={rockBtnOffSources}
        btnOnSources={rockBtnOnSources}
        isLightOn={isRock}
        onClick={() => handleClick('rock')}
        disabled={disabled}
      />
      <RpsButtonItem
        btnOffSources={scissorsBtnOffSources}
        btnOnSources={scissorsBtnOnSources}
        isLightOn={isScissors}
        onClick={() => handleClick('scissors')}
        disabled={disabled}
      />
      <RpsButtonItem
        btnOffSources={paperBtnOffSources}
        btnOnSources={paperBtnOnSources}
        isLightOn={isPaper}
        onClick={() => handleClick('paper')}
        disabled={disabled}
      />
    </Container>
  );
};

export default RpsButtonList;
