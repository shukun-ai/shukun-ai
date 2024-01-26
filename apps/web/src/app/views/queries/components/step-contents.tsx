import { QueryStep, Result } from '@ailake/apitype';
import { Box, Button, Group, Menu, Textarea } from '@mantine/core';
import { CodeCollapse } from './code-collapse';
import { useDetailContext } from './detail-context';
import { IconCaretDownFilled, IconInputAi, IconSql } from '@tabler/icons-react';
import { useMemo } from 'react';
import { DataVisualization } from '@ailake/shared-ui';

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
  const {
    runTextToResult,
    runTextToSql,
    runSqlToResult,
    results,
    globalLoading,
  } = useDetailContext();

  const result = useMemo<Result | undefined>(() => {
    return results[stepIndex];
  }, [results, stepIndex]);

  return (
    <Box>
      <Textarea
        label="Tasks"
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
        disabled={globalLoading}
      />
      <Group>
        <Button.Group>
          <Button
            variant="filled"
            leftIcon={<IconInputAi size="1rem" />}
            onClick={() => runTextToResult({ stepIndex })}
            loading={globalLoading}
          >
            Execute
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
                Execute AI Only
              </Menu.Item>
              <Menu.Item
                icon={<IconSql size="1rem" />}
                disabled={!value.generatedQuery || globalLoading}
                onClick={() => runSqlToResult({ stepIndex })}
              >
                Execute SQL Only
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Button.Group>
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
            title="Before Query Schema"
            code={value.generatedQuery.schemaDdl}
            codeType="sql"
          />
          <CodeCollapse
            title="Generated Query SQL"
            code={value.generatedQuery.querySql}
            codeType="sql"
          />
        </Box>
      )}
      {value.queriedFields && (
        <Box>
          <CodeCollapse
            title="Generated Query Schema"
            code={JSON.stringify(value.queriedFields.fields, null, 2)}
            codeType="json"
          />
        </Box>
      )}
    </Box>
  );
};
