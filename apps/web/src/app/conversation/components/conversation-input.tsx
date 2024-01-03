import { Box, Button, Paper, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCallback, useEffect } from 'react';
import { useConversationContext } from './conversation-context';

export type ConversationInputProps = {
  //
};

export const ConversationInput = () => {
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
            placeholder="问我关于你想查的数据，如前十条任务的机场代码分布是什么？"
          />
          <Button
            type="submit"
            size="sm"
            variant="white"
            loading={robotIsWorking}
          >
            探索
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  paper: {
    flex: 1,
    background: '#fff',
    padding: '5px 10px',
    borderRadius: 0,
    boxShadow: '0px 2px 2px rgba(0,0,0,0.1)',
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
