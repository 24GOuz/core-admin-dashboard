import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/auth';
import { UsersPage } from './pages/users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/users',
    element: <UsersPage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
