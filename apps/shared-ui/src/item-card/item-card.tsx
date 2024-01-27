import { Box, Card, Group, Text, Title, UnstyledButton } from '@mantine/core';

export type ItemCardProps = {
  icon?: JSX.Element | JSX.Element[];
  title: string;
  text?: string;
  description?: string;
  badges?: JSX.Element | JSX.Element[];
  onClick?: () => void;
  loading?: boolean;
  menu?: JSX.Element | JSX.Element[];
};

export const ItemCard = ({
  icon,
  title,
  text,
  description,
  badges,
  onClick,
  loading,
  menu,
}: ItemCardProps) => {
  return (
    <Card
      withBorder
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 150,
        justifyContent: 'space-between',
      }}
      radius="md"
    >
      <UnstyledButton
        onClick={onClick}
        style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        disabled={loading}
      >
        <Group>
          {icon}
          <Box>
            <Title order={5}>{title}</Title>
            {text && <Text size="xs">{text}</Text>}
          </Box>
        </Group>
        <Box>{description && <Text lineClamp={2}>{description}</Text>}</Box>
      </UnstyledButton>
      <Box>{badges}</Box>
      {menu && <Box>{menu}</Box>}
    </Card>
  );
};
