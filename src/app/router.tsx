import { createBrowserRouter, redirect } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes';
import App from './App';
import { Providers } from './providers';
import { ProtectedRoute } from './protect-route';

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.PRODUCTS,
            lazy: () => import('@/features/products/products.page'),
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import('@/features/auth/login.page'),
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.PRODUCTS),
      },
    ],
  },
]);
