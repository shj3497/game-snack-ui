import {RouteObject} from 'react-router-dom';
import {introLoader, participateLoader, resultWinLoader} from './loader';

const findSecondRoutes: RouteObject[] = [
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

export default findSecondRoutes;
