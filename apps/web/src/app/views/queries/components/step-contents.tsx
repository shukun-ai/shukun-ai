import { QueryStep } from '@ailake/apitype';
import { Box, Button, Group, Menu, Textarea } from '@mantine/core';
import { CodeCollapse } from './code-collapse';
import { useDetailContext } from './detail-context';
import { IconCaretDownFilled, IconInputAi, IconSql } from '@tabler/icons-react';

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
  const { runTextToResult, runTextToSql, runSqlToResult } = useDetailContext();

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
      />
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
      <Group>
        {/* <Button
          onClick={async () => {
            await runTextToSql({ stepIndex });
            await runSqlToResult({ stepIndex });
          }}
        >
          Execute
        </Button>

        */}

        <Button.Group>
          <Button
            variant="filled"
            leftIcon={<IconInputAi size="1rem" />}
            onClick={() => runTextToResult({ stepIndex })}
          >
            Execute
          </Button>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="filled" pl={6} pr={6}>
                <IconCaretDownFilled size="1rem" />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => runTextToSql({ stepIndex })}
                icon={<IconInputAi size="1rem" />}
              >
                Execute AI Only
              </Menu.Item>
              <Menu.Item
                icon={<IconSql size="1rem" />}
                disabled={!value.generatedQuery}
                onClick={() => runSqlToResult({ stepIndex })}
              >
                Execute SQL Only
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Button.Group>
      </Group>
    </Box>
  );
};
