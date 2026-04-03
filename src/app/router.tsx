import { createBrowserRouter, redirect } from 'react-router-dom';
import App from './App';
import { ROUTES } from '@/shared/model/routes';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.PRODUCTS,
        lazy: () => import('@/features/products/products.page'),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.PRODUCTS),
      },
    ],
  },
]);
