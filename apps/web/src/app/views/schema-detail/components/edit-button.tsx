import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SchemaRetrieveOutput } from '@shukun-ai/apitype';
import { useTranslation } from 'react-i18next';
import {
  BasicForm,
  BasicFormValuesProps,
} from '../../schema-list/components/basic-form';
import { useMutation } from '@tanstack/react-query';
import { updateSchema } from '../../../../apis/schema';
import { queryClient } from '../../../query-client';

export type EditButtonProps = {
  schema: SchemaRetrieveOutput;
};

export const EditButton = ({ schema }: EditButtonProps) => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync } = useMutation({
    mutationFn: (props: BasicFormValuesProps) => {
      if (!props.schemaId) {
        throw new Error('schemaId is required');
      }
      return updateSchema({ ...props, schemaId: props.schemaId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['retrieveSchema'],
      });
    },
  });

  const handleSubmit = async (values: BasicFormValuesProps) => {
    mutateAsync(values);
    close();
  };

  return (
    <>
      <Button variant="subtle" onClick={open}>
        {t('schema.editDbUrl')}
      </Button>
      <Modal opened={opened} onClose={close} title={t('schema.editTitle')}>
        <BasicForm
          initialValues={{
            schemaId: schema.schemaId,
            name: schema.name,
            ...schema.connection,
          }}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
};
