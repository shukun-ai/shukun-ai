import { notifications } from '@mantine/notifications';

export const registerExceptionListeners = () => {
  window.addEventListener('error', (event) => {
    return false;
  });

  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      event.promise.catch((error) => {
        handleHttpException(error);
      });
    }
  );
};

const handleHttpException = (error: unknown) => {
  const { name, message } = getError(error);
  notifications.show({
    color: 'red',
    title: name,
    message,
  });
  console.error(error);
};

const getError = (error: unknown): { name: string; message: string } => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  } else {
    return {
      name: 'Unknown',
      message: 'Unknown error',
    };
  }
};
