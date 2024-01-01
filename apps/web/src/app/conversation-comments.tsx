import { Box, Divider, Group, Text } from '@mantine/core';
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
      {comments.map((comment, index) => (
        <>
          <ConversationComment key={comment.id} comment={comment} />
          {index !== comments.length - 1 && <Divider mt={20} mb={20} />}
        </>
      ))}
    </Box>
  );
};

export const ConversationComment = ({ comment }: { comment: Comment }) => {
  return (
    <Group>
      <Box style={{ width: 100 }}>
        <Text ta="right">{comment.sentByRobot ? '小智' : '我'}:</Text>
      </Box>
      <Box>
        {comment.commentText && <Box>{comment.commentText}</Box>}
        {comment.commentSQL && <Box>{comment.commentSQL}</Box>}
        {comment.commentSQL && (
          <ConversationDataVisualization commentId={comment.id} />
        )}
      </Box>
    </Group>
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
