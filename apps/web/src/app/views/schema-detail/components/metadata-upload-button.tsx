import { Box, Button, FileInput, Group, Modal, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  SchemaColumn,
  SchemaRetrieveOutput,
  SchemaTable,
  SchemaUpdateInput,
} from '@shukun-ai/apitype';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import {
  ApplicationSchema,
  MetadataElectron,
  MetadataSchema,
} from '@shukun/schema';
import { useMutation } from '@tanstack/react-query';
import { updateSchema } from '../../../../apis/schema';
import { queryClient } from '../../../query-client';

export type MetadataUploadButtonProps = {
  schema: SchemaRetrieveOutput;
};

export const MetadataUploadButton = ({ schema }: MetadataUploadButtonProps) => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  const { mutateAsync } = useMutation({
    mutationFn: (props: SchemaUpdateInput) => {
      return updateSchema(props);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['retrieveSchema'],
      });
    },
  });

  const onSubmit = useCallback(
    async (formValues: UploadFormValuesProps) => {
      const newSchema = {
        ...schema,
        tables: schema.tables.map((table) => {
          const newTable = formValues.tables.find(
            (newTable) => newTable.tableName === table.tableName
          );
          if (newTable) {
            return newTable;
          } else {
            return table;
          }
        }),
      };

      mutateAsync(newSchema);
      close();
      return;
    },
    [close, mutateAsync, schema]
  );

  return (
    <>
      <Button variant="subtle" onClick={open}>
        {t('schema.uploadMetadata')}
      </Button>
      <Modal opened={opened} onClose={close} title={t('schema.editTitle')}>
        <UploadForm onSubmit={onSubmit} />
      </Modal>
    </>
  );
};

type UploadFormValuesProps = {
  prefix: string;
  tables: SchemaTable[];
};

type UploadFormProps = {
  onSubmit: (formValues: UploadFormValuesProps) => Promise<void>;
};

const UploadForm = ({ onSubmit }: UploadFormProps) => {
  const { t } = useTranslation();

  const [pending, setPending] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const form = useForm<UploadFormValuesProps>({
    initialValues: {
      prefix: '',
      tables: [],
    },
    validate: zodResolver(
      z.object({
        prefix: z.string().min(1),
        tables: z.array(z.unknown()).min(1),
      })
    ),
  });

  const onUpload = useCallback(
    async (file: File) => {
      const text = await file.text();
      const json: ApplicationSchema = JSON.parse(text);
      const newTables = convertMetadatasToSchema(
        json.metadata ?? [],
        form.values.prefix
      );
      form.setFieldValue('tables', newTables);
    },
    [form]
  );

  return (
    <Box>
      <form
        onSubmit={form.onSubmit(async (values) => {
          setPending(true);
          try {
            await onSubmit(values);
          } finally {
            setPending(false);
          }
        })}
      >
        <TextInput
          label={t('schema.prefix')}
          withAsterisk
          mb="md"
          placeholder="Example: prefix__"
          {...form.getInputProps('prefix')}
        />
        <FileInput
          label={t('schema.uploadMetadata')}
          withAsterisk
          value={file}
          onChange={async (file) => {
            if (file) {
              await onUpload(file);
            }
            setFile(file);
          }}
        />

        <Group position="right" mt="md">
          <Button type="submit" loading={pending}>
            {t('schema.submit')}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

const convertMetadatasToSchema = (
  metadatas: MetadataSchema[],
  prefix: string
): SchemaTable[] => {
  return metadatas.map((metadata) => {
    const internalColumns: SchemaColumn[] = [
      {
        columnName: 'id',
        columnAlias: [`${metadata.label} ID`],
        columnType: 'character varying',
        notNullable: true,
        isUnique: true,
        isIndexed: true,
        isPrimary: true,
      },
      {
        columnName: 'owner',
        columnAlias: [`创建人ID`],
        columnType: 'character varying',
      },
      {
        columnName: 'updatedAt',
        columnAlias: [`最后更新时间`],
        columnType: 'timestamp with time zone',
      },
      {
        columnName: 'createdAt',
        columnAlias: [`创建时间`],
        columnType: 'timestamp with time zone',
      },
    ];

    const columns = metadata.electrons.map((electron) => {
      return {
        columnName: electron.name,
        columnAlias: [electron.label],
        columnType: convertColumnType(electron.fieldType),
        reference: convertForeign(electron, metadatas),
        enums: convertEnums(electron),
        notNullable: electron.isRequired,
        isUnique: electron.isUnique,
        isIndexed: electron.isIndexed,
        comment: electron.description,
      } satisfies SchemaColumn;
    });

    return {
      tableName: `${prefix}${metadata.name}`,
      tableAlias: [metadata.label],
      columns: [...internalColumns, ...columns],
    } satisfies SchemaTable;
  });
};

const convertEnums = (
  electron: MetadataElectron
): SchemaColumn['enums'] | undefined => {
  if (
    electron.fieldType === 'SingleSelect' ||
    electron.fieldType === 'MultiSelect'
  ) {
    return electron.options.map((option) => {
      return {
        key: option.key,
        label: option.label,
      };
    });
  } else {
    return undefined;
  }
};

const convertForeign = (
  electron: MetadataElectron,
  metadatas: MetadataSchema[]
): SchemaColumn['reference'] | undefined => {
  if (
    electron.fieldType === 'ManyToOne' ||
    electron.fieldType === 'ManyToMany'
  ) {
    return {
      tableName: electron.referenceTo,
      columnName: electron.foreignName,
      displayColumnName: getDisplayColumnName(electron.referenceTo, metadatas),
    } satisfies SchemaColumn['reference'];
  } else {
    return undefined;
  }
};

const convertColumnType = (
  electronType: MetadataElectron['fieldType']
): SchemaColumn['columnType'] => {
  switch (electronType) {
    case 'Attachment':
    case 'Mixed':
      return 'josnb';
    case 'Boolean':
      return 'boolean';
    case 'Currency':
    case 'Float':
      return 'numeric';
    case 'DateTime':
      return 'timestamp with time zone';
    case 'Integer':
      return 'bigint';
    case 'ManyToMany':
    case 'MultiSelect':
    case 'Role':
      return 'josnb';
    case 'SingleSelect':
    case 'LargeText':
    case 'ManyToOne':
    case 'NameText':
    case 'Owner':
    case 'Password':
    case 'Text':
      return 'character varying';
  }
};

const getDisplayColumnName = (
  referenceTo: string,
  metadatas: MetadataSchema[]
) => {
  let displayColumnName = referenceTo;

  const metadata = metadatas.find((metadata) => metadata.name === referenceTo);

  if (metadata) {
    const foreign = metadata.electrons.find(
      (electron) => electron.name === electron.foreignName
    );

    if (foreign) {
      displayColumnName = foreign.label;
    }
  }

  return displayColumnName;
};
