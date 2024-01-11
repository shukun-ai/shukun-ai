import { useCallback } from 'react';
import { useConversationContext } from './conversation-context';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <Box style={{ maxWidth: 1440, padding: 20, paddingLeft: 20 + 38 + 20 }}>
      <Paper shadow="md">
        <Title order={5} p={20} pb={8}>
          {t('conversation.tipTitle')}
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
    question: '最近一个月被任务绑定次数最多的车辆？',
  },
  {
    question:
      '有前站起飞时间但没有预到时间的任务按航司进行分组，航司是航班号的前两位',
  },
  {
    question:
      '列出最新十条任务按航班日期由近到远排序，必须有前站起飞时间但没有预到时间，且任务状态为已同步',
  },
  {
    question: '2023年10月的所有任务按航司进行分组，航司是航班号的前两位',
  },
];
