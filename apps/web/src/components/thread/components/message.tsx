import { ThreadMessage } from '@ailake/apitype';
import { DialogCard } from './dialog-card';
import { Paper } from '@mantine/core';
import { MessageUserTemplate } from './message-user-template';
import { MessageAssistantText } from './message-assistant-text';
import { MessageUserInput } from './message-user-input';
import { MessageAssistantDbQuery } from './message-assistant-db-query';

export type MessageProps = {
  message: ThreadMessage;
};

export const Message = ({ message }: MessageProps) => {
  return (
    <DialogCard avatarRole={message.role}>
      <Paper>
        {message.metadata.type === 'userTemplate' && (
          <MessageUserTemplate message={message} metadata={message.metadata} />
        )}
        {message.metadata.type === 'assistantText' && (
          <MessageAssistantText message={message} metadata={message.metadata} />
        )}
        {message.metadata.type === 'userInput' && (
          <MessageUserInput message={message} metadata={message.metadata} />
        )}
        {message.metadata.type === 'assistantDbQuery' && (
          <MessageAssistantDbQuery
            message={message}
            metadata={message.metadata}
          />
        )}
      </Paper>
    </DialogCard>
  );
};
