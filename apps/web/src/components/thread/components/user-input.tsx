import { Box, Button, Paper, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useThreadContext } from '../thread-context';

export type UserInputProps = {
  //
};

export const UserInput = () => {
  const { t } = useTranslation();
  const { waitingUserInput, createMessage } = useThreadContext();

  const form = useForm({
    initialValues: {
      ask: '',
    },
  });

  const onSubmit = useCallback(
    (values: { ask: string }) => {
      createMessage({ text: values.ask });
      form.setFieldValue('ask', '');
    },
    [createMessage, form]
  );

  const { classes } = useStyles();

  return (
    <Box pl={38 + 20} style={{ maxWidth: 800 }}>
      <Paper className={classes.paper}>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Box style={{ display: 'flex' }}>
            <input
              type="text"
              {...form.getInputProps('ask')}
              className={classes.input}
              disabled={waitingUserInput}
              placeholder={t('conversation.placeholder')}
            />
            <Button
              type="submit"
              size="sm"
              variant="white"
              loading={waitingUserInput}
            >
              {t('conversation.explore')}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  paper: {
    flex: 1,
    padding: '5px 10px',
    borderRadius: 6,
    border: 'solid 1px #bbb',
  },
  input: {
    width: '100%',
    marginRight: 20,
    border: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
}));
