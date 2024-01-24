import { Box, Button, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Prism } from '@mantine/prism';
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
      <Button fullWidth onClick={toggle} variant="light">
        {title}
      </Button>

      <Collapse in={opened}>
        <Prism language={codeType}>{code}</Prism>
      </Collapse>
    </Box>
  );
};
