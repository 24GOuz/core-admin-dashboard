import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/auth';
import { UsersPage } from './pages/users';
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { Outlet } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';
import { CategoryPage } from './pages/category/category';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/users',
        element: <UsersPage />
      },
      {
        path: '/categories',
        element: <CategoryPage />
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
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
