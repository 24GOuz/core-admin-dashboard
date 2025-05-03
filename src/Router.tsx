import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/auth';
import { UsersPage } from './pages/users';
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { Outlet } from 'react-router-dom';
import { DashboardPage } from './pages/admin/dashboard';
import { CategoryPage } from './pages/admin/category/category';
import { useGetMeQuery } from './features/auth/queries/auth-queries';
import CustomLoader from './shared/ui/loader';
import { BusinessTypePage } from './pages/admin/business-type/business-type';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useGetMeQuery()

  if (isLoading) {
    return <CustomLoader fullScreen />
  }
  if (!user) {
    return <Navigate to="/" />
  }
  return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute><MainLayout><Outlet /></MainLayout></ProtectedRoute>,
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
        path: '/business-types',
        element: <BusinessTypePage />
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
