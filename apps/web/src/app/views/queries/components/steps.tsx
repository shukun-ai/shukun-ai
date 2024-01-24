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
  const { generateStep } = useDetailContext();

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
                <CodeCollapse
                  title="Generated Query Schema"
                  code={itemValue.generatedQuery.resultDdl}
                  codeType="sql"
                  initialOpen
                />
              </Box>
            )}
            <Group>
              <Button onClick={() => generateStep({ stepIndex: index })}>
                执行
              </Button>
              <Button variant="subtle" onClick={() => itemRemove()}>
                删除
              </Button>
            </Group>
          </Box>
        )}
      />
    </Box>
  );
};
