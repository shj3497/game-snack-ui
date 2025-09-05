import {FC, useEffect, useRef, useState} from 'react';
import {effectSources} from './roulette-pannel-sources';
import Picture from '@/components/_atoms/Picture';
import {RpsPointType} from './RoulettePannel';

interface Props {
  point: RpsPointType | null;
  onRouletteEnd?: () => void;
}

// const pointList = [3,1,2,3,1,2,1,2]
const pointList = [
  {index: 0, point: 3},
  {index: 1, point: 1},
  {index: 2, point: 2},
  {index: 3, point: 3},
  {index: 4, point: 1},
  {index: 5, point: 2},
  {index: 6, point: 1},
  {index: 7, point: 2},
];

const RoulettePannelEffect: FC<Props> = ({point, onRouletteEnd}) => {
  const [state, setState] = useState<number | null>(null);
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (point === null) return;
    const startTime = Date.now();
    const fastDuration = 2000; // 빠른 회전 단계 2초
    const slowDuration = 2000; // 느린 회전 단계 2초
    let currentDelay = 50; // 초기 회전 간격

    // 재귀적으로 state를 업데이트하는 spin 함수
    const spin = () => {
      const elapsed = Date.now() - startTime;

      // state 업데이트
      setState((prev) => {
        prev = prev || pointList[0].index;
        const curIndex = pointList.indexOf(
          pointList.find((item) => item.index === prev)!,
        );
        const nextIndex = (curIndex + 1) % pointList.length;
        const nextVal = pointList[nextIndex].index;

        return nextVal;
      });

      if (elapsed < fastDuration) {
        // 빠른 회전 단계: 일정한 딜레이
        currentDelay = 50;
        spinTimeoutRef.current = setTimeout(spin, currentDelay);
      } else if (elapsed < fastDuration + slowDuration) {
        // 감속 단계: 선형으로 딜레이 증가 (최대 300ms까지)
        const elapsedSlow = elapsed - fastDuration;
        const maxDelay = 300;
        currentDelay = 50 + (maxDelay - 50) * (elapsedSlow / slowDuration);
        spinTimeoutRef.current = setTimeout(spin, currentDelay);
      } else {
        // 감속 단계 종료 후 최종 단계 실행
        spinTimeoutRef.current = setTimeout(finalSpin, currentDelay);
      }
    };

    let finalCount = 0;
    // 최종 단계: target(point)에 도달할 때까지 state 업데이트
    const finalSpin = () => {
      let isSamePoint = true;

      setState((prev) => {
        prev = prev || pointList[0].index;
        const curIndex = pointList.indexOf(
          pointList.find((item) => item.index === prev)!,
        );
        const nextIndex = (curIndex + 1) % pointList.length;
        const nextVal = pointList[nextIndex].index;

        if (pointList[prev].point !== point) {
          isSamePoint = true;
          return nextVal;
        }

        isSamePoint = false;
        return prev;
      });

      // 업데이트 후 target과 같지 않으면 재귀 호출
      if (isSamePoint) {
        finalCount++;
        spinTimeoutRef.current = setTimeout(
          finalSpin,
          currentDelay + 100 + finalCount * 100,
        );
      }

      if (!isSamePoint) {
        // 최종 단계 종료
        clearTimeout(spinTimeoutRef.current!);
        spinTimeoutRef.current = null;
        setTimeout(() => {
          onRouletteEnd?.();
        }, 1000);
      }
    };

    // 회전 시작
    spinTimeoutRef.current = setTimeout(spin, currentDelay);

    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, [point, onRouletteEnd]);

  return (
    <div>
      {effectSources.map((source, index) => (
        <Picture
          key={index}
          sources={source}
          alt=""
          src={source.srcSet['2x']}
          width="222px"
          height="222px"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: index === state ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};
export default RoulettePannelEffect;
