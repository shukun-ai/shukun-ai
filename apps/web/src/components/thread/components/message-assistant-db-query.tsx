import { ThreadMessage, ThreadMessageAssistantDbQuery } from '@ailake/apitype';
import { DataVisualization } from '@ailake/shared-ui';

export type MessageAssistantDbQueryProps = {
  message: ThreadMessage;
  metadata: ThreadMessageAssistantDbQuery;
};

export const MessageAssistantDbQuery = ({
  metadata,
}: MessageAssistantDbQueryProps) => {
  return (
    <DataVisualization
      dataResult={{
        data: metadata.data,
      }}
    />
  );
};
