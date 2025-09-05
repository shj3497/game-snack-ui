import {RouteObject} from 'react-router-dom';
import catchSecondRoutes from './catch-second';
import drawSecondRoutes from './draw-second';
import findSecondRoutes from './find-second';
import ladderRoutes from './ladder';
import rouletteRoutes from './roulette';
import rpsRouletteRoutes from './rps-roulette';
import {RouletteLayout} from '@/components/_organisms/events/roulette';
import {RpsRouletteLayout} from '@/components/_organisms/events/rps-roulette';
import {CatchSecondLayout} from '@/components/_organisms/events/catch-second';
import {DrawSecondLayout} from '@/components/_organisms/events/draw-second';
import {FindSecondLayout} from '@/components/_organisms/events/find-second';

const eventRoutes: RouteObject[] = [
  {
    path: 'catch-second',
    element: <CatchSecondLayout />,
    children: catchSecondRoutes,
  },
  {
    path: 'draw-second',
    element: <DrawSecondLayout />,
    children: drawSecondRoutes,
  },
  {
    path: 'find-second',
    element: <FindSecondLayout />,
    children: findSecondRoutes,
  },
  {path: 'ladder', children: ladderRoutes},
  {path: 'roulette', element: <RouletteLayout />, children: rouletteRoutes},
  {
    path: 'rps-roulette',
    element: <RpsRouletteLayout />,
    children: rpsRouletteRoutes,
  },
];

export default eventRoutes;
