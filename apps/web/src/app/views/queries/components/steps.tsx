import { QueryStep, append, move, remove, update } from '@ailake/apitype';
import { ArrayInputs } from '@ailake/shared-ui';
import { Box, Button, Group, Textarea } from '@mantine/core';
import { SelectSchema } from './select-schema';
import { useDetailContext } from './detail-context';
import { CodeCollapse } from './code-collapse';

export type StepsProps = {
  value: QueryStep[];
  onChange: (steps: QueryStep[]) => void;
};

export const Steps = ({ value, onChange }: StepsProps) => {
  const { generateStep, runSqlToResult } = useDetailContext();

  return (
    <Box>
      <ArrayInputs<QueryStep>
        value={value}
        onUpdate={(index, newValue) => onChange(update(value, index, newValue))}
        onCreate={() =>
          onChange(
            append(value, {
              promptTask: '',
            })
          )
        }
        onMove={(sourceIndex, targetIndex) =>
          onChange(move(value, sourceIndex, targetIndex))
        }
        onRemove={(index) => onChange(remove(value, index))}
        renderItem={(itemValue, itemChange, itemRemove, { index }) => (
          <Box key={index}>
            <SelectSchema
              value={itemValue.schemaId}
              onChange={(schemaId) => {
                console.log('schemaId', schemaId);
                itemChange({
                  ...itemValue,
                  schemaId,
                });
              }}
            />
            <Textarea
              label="Tasks"
              value={itemValue.promptTask}
              onChange={(event) =>
                itemChange({
                  ...itemValue,
                  promptTask: event.target.value,
                })
              }
              withAsterisk
              autosize
              minRows={3}
              mb={20}
            />
            {itemValue.generatedQuery && (
              <Box>
                <CodeCollapse
                  title="Before Query Schema"
                  code={itemValue.generatedQuery.schemaDdl}
                  codeType="sql"
                />
                <CodeCollapse
                  title="Generated Query SQL"
                  code={itemValue.generatedQuery.querySql}
                  codeType="sql"
                  initialOpen
                />
              </Box>
            )}
            {itemValue.queriedFields && (
              <Box>
                <CodeCollapse
                  title="Generated Query Schema"
                  code={JSON.stringify(itemValue.queriedFields.fields, null, 2)}
                  codeType="json"
                  initialOpen
                />
              </Box>
            )}
            <Group>
              <Button onClick={() => generateStep({ stepIndex: index })}>
                Text to SQL
              </Button>
              <Button onClick={() => runSqlToResult({ stepIndex: index })}>
                SQL to Query DB
              </Button>
              <Button variant="subtle" onClick={() => itemRemove()}>
                Delete
              </Button>
            </Group>
          </Box>
        )}
      />
    </Box>
  );
};
