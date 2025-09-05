import NotFound from '@/pages/404';
import App from '@/App';
import {createBrowserRouter} from 'react-router-dom';
import inquiryRoutes from './pages/inquiry';
import eventRoutes from './pages/event';

const router = createBrowserRouter(
  [
    {path: '*', element: <NotFound />},
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          lazy: async () => {
            const {default: Home} = await import('@/pages/MainPage');
            return {Component: Home};
          },
        },
        {path: 'event', children: eventRoutes},
        {path: 'inquiry', children: inquiryRoutes},
      ],
    },
  ],
  {future: {v7_relativeSplatPath: true}},
);

export default router;
