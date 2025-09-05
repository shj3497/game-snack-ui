import {RouteObject} from 'react-router-dom';
import {introLoader, participateLoader} from './loader';
import {resultWinLoader} from './loader';

const rouletteRoutes: RouteObject[] = [
  {
    index: true,
    loader: introLoader,
    lazy: async () => {
      const {default: IntroPage} = await import('./IntroPage');
      return {Component: IntroPage};
    },
  },
  {
    path: 'participate',
    loader: participateLoader,
    lazy: async () => {
      const {default: ParticipatePage} = await import('./ParticipatePage');
      return {Component: ParticipatePage};
    },
  },
  {
    path: 'result-win',
    loader: resultWinLoader,
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

export default rouletteRoutes;
