import { QueryStep, append, move, remove, update } from '@ailake/apitype';
import { ArrayInputs } from '@ailake/shared-ui';
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDetailContext } from './detail-context';
import { IconX } from '@tabler/icons-react';

export type StepTabsProps = {
  value: QueryStep[];
  onChange: (steps: QueryStep[]) => void;
};

export const StepTabs = ({ value, onChange }: StepTabsProps) => {
  const { activeStepIndex, setActiveStepIndex, globalSchemaId } =
    useDetailContext();

  const theme = useMantineTheme();

  return (
    <Box>
      <ArrayInputs<QueryStep>
        value={value}
        onUpdate={(index, newValue) => onChange(update(value, index, newValue))}
        onCreate={() =>
          onChange(
            append(value, {
              schemaId: globalSchemaId,
              promptTask: '',
            })
          )
        }
        onMove={(sourceIndex, targetIndex) =>
          onChange(move(value, sourceIndex, targetIndex))
        }
        onRemove={(index) => onChange(remove(value, index))}
        renderItem={(itemValue, itemChange, itemRemove, { index }) => (
          <UnstyledButton
            onClick={() => setActiveStepIndex(index)}
            style={{
              width: '100%',
              padding: 8,
              background:
                activeStepIndex === index
                  ? theme.colors.blue[0]
                  : 'transparent',
            }}
          >
            <Flex align="center">
              <Box style={{ flex: 1 }}>
                <Group>
                  <Avatar>{index + 1}</Avatar>
                  <Text>Step {index + 1}</Text>
                </Group>
                <Box>
                  <Text lineClamp={2}>{itemValue.promptTask}</Text>
                </Box>
              </Box>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  setActiveStepIndex(index === 0 ? undefined : index - 1);
                  itemRemove();
                }}
              >
                <IconX size="1rem" />
              </ActionIcon>
            </Flex>
          </UnstyledButton>
        )}
      />
    </Box>
  );
};
