import {FC, HTMLAttributes, useEffect, useRef, useState} from 'react';
import TimerView from './TimerView';

interface Props extends HTMLAttributes<HTMLDivElement> {
  totalTime?: number; // ms
  countTime?: number; // ms
  isIntroducing?: boolean;
  onIntroducingEnd?: () => void;
}

const IntroducingTimer: FC<Props> = ({
  totalTime = 4000,
  countTime = 3000,
  isIntroducing = false,
  onIntroducingEnd,
  ...props
}) => {
  const [display, setDisplay] = useState('준비');
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (isIntroducing) {
      timerRef.current = window.setTimeout(() => {
        startRef.current = Date.now();
        setDisplay((countTime / 1000).toFixed(1));
        intervalRef.current = window.setInterval(() => {
          const now = Date.now();
          const elapsedTime = now - startRef.current;
          const remainingTime = countTime - elapsedTime;
          if (remainingTime <= 0) {
            setDisplay('0');
            onIntroducingEnd?.();
            window.clearInterval(intervalRef.current!);
          } else {
            setDisplay(Math.floor(remainingTime / 1000).toString());
          }
        }, 100);
      }, totalTime);
    } else if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [isIntroducing, totalTime, countTime]);

  const chars = display.split('.')[0];

  return (
    <TimerView {...props}>
      <TimerView.Text>{chars}</TimerView.Text>
    </TimerView>
  );
};
export default IntroducingTimer;
