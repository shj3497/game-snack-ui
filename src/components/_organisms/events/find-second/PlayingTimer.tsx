import {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import TimerView from './TimerView';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  totalTime?: number; // ms
  isPlaying?: boolean;
  onTimerEnd?: () => void;
}

export type PlayingTimerRef = {
  getDisplayTime: () => string;
};

const PlayingTimer = forwardRef<PlayingTimerRef, Props>(
  ({totalTime = 6000, isPlaying, onTimerEnd, ...props}, ref) => {
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
      <TimerView {...props}>
        <TimerView.Text>
          {chars.map((char, index) => (
            <TimerView.TextItem
              key={index}
              className={classNames({dot: char === '.'})}
            >
              {char}
            </TimerView.TextItem>
          ))}
        </TimerView.Text>
      </TimerView>
    );
  },
);

export default PlayingTimer;
