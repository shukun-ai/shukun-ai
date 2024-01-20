import { TemplateListOutput } from '@ailake/apitype';
import { Box, Group, List } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { listTemplate } from '../../../apis/template';
import { format } from 'date-fns';

export type TemplatesListProps = {
  //
};

export const TemplatesList = () => {
  const { isPending, error, data } = useQuery<TemplateListOutput>({
    queryKey: ['listTemplate'],
    queryFn: () => listTemplate({}),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Box>
      <List>
        {data.map((template) => (
          <List.Item>
            <Group>
              <Box>{template.name}</Box>
              <Box>{format(new Date(template.createdAt), 'yyyy-MM-dd')}</Box>
            </Group>
          </List.Item>
        ))}
      </List>
    </Box>
  );
};
