import { Box, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CircleLoader } from 'react-spinners';

export type AssistantLoadingProps = {
  //
};

export const AssistantLoading = () => {
  const { t } = useTranslation();

  return (
    <Box pl={38 + 20}>
      <Stack>
        <CircleLoader size={20} color="rgba(28, 82, 108, 1)" />
        <Text size="xs" color="gray">
          {t('conversation.robotLoading')} <TimeCounter />{' '}
          {t('conversation.robotSeconds')}
        </Text>
      </Stack>
    </Box>
  );
};

const TimeCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return count;
};
