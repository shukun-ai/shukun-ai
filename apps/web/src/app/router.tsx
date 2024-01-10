import { useRoutes } from 'react-router-dom';
import { DefaultLayout } from './layouts/default-layout';
import { Conversation } from './conversation/conversation';
import { Reports } from './views/reports/page';
import { Databases } from './views/databases/page';
import { LoginPage } from './views/auth/login-page';

export const AppRouter = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Conversation /> },
        { path: 'reports', element: <Reports /> },
        { path: 'Databases', element: <Databases /> },
      ],
    },
    { path: 'login', element: <LoginPage /> },
  ]);

  return element;
}
