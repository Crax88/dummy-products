import { createBrowserRouter, redirect } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes';
import App from './App';
import { Providers } from './providers';

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
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
