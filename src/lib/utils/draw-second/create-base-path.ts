import {Coordinate, DiagramType} from './type';

const squareBasePath = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
  pointInterval: number | undefined = 1,
) => {
  const dpr = window.devicePixelRatio || 1;

  const sideLength = diagonal * 2;
  const startX = (canvas.width / dpr - sideLength) / 2;
  const startY = (canvas.height / dpr - sideLength) / 2;

  const basePath: Coordinate[] = [];
  // 각 변을 pointInterval 간격으로 나누기
  const numPointsPerSide = Math.floor(sideLength / pointInterval);

  for (let i = 0; i <= numPointsPerSide; i++) {
    const t = i / numPointsPerSide;
    basePath.push({x: startX + t * sideLength, y: startY}); // 상단 변
  }
  for (let i = 1; i <= numPointsPerSide; i++) {
    const t = i / numPointsPerSide;
    basePath.push({x: startX + sideLength, y: startY + t * sideLength}); // 우측 변
  }
  for (let i = 1; i <= numPointsPerSide; i++) {
    const t = i / numPointsPerSide;
    basePath.push({
      x: startX + (1 - t) * sideLength,
      y: startY + sideLength,
    }); // 하단 변
  }
  for (let i = 1; i < numPointsPerSide; i++) {
    const t = i / numPointsPerSide;
    basePath.push({x: startX, y: startY + (1 - t) * sideLength}); // 좌측 변
  }

  return basePath;
};

const circleBasePath = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
  pointInterval: number | undefined = 1,
) => {
  const dpr = window.devicePixelRatio || 1;

  const radius = diagonal;
  const centerX = canvas.width / dpr / 2;
  const centerY = canvas.height / dpr / 2;

  const basePath: Coordinate[] = [];
  const numPoints = Math.floor((Math.PI * radius * 2) / pointInterval);

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const angle = Math.PI * 2 * t;
    basePath.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  return basePath;
};

const triangleBasePath = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
  pointInterval: number | undefined = 1,
) => {
  const dpr = window.devicePixelRatio || 1;

  const sideLength = diagonal * 2;
  const startX = canvas.width / dpr / 2;
  const startY = canvas.height / dpr / 2 + 30; // 캔버스의 중심점으로 원을 그릴경우 삼각형이 잘리는 현상을 방지하기 위해 y축으로 30px 이동

  const basePath: Coordinate[] = [];
  // 각 변을 pointInterval 간격으로 나누기
  const height = (Math.sqrt(3) / 2) * sideLength;
  const points = [
    {x: startX, y: startY - (height * 2) / 3}, // 위쪽 꼭지점
    {x: startX - sideLength / 2, y: startY + height / 3}, // 왼쪽 아래 꼭지점
    {x: startX + sideLength / 2, y: startY + height / 3}, // 오른쪽 아래 꼭지점
  ];

  // 각 변을 pointInterval 간격으로 나누기
  const numPointsPerSide = Math.floor(sideLength / pointInterval);

  // 위쪽 변
  for (let i = 0; i <= numPointsPerSide; i++) {
    const t = i / numPointsPerSide;
    basePath.push({
      x: points[0].x + t * (points[1].x - points[0].x),
      y: points[0].y + t * (points[1].y - points[0].y),
    });
  }

  // 왼쪽 변
  for (let i = 1; i <= numPointsPerSide; i++) {
    const t = i / numPointsPerSide;
    basePath.push({
      x: points[1].x + t * (points[2].x - points[1].x),
      y: points[1].y + t * (points[2].y - points[1].y),
    });
  }

  // 오른쪽 변
  for (let i = 1; i < numPointsPerSide; i++) {
    const t = i / numPointsPerSide;
    basePath.push({
      x: points[2].x + t * (points[0].x - points[2].x),
      y: points[2].y + t * (points[0].y - points[2].y),
    });
  }

  return basePath;
};

const rhombusBasePath = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
  pointInterval: number | undefined = 1,
) => {
  const dpr = window.devicePixelRatio || 1;

  const sideLength = diagonal;
  const startX = canvas.width / dpr / 2;
  const startY = canvas.height / dpr / 2;

  const basePath: Coordinate[] = [];
  // 각 변을 pointInterval 간격으로 나누기
  const numPointsPerSide = Math.floor(sideLength / pointInterval);

  // 회전된 사각형(마름모)의 꼭지점 계산
  const points: Coordinate[] = [
    {x: startX, y: startY - sideLength}, // 위쪽 점
    {x: startX + sideLength, y: startY}, // 오른쪽 점
    {x: startX, y: startY + sideLength}, // 아래쪽 점
    {x: startX - sideLength, y: startY}, // 왼쪽 점
  ];

  // 각 변을 pointInterval 간격으로 나누기
  for (let sideIndex = 0; sideIndex < points.length; sideIndex++) {
    const start = points[sideIndex];
    const end = points[(sideIndex + 1) % points.length];

    for (let i = 0; i <= numPointsPerSide; i++) {
      const t = i / numPointsPerSide;
      basePath.push({
        x: start.x + t * (end.x - start.x),
        y: start.y + t * (end.y - start.y),
      });
    }
  }

  return basePath;
};

const pentagonBasePath = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
  pointInterval: number | undefined = 1,
) => {
  const dpr = window.devicePixelRatio || 1;

  const radius = diagonal; // 오각형을 내접할 원의 반지름
  const centerX = canvas.width / dpr / 2;
  const centerY = canvas.height / dpr / 2;

  const basePath: Coordinate[] = [];

  // 오각형의 각 꼭지점 계산
  const points: Coordinate[] = [];
  const angleOffset = -Math.PI / 2; // 위쪽에서 시작하기 위한 각도 오프셋

  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 + angleOffset;
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
  }

  // 각 변을 pointInterval 간격으로 나누기
  const sideLength = 2 * radius * Math.sin(Math.PI / 5); // 오각형의 변 길이
  const numPointsPerSide = Math.floor(sideLength / pointInterval);

  for (let sideIndex = 0; sideIndex < points.length; sideIndex++) {
    const start = points[sideIndex];
    const end = points[(sideIndex + 1) % points.length];

    for (let i = 0; i <= numPointsPerSide; i++) {
      const t = i / numPointsPerSide;
      basePath.push({
        x: start.x + t * (end.x - start.x),
        y: start.y + t * (end.y - start.y),
      });
    }
  }

  return basePath;
};

const createBasePath = (
  type: DiagramType,
  config: {
    canvas: HTMLCanvasElement;
    diagonal: number | undefined;
    pointInterval?: number;
  },
) => {
  if (type === 'square') {
    return squareBasePath(config.canvas, config.diagonal, config.pointInterval);
  }
  if (type === 'circle') {
    return circleBasePath(config.canvas, config.diagonal, config.pointInterval);
  }
  if (type === 'triangle') {
    return triangleBasePath(
      config.canvas,
      config.diagonal,
      config.pointInterval,
    );
  }
  if (type === 'rhombus') {
    return rhombusBasePath(
      config.canvas,
      config.diagonal,
      config.pointInterval,
    );
  }

  if (type === 'pentagon') {
    return pentagonBasePath(
      config.canvas,
      config.diagonal,
      config.pointInterval,
    );
  }
};

export default createBasePath;
