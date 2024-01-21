import { TemplateListOutput } from '@ailake/apitype';
import {
  Avatar,
  Badge,
  Box,
  Card,
  Grid,
  Group,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { listTemplate } from '../../../apis/template';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { CreateButton } from './components/create-button';

export type TemplatesListProps = {
  //
};

export const TemplatesList = () => {
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery<TemplateListOutput>({
    queryKey: ['listTemplate'],
    queryFn: () => listTemplate({}),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Box>
      <Title order={3} mb={20}>
        助理设置
      </Title>
      <Grid>
        <CreateButton />
        {data.map((template) => (
          <Grid.Col span={3}>
            <UnstyledButton
              onClick={() => {
                navigate(`/templates/${template.templateId}`);
              }}
              style={{ width: '100%' }}
            >
              <Card
                withBorder
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: 150,
                }}
                radius="md"
              >
                <Group>
                  <Avatar color="#0D74CE">TE</Avatar>
                  <Box>
                    <Title order={5}>{template.name}</Title>
                    <Text size="xs">
                      {format(new Date(template.createdAt), 'yyyy-MM-dd')}
                    </Text>
                  </Box>
                </Group>
                <Box style={{ flex: 1 }}></Box>
                <Box>
                  <Badge radius="sm" variant="outline" color="gray">
                    助理模式
                  </Badge>
                </Box>
              </Card>
            </UnstyledButton>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};
