import { QueryStep, Result } from '@shukun-ai/apitype';
import { Box, Button, Group, Menu, Textarea } from '@mantine/core';
import { CodeCollapse } from './code-collapse';
import { useDetailContext } from './detail-context';
import { IconCaretDownFilled, IconInputAi, IconSql } from '@tabler/icons-react';
import { useMemo } from 'react';
import { DataVisualization } from '@shukun-ai/shared-ui';
import { useTranslation } from 'react-i18next';
import { SelectTables } from './select-tables';

export type StepContentsProps = {
  value: QueryStep;
  onChange: (steps: QueryStep) => void;
  stepIndex: number;
};

export const StepContents = ({
  value,
  onChange,
  stepIndex,
}: StepContentsProps) => {
  const { t } = useTranslation();

  const {
    runTextToResult,
    runTextToSql,
    runSqlToResult,
    results,
    globalLoading,
    generatedStepIndex,
    setGeneratedStepIndex,
  } = useDetailContext();

  const result = useMemo<Result | undefined>(() => {
    return results[stepIndex];
  }, [results, stepIndex]);

  const isGenerated = useMemo<boolean>(() => {
    return (
      typeof generatedStepIndex === 'number' && stepIndex <= generatedStepIndex
    );
  }, [generatedStepIndex, stepIndex]);

  return (
    <Box>
      <Box mb={8}>
        <SelectTables
          schemaId={value.schemaId}
          value={value.tableNames}
          onChange={(tableNames) => {
            onChange({
              ...value,
              tableNames,
            });
          }}
        />
      </Box>
      <Box>
        <Textarea
          label={t('query.tasks')}
          value={value.promptTask}
          onChange={(event) =>
            onChange({
              ...value,
              promptTask: event.target.value,
            })
          }
          withAsterisk
          autosize
          minRows={3}
          mb={20}
          disabled={globalLoading || isGenerated}
        />
      </Box>
      <Group>
        {isGenerated ? (
          <Button
            variant="light"
            onClick={() => {
              const previous = stepIndex === 0 ? undefined : stepIndex - 1;
              setGeneratedStepIndex(previous);
            }}
          >
            {t('query.edit')}
          </Button>
        ) : (
          <Button.Group>
            <Button
              variant="filled"
              leftIcon={<IconInputAi size="1rem" />}
              onClick={() => runTextToResult({ stepIndex })}
              loading={globalLoading}
            >
              {t('query.execute')}
            </Button>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="filled" pl={6} pr={6} loading={globalLoading}>
                  <IconCaretDownFilled size="1rem" />
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => runTextToSql({ stepIndex })}
                  icon={<IconInputAi size="1rem" />}
                  disabled={globalLoading}
                >
                  {t('query.executeAi')}
                </Menu.Item>
                <Menu.Item
                  icon={<IconSql size="1rem" />}
                  disabled={!value.generatedQuery || globalLoading}
                  onClick={() => runSqlToResult({ stepIndex })}
                >
                  {t('query.executeSql')}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Button.Group>
        )}
      </Group>
      {result && (
        <Box mb={20}>
          <DataVisualization
            dataResult={{
              data: {
                type: 'Collection',
                command: 'select',
                ...result,
              },
            }}
          />
        </Box>
      )}
      {value.generatedQuery && (
        <Box>
          <CodeCollapse
            title={t('query.beforeQuerySchema')}
            code={value.generatedQuery.schemaDdl}
            codeType="sql"
          />
          <CodeCollapse
            title={t('query.generatedQuerySql')}
            code={value.generatedQuery.querySql}
            codeType="sql"
          />
        </Box>
      )}
      {value.queriedFields && (
        <Box>
          <CodeCollapse
            title={t('query.generatedQuerySchema')}
            code={JSON.stringify(value.queriedFields.fields, null, 2)}
            codeType="json"
          />
        </Box>
      )}
    </Box>
  );
};
