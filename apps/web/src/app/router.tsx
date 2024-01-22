import { useRoutes } from 'react-router-dom';
import { DefaultLayout } from './layouts/default-layout';
import { Conversation } from './conversation/conversation';
import { Reports } from './views/reports/page';
import { LoginPage } from './views/auth/login-page';
import { TemplatesList } from './views/templates-list/templates-list';
import { TemplatesDetail } from './views/templates-detail/templates-detail';
import { Thread } from './views/threads/threads';
import { SchemaList } from './views/schema-list/schema-list';
import { SchemaDetail } from './views/schema-detail/schema-detail';

export const AppRouter = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Conversation /> },
        { path: 'reports', element: <Reports /> },
        { path: 'templates', element: <TemplatesList /> },
        { path: 'templates/:templateId', element: <TemplatesDetail /> },
        { path: 'threads', element: <Thread /> },
        {
          path: 'schemas',
          element: <SchemaList />,
        },
        {
          path: 'schemas/:schemaId',
          element: <SchemaDetail />,
        },
      ],
    },
    { path: 'login', element: <LoginPage /> },
  ]);

  return element;
};
