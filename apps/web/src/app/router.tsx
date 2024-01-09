import { useRoutes } from 'react-router-dom';
import { DefaultLayout } from './layouts/default-layout';
import { Conversation } from './conversation/conversation';
import { Reports } from './views/reports/page';
import { TableSchema } from './views/table-schema/page';
import { LoginPage } from './views/auth/login-page';

export default function AppRouter() {
  const element = useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Conversation /> },
        { path: 'reports', element: <Reports /> },
        { path: 'table-schema', element: <TableSchema /> },
      ],
    },
    { path: 'login', element: <LoginPage /> },
  ]);

  return element;
}
