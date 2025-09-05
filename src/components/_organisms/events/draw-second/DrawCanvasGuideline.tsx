import useCanvasDrawing, {DiagramType} from '@/lib/utils/draw-second';
import createBasePath from '@/lib/utils/draw-second/create-base-path';
import {styled} from '@mui/material';
import {FC, useEffect} from 'react';

interface Props {
  diagram: DiagramType;
}

const Canvas = styled('canvas')`
  width: 300px;
  height: 100%;
`;

const DrawCanvasGuideline: FC<Props> = ({diagram}) => {
  const {ref, onInitCanvas, getBasePath} = useCanvasDrawing(diagram);

  useEffect(() => {
    onInitCanvas();

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const basePath = getBasePath();
    if (!basePath) return;

    const smallCircleRadius = 13;
    let currentIndex = 0;
    const speed = 1;

    const draw = () => {
      currentIndex = (currentIndex + speed) % basePath.length; // 인덱스 순환

      // Clear the canvas before drawing the next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Optionally, redraw the background or stationary elements here
      onInitCanvas();

      // Draw the small moving circle
      const {x, y} = basePath[currentIndex];
      ctx.beginPath();
      ctx.arc(x, y, smallCircleRadius, 0, Math.PI * 2);

      ctx.fillStyle = 'rgba(0, 255, 188, 0.8)';
      ctx.fill();

      // Update the index for the next frame
      currentIndex += 1;

      // Request the next frame of the animation
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return <Canvas ref={ref} width="300px" height="300px" />;
};
export default DrawCanvasGuideline;
