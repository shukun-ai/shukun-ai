import { Card, Text, Button, Grid, Flex, Modal } from '@mantine/core';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconTrash, IconListDetails } from '@tabler/icons-react';
import { SchemaListOutput, SchemaRemoveInput } from '@shukun-ai/apitype';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { removeSchema } from '../../../../apis/schema';
import { queryClient } from '../../../query-client';
import { CreateForm } from './create-form';
import { DbIcons } from '@shukun-ai/shared-ui';

type CardItemProps = {
  data: SchemaListOutput[number];
};

export const CardItem = ({ data }: CardItemProps) => {
  const navigateTo = useNavigate();
  const [opened, { close }] = useDisclosure(false);

  const onGotoDetail = useCallback(() => {
    navigateTo(`/schemas/${data.schemaId}`);
  }, [data.schemaId, navigateTo]);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (props: SchemaRemoveInput) => {
      return removeSchema(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['listSchema'],
      });
    },
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={240} h={110}>
      <Flex
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <DbIcons dbType={data.dbType} />
        <Text weight={500} w={140} truncate="end">
          {data.name}
        </Text>
      </Flex>
      <Card.Section mt={15}>
        <Grid gutter={0}>
          <Grid.Col span={6}>
            <Button
              fullWidth
              variant="default"
              style={{ borderRight: 0, borderLeft: 0 }}
              onClick={onGotoDetail}
            >
              <IconListDetails stroke={1.5} size={16} />
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              fullWidth
              variant="default"
              style={{ borderRight: 0 }}
              loading={isPending}
              onClick={() => {
                mutateAsync({ schemaId: data.schemaId });
              }}
            >
              <IconTrash stroke={1.5} size={16} />
            </Button>
          </Grid.Col>
        </Grid>
        <Modal opened={opened} onClose={close} title="Create new database">
          <CreateForm onSubmitSuccess={close} />
        </Modal>
      </Card.Section>
    </Card>
  );
};
