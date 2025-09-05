import {styled} from '@mui/material';
import {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLDivElement> {
  totalTime?: number;
  onTimerEnd?: () => void;
  isPlaying?: boolean;
}

const Container = styled('div')``;

const Text = styled('p')`
  margin: 0;
  color: #fff;
  text-align: center;
  font-family: 'yangjin';
  font-size: 85px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3; /* 49.412% */
  letter-spacing: -3.4px;

  display: flex;
  overflow: visible;
`;

const Item = styled('span')`
  min-width: 62px;
  &.dot {
    min-width: 22px;
  }
`;

export type StopWatchRef = {
  getDisplayTime: () => string;
};

const StopWatch = forwardRef<StopWatchRef, Props>(
  ({totalTime = 6000, isPlaying = false, onTimerEnd, ...props}, ref) => {
    // 누적된 경과 시간(ms)
    const [elapsed, setElapsed] = useState(0);
    // 화면에 표시할 문자열
    const [display, setDisplay] = useState((totalTime / 1000).toFixed(2));

    // 타이머 ID 보관(ref)
    const timerRef = useRef<number | null>(null);
    // 마지막으로 시작한 시각 (ms)
    const startRef = useRef(0);

    // ms → 초.백(소수점 2자리) 포맷팅 함수
    const format = (ms: number) => {
      const fixed = (ms / 1000).toFixed(2); // ex: "1234.56"
      const [intPart, decPart] = fixed.split('.'); // ["1234", "56"]

      let intToShow = intPart;
      // 2) 만약 소수점 앞 자리 수가 3초과하면, 뒤에서 두 글자(십의 자리, 일의 자리)만
      if (intPart.length > 3) {
        intToShow = intPart.slice(-2); // "34"
      }

      return `${intToShow}.${decPart}`; // ex: "34.56"
    };

    useEffect(() => {
      if (isPlaying) {
        // 시작 시점 기록
        startRef.current = Date.now();
        // 10ms마다 갱신
        timerRef.current = window.setInterval(() => {
          const now = Date.now();
          const elapsedTime = now - startRef.current;
          const remainingTime = totalTime - elapsedTime;

          if (remainingTime <= -2000) {
            setDisplay('-2.00');
            onTimerEnd?.();
            window.clearInterval(timerRef.current!);
          } else {
            setDisplay(format(remainingTime));
          }
        }, 20);
      } else {
        // 멈추면 타이머 정리하고 누적시간 업데이트
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }

      // 언마운트 시에도 클리어
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
      // isPlaying 변화 시
    }, [isPlaying]);

    const getDisplayTime = () => {
      return display;
    };

    useImperativeHandle(ref, () => ({
      getDisplayTime,
    }));

    const chars = display.split('');

    return (
      <Container {...props}>
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

export default StopWatch;
