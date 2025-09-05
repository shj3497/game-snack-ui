import {RouteObject} from 'react-router-dom';

const rpsRouletteRoutes: RouteObject[] = [
  {
    index: true,
    lazy: async () => {
      const {default: IntroPage} = await import('./IntroPage');
      return {Component: IntroPage};
    },
  },
  {
    path: 'participate',
    lazy: async () => {
      const {default: ParticipatePage} = await import('./ParticipatePage');
      return {Component: ParticipatePage};
    },
  },
  {
    path: 'result-win',
    lazy: async () => {
      const {default: ResultWinPage} = await import('./ResultWinPage');
      return {Component: ResultWinPage};
    },
  },
  {
    path: 'result-fail',
    lazy: async () => {
      const {default: ResultFailPage} = await import('./ResultFailPage');
      return {Component: ResultFailPage};
    },
  },
];

export default rpsRouletteRoutes;
