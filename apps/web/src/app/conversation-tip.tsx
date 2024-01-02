import { useCallback } from 'react';
import { useConversationContext } from './conversation-context';
import {
  Box,
  Card,
  Paper,
  Text,
  Title,
  UnstyledButton,
  createStyles,
} from '@mantine/core';

export type ConversationTipProps = {
  //
};

export const ConversationTip = () => {
  return (
    <Box style={{ padding: 20, paddingLeft: 20 + 38 + 20 }}>
      <Paper shadow="md">
        <Title order={5} p={20} pb={8}>
          你可以使用如下提问模板
        </Title>
        <Card>
          {askTemplates.map((template) => (
            <TemplateButton template={template} />
          ))}
        </Card>
      </Paper>
    </Box>
  );
};

const TemplateButton = ({ template }: { template: AskTemplate }) => {
  const { classes } = useStyles();
  const { state, dispatch } = useConversationContext();
  const { robotIsWorking } = state;

  const onClick = useCallback(() => {
    dispatch.updateInputAskMessage({ ask: template.question });
    dispatch.createConversation({
      ask: template.question,
    });
  }, [dispatch, template.question]);

  return (
    <UnstyledButton
      onClick={onClick}
      className={classes.button}
      style={{ width: '100%', padding: '8px 20px' }}
      disabled={robotIsWorking}
    >
      <Text size="sm">{template.question}</Text>
    </UnstyledButton>
  );
};

const useStyles = createStyles((theme) => ({
  button: {
    '&:hover': {
      background: '#eee',
    },
  },
}));

type AskTemplate = {
  question: string;
};

const askTemplates: AskTemplate[] = [
  {
    question: '前十条任务的机场代码分布是什么？',
  },
  {
    question: '前十条任务的航司分布是什么？',
  },
  {
    question:
      '按航班时间进行由近到远排序的前十条任务，前站起飞时间存在，但是没有预到时间的任务',
  },
  {
    question: '12月的所有任务按航司进行分组，航司是航班号的前两位',
  },
];
