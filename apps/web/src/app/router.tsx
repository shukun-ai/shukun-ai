import { useRoutes } from 'react-router-dom';
import { DefaultLayout } from './layouts/default-layout';
import { Conversation } from './conversation/conversation';
import { Reports } from './views/reports/page';
import { Databases } from './views/databases/page';
import { LoginPage } from './views/auth/login-page';
import { TemplatesList } from './views/templates-list/templates-list';
import { TemplatesDetail } from './views/templates-detail/templates-detail';

export const AppRouter = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '', element: <Conversation /> },
        { path: 'reports', element: <Reports /> },
        { path: 'databases', element: <Databases /> },
        { path: 'templates', element: <TemplatesList /> },
        { path: 'templates/:templateId', element: <TemplatesDetail /> },
      ],
    },
    { path: 'login', element: <LoginPage /> },
  ]);

  return element;
};
