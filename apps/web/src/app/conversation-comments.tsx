import { Avatar, Box, Card, Text } from '@mantine/core';
import { useConversationContext } from './conversation-context';
import { Comment } from '@ailake/apitype';
import { useMemo } from 'react';
import { DataVisualization } from './data-visualization';

export type ConversationCommentProps = {
  conversationId: string;
};

export const ConversationComments = ({
  conversationId,
}: ConversationCommentProps) => {
  const { state } = useConversationContext();
  const { comments } = state;

  return (
    <Box>
      {comments
        .filter((comment) => comment.conversationId === conversationId)
        .map((comment, index) => (
          <ConversationComment key={comment.id} comment={comment} />
        ))}
    </Box>
  );
};

export const ConversationComment = ({ comment }: { comment: Comment }) => {
  return (
    <Box style={{ display: 'flex', overflow: 'hidden', padding: 20 }}>
      <Box style={{ width: 50 }}>
        {!comment.sentByRobot && <Avatar color="red" radius="md" />}
        {comment.sentByRobot && (
          <Avatar color="blue" radius="md">
            智
          </Avatar>
        )}
      </Box>
      <Card withBorder style={{ flex: 1 }}>
        {comment.commentText && <Text>{comment.commentText}</Text>}
        {comment.commentSQL && (
          <Text size="xs" c="dimmed">
            {comment.commentSQL}
          </Text>
        )}
        {comment.commentSQL && (
          <ConversationDataVisualization commentId={comment.id} />
        )}
        {comment.isLoading && <Box>我正在查找数据中...</Box>}
      </Card>
    </Box>
  );
};

export const ConversationDataVisualization = ({
  commentId,
}: {
  commentId: string;
}) => {
  const { state } = useConversationContext();
  const { dataResults } = state;

  const dataResult = useMemo(() => {
    return dataResults.find((dataResult) => dataResult.commentId === commentId);
  }, [commentId, dataResults]);

  if (!dataResult) {
    return <Box>data loading...</Box>;
  }

  return <DataVisualization dataResult={dataResult} />;
};
