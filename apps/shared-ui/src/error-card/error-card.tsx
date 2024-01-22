import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export type ErrorCardProps = {
  title: string;
  description?: string;
};

export const ErrorCard = ({ title, description }: ErrorCardProps) => {
  return (
    <Alert icon={<IconAlertCircle size="1rem" />} color="red" title={title}>
      {description}
    </Alert>
  );
};
