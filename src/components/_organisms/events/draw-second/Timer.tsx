import Picture, {PictureProps} from '@/components/_atoms/Picture';
import {styled} from '@mui/material';
import classNames from 'classnames';
import {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import TimerIcon1x from '@/assets/event/common/timer-icon@1x.webp';
import TimerIcon2x from '@/assets/event/common/timer-icon@2x.webp';
import TimerIcon3x from '@/assets/event/common/timer-icon@3x.webp';

interface Props extends HTMLAttributes<HTMLDivElement> {
  totalTime?: number; // ms
  isPlaying?: boolean;
  onTimerEnd?: () => void;
}

const Container = styled('div')`
  position: relative;
  width: 150px;
  padding: 10px 20px 10px 20px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
`;

const Text = styled('p')`
  margin: 0;
  color: #fff;
  text-align: center;
  font-family: 'Pretendard';
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.64px;

  display: flex;
`;

const Item = styled('span')`
  min-width: 21px;
  &.dot {
    min-width: 8.5px;
  }
`;

const sources: PictureProps['sources'] = {
  srcSet: {
    '1x': TimerIcon1x,
    '2x': TimerIcon2x,
  },
  type: 'image/webp',
};

export type TimerRef = {
  getDisplayTime: () => string;
};

const Timer = forwardRef<TimerRef, Props>(
  ({totalTime = 6000, isPlaying = false, onTimerEnd, ...props}, ref) => {
    const [display, setDisplay] = useState((totalTime / 1000).toFixed(2));
    const timerRef = useRef<number | null>(null);
    const startRef = useRef<number>(0);

    const format = (ms: number) => {
      const fixed = (ms / 1000).toFixed(2); // ex: "1234.56"
      const [intPart, decPart] = fixed.split('.'); // ["1234", "56"]
      let intToShow = intPart;
      if (intToShow.length > 3) {
        intToShow = intToShow.slice(-2);
      }
      return `${intToShow}.${decPart}`; // ex: "34.56"
    };

    useEffect(() => {
      if (isPlaying) {
        startRef.current = Date.now();
        timerRef.current = window.setInterval(() => {
          const now = Date.now();
          const elapsedTime = now - startRef.current;
          const remainingTime = totalTime - elapsedTime;
          if (remainingTime <= 0) {
            setDisplay('0.00');
            onTimerEnd?.();
            window.clearInterval(timerRef.current!);
          } else {
            setDisplay(format(remainingTime));
          }
        }, 10);
      } else if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      return () => {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
        }
      };
    }, [isPlaying, totalTime]);

    const getDisplayTime = () => {
      return display;
    };

    useImperativeHandle(ref, () => ({
      getDisplayTime,
    }));

    const chars = display.split('');

    return (
      <Container {...props}>
        <Picture
          sources={sources}
          alt="timer"
          src={sources.srcSet['2x']}
          width={110}
          height={88}
          sx={{
            position: 'absolute',
            left: '-60px',
            bottom: '-9px',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
        <Text>
          {chars.map((char, index) => (
            <Item key={index} className={classNames({dot: char === '.'})}>
              {char}
            </Item>
          ))}
        </Text>
      </Container>
    );
  },
);
export default Timer;
