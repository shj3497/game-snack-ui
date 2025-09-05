import {useRef, useState} from 'react';
import {Coordinate, DiagramType} from './type';
import useCalculateScore from './useCalculateScore';
import drawGuide from './draw-guide';
import createBasePath from './create-base-path';

const diagonal = 115; // width 230px, height 230px;

function removeDuplicates(points: Coordinate[]): Coordinate[] {
  const uniquePoints: Coordinate[] = [];
  const seen = new Set<string>();

  for (const point of points) {
    const identifier = `${point.x},${point.y}`;
    if (!seen.has(identifier)) {
      seen.add(identifier);
      uniquePoints.push(point);
    }
  }

  return uniquePoints;
}

const useCanvasDrawing = (type: DiagramType | undefined = 'square') => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [path, setPath] = useState<Coordinate[]>([]);

  const {calculateScore} = useCalculateScore(type);

  const onInitCanvas = () => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    drawGuide(type, {canvas, diagonal});
  };

  const formatNum = (num: number) => {
    return Math.round(num);
  };

  //*-----------pc drawing start
  const onStartDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = ref.current;
    if (!canvas) return;

    setIsDrawing(true);
    setPath([]);

    const rect = canvas.getBoundingClientRect();

    const x = formatNum(event.clientX - rect.left);
    const y = formatNum(event.clientY - rect.top);

    setPath([{x, y}]);
  };

  const onDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = ref.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const x = formatNum(event.clientX - rect.left);
    const y = formatNum(event.clientY - rect.top);

    setPath((prev) => {
      const newPath = [...prev, {x, y}];
      return newPath;
    });

    drawPath();
  };

  const onEndDrawing = (event?: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);

    const basePath = createBasePath(type, {
      canvas: ref.current!,
      diagonal,
    });
    if (!basePath || !path) return;

    const score = calculateScore(basePath, removeDuplicates(path));

    return score;
  };

  //*-----------pc drawing end

  //*-----------mobile drawing start
  const onTouchStartDrawing = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = ref.current;
    if (!canvas) return;

    setIsDrawing(true);
    setPath([]);

    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();

    const x = formatNum(touch.clientX - rect.left);
    const y = formatNum(touch.clientY - rect.top);

    setPath([{x, y}]);
  };

  const onTouchDrawing = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = ref.current;
    if (!canvas) return;

    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();

    const x = formatNum(touch.clientX - rect.left);
    const y = formatNum(touch.clientY - rect.top);

    setPath((prev) => {
      const newPath = [...prev, {x, y}];
      return newPath;
    });

    drawPath();
  };

  const onTouchEndDrawing = (event?: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);

    const basePath = createBasePath(type, {
      canvas: ref.current!,
      diagonal,
    });
    if (!basePath || !path) return;

    const score = calculateScore(basePath, removeDuplicates(path));

    return score;
  };

  //*-----------mobile drawing end

  //*----------- canvas util functions start

  //* 밑바탕 도형 경로 생성 함수
  const drawPath = () => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawGuide(type, {canvas, diagonal});

    ctx.strokeStyle = 'rgba(0, 255, 188, 1)';
    ctx.lineWidth = 8; // 유저가 그린 경로의 굵기 설정

    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }

    ctx.stroke();
  };

  const getBasePath = () => {
    const basePath = createBasePath(type, {
      canvas: ref.current!,
      diagonal,
    });
    return basePath;
  };

  return {
    ref,
    onStartDrawing,
    onInitCanvas,
    onDrawing,
    onEndDrawing,
    onTouchStartDrawing,
    onTouchDrawing,
    onTouchEndDrawing,
    getBasePath,
  };
};

export default useCanvasDrawing;
