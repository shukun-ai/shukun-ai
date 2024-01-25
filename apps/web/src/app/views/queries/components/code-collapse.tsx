import { Box, Collapse, Group, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Prism } from '@mantine/prism';
import { IconArrowRight } from '@tabler/icons-react';
import { Language } from 'prism-react-renderer';

export type CodeCollapseProps = {
  title: string;
  codeType: Language;
  code: string;
  initialOpen?: boolean;
};

export const CodeCollapse = ({
  title,
  codeType,
  code,
  initialOpen = false,
}: CodeCollapseProps) => {
  const [opened, { toggle }] = useDisclosure(initialOpen);

  return (
    <Box>
      <UnstyledButton onClick={toggle} style={{ width: '100%' }}>
        <Group>
          <IconArrowRight size="1rem" />
          <Text>{title}</Text>
        </Group>
      </UnstyledButton>

      <Collapse in={opened}>
        <Prism language={codeType}>{code}</Prism>
      </Collapse>
    </Box>
  );
};
