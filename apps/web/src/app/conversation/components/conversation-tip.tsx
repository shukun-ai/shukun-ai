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
import { AskTemplate, useAskTemplates } from './use-ask-templates';

export type ConversationTipProps = {
  //
};

export const ConversationTip = () => {
  const { t } = useTranslation();
  const askTemplates = useAskTemplates();

  return (
    <Box
      style={{
        paddingLeft: 38,
        marginBottom: 20,
      }}
    >
      <Paper>
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
