import { Box, Button, Paper, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useConversationContext } from './conversation-context';

export type ConversationInputProps = {
  //
};

export const ConversationInput = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useConversationContext();
  const { inputAskMessage, robotIsWorking } = state;

  const form = useForm({
    initialValues: {
      ask: '',
    },
  });

  const onSubmit = useCallback(() => {
    dispatch.createConversation(form.values);
  }, [dispatch, form]);

  useEffect(() => {
    form.setFieldValue('ask', inputAskMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputAskMessage]);

  const { classes } = useStyles();

  return (
    <Paper className={classes.paper}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Box style={{ display: 'flex' }}>
          <input
            type="text"
            {...form.getInputProps('ask')}
            className={classes.input}
            disabled={robotIsWorking}
            placeholder={t('conversation.placeholder')}
          />
          <Button
            type="submit"
            size="sm"
            variant="white"
            loading={robotIsWorking}
          >
            {t('conversation.explore')}
          </Button>
        </Box>
      </form>
    </Paper>
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
