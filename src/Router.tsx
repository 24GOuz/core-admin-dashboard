import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/auth';
import { UsersPage } from './pages/users';
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { Outlet } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';
import { CategoryPage } from './pages/category/category';
import { useGetMeQuery } from './features/auth/queries/auth-queries';
import CustomLoader from './shared/ui/loader';
import { BusinessTypePage } from './pages/business-type/business-type';
import { LanguagesPage } from './pages/languages';
import { ROUTES } from './shared/constants/routes';
import { CountryPage } from './pages/country';
import { RegionPage } from './pages/region';

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
        path: ROUTES.dashboard,
        element: <DashboardPage />
      },
      {
        path: ROUTES.users,
        element: <UsersPage />
      },
      {
        path: ROUTES.businessTypes,
        element: <BusinessTypePage />
      },
      {
        path: ROUTES.languages,
        element: <LanguagesPage />
      },
      {
        path: ROUTES.categories,
        element: <CategoryPage />
      },
      {
        path: ROUTES.countries,
        element: <CountryPage />
      },
      {
        path: ROUTES.regions,
        element: <RegionPage />
      },
      {
        path: ROUTES.organizations,
        element: <></>
      },
      {
        path: ROUTES.clients,
        element: <></>
      },
      {
        path: ROUTES.couriers,
        element: <></>
      },
    ]
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
