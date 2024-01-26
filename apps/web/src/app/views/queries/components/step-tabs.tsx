import { QueryStep, append, move, remove, update } from '@ailake/apitype';
import { ArrayInputs } from '@ailake/shared-ui';
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDetailContext } from './detail-context';
import { IconCheck, IconX } from '@tabler/icons-react';

export type StepTabsProps = {
  value: QueryStep[];
  onChange: (steps: QueryStep[]) => void;
};

export const StepTabs = ({ value, onChange }: StepTabsProps) => {
  const {
    activeStepIndex,
    setActiveStepIndex,
    globalSchemaId,
    globalLoading,
    generatedStepIndex,
    setGeneratedStepIndex,
    removeOneResult,
  } = useDetailContext();

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
                typeof activeStepIndex === 'number' && activeStepIndex === index
                  ? theme.colors.blue[0]
                  : 'transparent',
            }}
            disabled={globalLoading}
          >
            <Flex align="center">
              <Box mr={12}>
                {typeof generatedStepIndex === 'number' &&
                index <= generatedStepIndex ? (
                  <Tooltip
                    label="The step is generated, you can check your data results."
                    withinPortal
                    withArrow
                  >
                    <Avatar color="blue">
                      <IconCheck size="1rem" />
                    </Avatar>
                  </Tooltip>
                ) : (
                  <Tooltip
                    label="The step is not generated, please edit your task for prompt and execute the data results."
                    withinPortal
                    withArrow
                  >
                    <Avatar color="red">
                      <IconX size="1rem" />
                    </Avatar>
                  </Tooltip>
                )}
              </Box>
              <Box style={{ flex: 1 }}>
                <Title order={5}>Step {index + 1}</Title>
                <Text lineClamp={1}>{itemValue.promptTask}</Text>
              </Box>
              {(typeof generatedStepIndex !== 'number' ||
                index >= generatedStepIndex) && (
                <ActionIcon
                  variant="transparent"
                  onClick={() => {
                    const previous = index === 0 ? undefined : index - 1;
                    setActiveStepIndex(previous);
                    setGeneratedStepIndex(
                      getNewGenerateStepIndex(generatedStepIndex, index)
                    );
                    removeOneResult(index);
                    itemRemove();
                  }}
                  disabled={globalLoading}
                >
                  <IconX size="1rem" />
                </ActionIcon>
              )}
            </Flex>
          </UnstyledButton>
        )}
      />
    </Box>
  );
};

const getNewGenerateStepIndex = (
  generatedStepIndex: number | undefined,
  index: number
) => {
  if (typeof generatedStepIndex !== 'number') {
    return undefined;
  }
  return index <= generatedStepIndex ? index - 1 : generatedStepIndex;
};
