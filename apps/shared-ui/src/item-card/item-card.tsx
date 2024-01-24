import { Box, Card, Group, Text, Title, UnstyledButton } from '@mantine/core';

export type ItemCardProps = {
  icon?: JSX.Element | JSX.Element[];
  title: string;
  text?: string;
  description?: string;
  badges?: JSX.Element | JSX.Element[];
  onClick?: () => void;
  loading?: boolean;
};

export const ItemCard = ({
  icon,
  title,
  text,
  description,
  badges,
  onClick,
  loading,
}: ItemCardProps) => {
  return (
    <UnstyledButton
      onClick={onClick}
      style={{ width: '100%' }}
      disabled={loading}
    >
      <Card
        withBorder
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 150,
        }}
        radius="md"
      >
        <Group>
          {icon}
          <Box>
            <Title order={5}>{title}</Title>
            {text && <Text size="xs">{text}</Text>}
          </Box>
        </Group>
        <Box style={{ flex: 1 }}>
          {description && <Text>{description}</Text>}
        </Box>
        <Box>{badges}</Box>
      </Card>
    </UnstyledButton>
  );
};
