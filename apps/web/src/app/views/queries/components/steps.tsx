import { QueryStep, append, move, remove, update } from '@ailake/apitype';
import { ArrayInputs } from '@ailake/shared-ui';
import { Box, Button, Group, Textarea } from '@mantine/core';
import { SelectSchema } from './select-schema';

export type StepsProps = {
  value: QueryStep[];
  onChange: (steps: QueryStep[]) => void;
};

export const Steps = ({ value, onChange }: StepsProps) => {
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
            <Group>
              <Button>执行</Button>
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