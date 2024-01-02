import { Avatar, Box, Group, Loader, Paper, Stack, Text } from '@mantine/core';
import { useConversationContext } from './conversation-context';
import { Comment } from '@ailake/apitype';
import { useEffect, useMemo, useState } from 'react';
import { DataVisualization } from './data-visualization';
import { ShukunLogo } from './shukun-logo';
import { CircleLoader } from 'react-spinners';

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
            <Stack align="center">
              <CircleLoader size={60} color="rgba(28, 82, 108, 1)" />
              <Text size="xs" color="gray">
                我正在计算中，已计算 <TimeCounter /> 秒
              </Text>
            </Stack>
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
