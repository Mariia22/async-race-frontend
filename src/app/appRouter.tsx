import { createBrowserRouter } from 'react-router-dom';
import baseLayout from './baseLayout';
import GaragePage from '../pages/garage/ui/Page';
import WinnersPage from '../pages/winners/ui/Page';

const appRouter = () => createBrowserRouter([
  {
    element: baseLayout,
    errorElement: <div>Error</div>,
    children: [
      {
        path: '/',
        element: <GaragePage />,
      },
      {
        path: '/winners',
        element: <WinnersPage />,
      },
    ],
  },
]);

export default appRouter;
