import { IconTableShare } from '@tabler/icons-react';
import { Breadcrumbs } from '../../layouts/bread-crumbs';
import { TableList } from './components/table-list';

export const SchemaDetail = () => {
  const breadcrumbs = [
    {
      label: 'Databases',
      icon: <IconTableShare size="1rem" stroke={1.5} />,
    },
    {
      label: 'pending....',
    },
  ];
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <TableList />
    </>
  );
};
