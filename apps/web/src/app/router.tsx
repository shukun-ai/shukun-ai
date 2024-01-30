import { Navigate, useRoutes } from 'react-router-dom';
import { DefaultLayout } from './layouts/default-layout';
import { LoginPage } from './views/auth/login-page';
import { SchemaList } from './views/schema-list/schema-list';
import { SchemaDetail } from './views/schema-detail/schema-detail';
import { Queries } from './views/queries/queries';
import { QueriesList } from './views/queries/queries-list';
import { QueriesDetail } from './views/queries/queries-detail';

export const AppRouter = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="/queries" replace />,
        },
        {
          path: 'schemas',
          element: <SchemaList />,
        },
        {
          path: 'schemas/:schemaId',
          element: <SchemaDetail />,
        },
        {
          path: 'queries',
          element: <Queries />,
          children: [
            {
              path: '',
              element: <QueriesList />,
            },
            {
              path: ':queryId',
              element: <QueriesDetail />,
            },
          ],
        },
      ],
    },
    { path: 'login', element: <LoginPage /> },
  ]);

  return element;
};
