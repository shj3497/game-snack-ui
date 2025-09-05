import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {styled} from '@mui/material';
import {forwardRef, HTMLAttributes, useImperativeHandle, useRef} from 'react';

import RoulettePin1x from '@/assets/event/roulette/roulette-pin@1x.webp';
import RoulettePin2x from '@/assets/event/roulette/roulette-pin@2x.webp';
import RoulettePin3x from '@/assets/event/roulette/roulette-pin@3x.webp';

import RouletteImg1x from '@/assets/event/roulette/roulette@1x.webp';
import RouletteImg2x from '@/assets/event/roulette/roulette@2x.webp';
import RouletteImg3x from '@/assets/event/roulette/roulette@3x.webp';

import RoulettePannel1x from '@/assets/event/roulette/roulette-pannel@1x.webp';
import RoulettePannel2x from '@/assets/event/roulette/roulette-pannel@2x.webp';
import RoulettePannel3x from '@/assets/event/roulette/roulette-pannel@3x.webp';

import RouletteBtn1x from '@/assets/event/roulette/roulette-start_btn@1x.webp';
import RouletteBtn2x from '@/assets/event/roulette/roulette-start_btn@2x.webp';
import RouletteBtn3x from '@/assets/event/roulette/roulette-start_btn@3x.webp';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  onStart: () => void;
}

const Container = styled('div')`
  display: flex;
  position: relative;
  width: fit-content;
  img,
  picture {
    user-select: none;
    pointer-events: none;
  }
`;

const Pin = styled('span')`
  position: absolute;
  z-index: 5;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const RouletteImg = styled('div')`
  position: relative;
  z-index: 2;
  transition: all 5s ease-in-out;
  display: flex;
  justify-content: center;
`;

const PannelImg = styled('div')`
  position: absolute;
  z-index: 3;
  top: 20px;
  transform-origin: center center;
  transition: rotate 5s ease-in-out;
`;

const StartButton = styled('div')`
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  padding: 0;
  transform: translate(-50%, -50%);
`;

export type RouletteViewRef = {
  rotateRoulette: (point: number) => void;
  rouletteRef: React.RefObject<HTMLDivElement | null>;
};

const points = [0, 1, 0, 1, 0, 1, 0, 1];

export const RouletteView = forwardRef<RouletteViewRef, Props>(
  ({onStart, ...props}, ref) => {
    const rouletteRef = useRef<HTMLDivElement>(null);
    const pinSources: PictureProps['sources'] = {
      srcSet: {
        '1x': RoulettePin1x,
        '2x': RoulettePin2x,
      },
      type: 'image/webp',
    };

    const rouletteSources: PictureProps['sources'] = {
      srcSet: {
        '1x': RouletteImg1x,
        '2x': RouletteImg2x,
      },
      type: 'image/webp',
    };

    const roulettePannelSources: PictureProps['sources'] = {
      srcSet: {
        '1x': RoulettePannel1x,
        '2x': RoulettePannel2x,
      },
      type: 'image/webp',
    };

    const btnSources: PictureProps['sources'] = {
      srcSet: {
        '1x': RouletteBtn1x,
        '2x': RouletteBtn2x,
      },
      type: 'image/webp',
    };

    const rotateRoulette = (point: number) => {
      const index = points.indexOf(point);
      const addDeg = (360 / 8) * index + 360 / (8 * 2);

      if (!rouletteRef.current) return;
      rouletteRef.current.style.rotate = `-${360 * 50 + addDeg}deg`;
    };

    useImperativeHandle(ref, () => ({
      rotateRoulette,
      rouletteRef,
    }));

    return (
      <Container {...props}>
        <Pin>
          <Picture
            sources={pinSources}
            src={pinSources.srcSet['2x']}
            alt=""
            width={29}
            height={41}
          />
        </Pin>
        <RouletteImg>
          <Picture
            sources={rouletteSources}
            src={rouletteSources.srcSet['2x']}
            alt=""
            width={347}
            height={350}
          />
          <PannelImg ref={rouletteRef}>
            <Picture
              sources={roulettePannelSources}
              src={roulettePannelSources.srcSet['2x']}
              alt=""
              width={310}
              height={310}
            />
          </PannelImg>
        </RouletteImg>

        <StartButton>
          <Picture
            sources={btnSources}
            src={btnSources.srcSet['2x']}
            alt=""
            width={36}
            height={36}
          />
        </StartButton>
      </Container>
    );
  },
);
