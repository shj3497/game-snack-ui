import useCanvasDrawing, {DiagramType} from '@/lib/utils/draw-second';
import {styled} from '@mui/material';
import {debounce} from 'lodash';
import {FC, useEffect, useState} from 'react';

interface Props {
  diagram: DiagramType;
  isFinish?: boolean;
  className?: string;
  onDrawEnd?: (score?: number) => void;
}

const Canvas = styled('canvas')`
  width: 300px;
  height: 100%;
`;

const DrawCanvas: FC<Props> = ({
  diagram,
  isFinish = false,
  className,
  onDrawEnd,
}) => {
  const {
    ref,
    onInitCanvas,
    onDrawing,
    onStartDrawing,
    onEndDrawing,
    onTouchDrawing,
    onTouchStartDrawing,
    onTouchEndDrawing,
  } = useCanvasDrawing(diagram);
  const [isDisabled, setIsDisabled] = useState(isFinish);

  const handleTouchDrawing = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDisabled) return;
    onTouchDrawing(event);
  };

  const handleTouchDrawStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    onTouchStartDrawing(event);
  };

  const handleTouchDrawEnd = () => {
    setIsDisabled(true);
  };

  const handleMouseDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDisabled) return;
    onDrawing(event);
  };

  const handleMouseDrawStart = (event: React.MouseEvent<HTMLCanvasElement>) => {
    onStartDrawing(event);
  };

  const handleMouseDrawEnd = () => {
    setIsDisabled(true);
  };

  useEffect(() => {
    onInitCanvas();
    const debounceInitCanvas = debounce(() => {
      onInitCanvas();
    }, 300);

    window.addEventListener('resize', debounceInitCanvas);
    return () => {
      debounceInitCanvas.cancel();
      window.removeEventListener('resize', debounceInitCanvas);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  //? isDisabled 인 경우 draw가 끝났다고 판단하여 score를 위로 전달
  useEffect(() => {
    if (!isDisabled) return;
    const score1 = onEndDrawing() || 0;
    const score2 = onTouchEndDrawing() || 0;
    let score = score1 > score2 ? score1 : score2;
    onDrawEnd?.(score);
  }, [isDisabled]);

  //? timer가 종료되었을 때 isDisabled 업데이트
  //? isFinish라면 EndDrawing을 호출하여 hook 내부에 있는 isDrawing을 false로 변경해줌
  useEffect(() => {
    setIsDisabled(isFinish);
    if (isFinish) {
      onEndDrawing();
      onTouchEndDrawing();
    }
  }, [isFinish]);

  return (
    <Canvas
      ref={ref}
      width="300px"
      height="300px"
      className={className}
      onTouchEnd={handleTouchDrawEnd}
      onTouchStart={handleTouchDrawStart}
      onTouchMove={handleTouchDrawing}
      onMouseDown={handleMouseDrawStart}
      onMouseUp={handleMouseDrawEnd}
      onMouseMove={handleMouseDrawing}
    />
  );
};
export default DrawCanvas;
