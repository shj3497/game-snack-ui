import {Coordinate, DiagramType} from './type';

const strokeColor = 'rgba(255, 255, 255, 0.4)';

const drawGuideSquare = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.beginPath();
  const sideLength = diagonal * 2;
  const dpr = window.devicePixelRatio || 1;

  const startX = (ctx.canvas.width / dpr - sideLength) / 2;
  const startY = (ctx.canvas.height / dpr - sideLength) / 2;
  ctx.rect(startX, startY, sideLength, sideLength);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.stroke();
};

const drawGuideCircle = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.beginPath();
  const radius = diagonal;
  const dpr = window.devicePixelRatio || 1;

  const centerX = ctx.canvas.width / dpr / 2;
  const centerY = ctx.canvas.height / dpr / 2;
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.stroke();
};

const drawGuideTriangle = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.beginPath();
  const sideLength = diagonal * 2;
  const dpr = window.devicePixelRatio || 1;

  const startX = ctx.canvas.width / dpr / 2;
  const startY = ctx.canvas.height / dpr / 2 + 30; // 캔버스의 중심점으로 원을 그릴경우 삼각형이 잘리는 현상을 방지하기 위해 y축으로 30px 이동

  const height = (Math.sqrt(3) / 2) * sideLength;
  const points: Coordinate[] = [
    {x: startX, y: startY - (height * 2) / 3}, // 위쪽 꼭지점
    {x: startX - sideLength / 2, y: startY + height / 3}, // 왼쪽 아래 꼭지점
    {x: startX + sideLength / 2, y: startY + height / 3}, // 오른쪽 아래 꼭지점
  ];
  // 정삼각형 그리기
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.stroke();
};

const drawGuideRhombus = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.beginPath();

  const dpr = window.devicePixelRatio || 1;
  const startX = ctx.canvas.width / dpr / 2;
  const startY = ctx.canvas.height / dpr / 2;
  // 정사각형을 45도 회전한 마름모의 대각선 길이
  const sideLength = diagonal;

  // 회전된 사각형(마름모)의 꼭지점 계산
  const points: Coordinate[] = [
    {x: startX, y: startY - sideLength}, // 위쪽 점
    {x: startX + sideLength, y: startY}, // 오른쪽 점
    {x: startX, y: startY + sideLength}, // 아래쪽 점
    {x: startX - sideLength, y: startY}, // 왼쪽 점
  ];

  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.stroke();
};

const drawGuidePentagon = (
  canvas: HTMLCanvasElement,
  diagonal: number | undefined = 105,
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.beginPath();

  const dpr = window.devicePixelRatio || 1;
  const radius = diagonal;
  const centerX = ctx.canvas.width / dpr / 2;
  const centerY = ctx.canvas.height / dpr / 2;

  // 오각형의 꼭지점 계산
  const points: Coordinate[] = [];
  const angleOffset = -Math.PI / 2; // 위쪽에서 시작하도록 각도를 조정

  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 + angleOffset;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({x, y});
  }

  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.stroke();
};

const drawGuide = (
  diagram: DiagramType,
  config: {
    canvas: HTMLCanvasElement;
    diagonal: number | undefined;
  },
) => {
  if (diagram === 'square') {
    drawGuideSquare(config.canvas, config.diagonal);
  }
  if (diagram === 'circle') {
    drawGuideCircle(config.canvas, config.diagonal);
  }
  if (diagram === 'triangle') {
    drawGuideTriangle(config.canvas, config.diagonal);
  }
  if (diagram === 'rhombus') {
    drawGuideRhombus(config.canvas, config.diagonal);
  }
  if (diagram === 'pentagon') {
    drawGuidePentagon(config.canvas, config.diagonal);
  }
};

export default drawGuide;
