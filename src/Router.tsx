import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/auth';
import { UsersPage } from './pages/users';
import { MainLayout } from './layouts/main-layout/main-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    children: [
      {
        element: <MainLayout children={[]} />,
        children: [
          {
            path: '/dashboard',
            element: <></>
          },
          {
            path: '/users',
            element: <UsersPage />
          },
          {
            path: '/categories',
            element: <></>
          },
          {
            path: '/organizations',
            element: <></>
          },
          {
            path: '/clients',
            element: <></>
          },
          {
            path: '/couriers',
            element: <></>
          },
        ]
      }]
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
