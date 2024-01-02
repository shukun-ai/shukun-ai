import { Avatar, Box, Group, Loader, Paper, Text } from '@mantine/core';
import { useConversationContext } from './conversation-context';
import { Comment } from '@ailake/apitype';
import { useEffect, useMemo, useState } from 'react';
import { DataVisualization } from './data-visualization';
import { ShukunLogo } from './shukun-logo';

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
        .filter(
          (comment) =>
            comment.conversationId === conversationId && comment.sentByRobot
        )
        .map((comment, index) => (
          <ConversationComment key={comment.id} comment={comment} />
        ))}
    </Box>
  );
};

export const ConversationComment = ({ comment }: { comment: Comment }) => {
  return (
    <Box style={{ display: 'flex', overflow: 'hidden', padding: 20 }}>
      <Box style={{ width: 38 }} mr={20}>
        {!comment.sentByRobot && <Avatar color="red" radius="xs" />}
        {comment.sentByRobot && (
          <Avatar radius="xs">
            <ShukunLogo />
          </Avatar>
        )}
      </Box>
      <Paper shadow="md" p="md" style={{ flex: 1 }}>
        {comment.commentText && <Text>{comment.commentText}</Text>}
        {comment.commentSQL && (
          <Text size="xs" c="dimmed">
            {comment.commentSQL}
          </Text>
        )}
        {comment.commentSQL && (
          <ConversationDataVisualization commentId={comment.id} />
        )}
        {comment.isLoading && (
          <Box>
            <Group>
              <Loader color="orange" size="sm" />
              <Text>
                <TimeCounter /> 秒
              </Text>
            </Group>
          </Box>
        )}
      </Paper>
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

const TimeCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return count;
};
