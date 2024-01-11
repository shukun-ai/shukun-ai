import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useConversationContext } from './conversation-context';
import { Comment } from '@ailake/apitype';
import { useEffect, useMemo, useState } from 'react';
import { DataVisualization, ShukunLogo } from '@ailake/shared-ui';
import { CircleLoader } from 'react-spinners';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box
      style={{
        display: 'flex',
      }}
    >
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
        {comment.sentByRobot && !comment.isLoading && (
          <Group spacing={4}>
            <Button variant="outline" size="xs" color="gray">
              {t('conversation.saveFavorite')}
            </Button>
            <Button
              variant="white"
              size="xs"
              color="gray"
              onClick={() => {
                toggle();
              }}
            >
              {t('conversation.debug')}
            </Button>
          </Group>
        )}
        {comment.commentSQL && (
          <Collapse in={opened}>
            <Alert mt={12} mb={12}>
              <Text size="sm" color="gray">
                {comment.commentSQL}
              </Text>
            </Alert>
          </Collapse>
        )}
        {comment.commentSQL && (
          <ConversationDataVisualization commentId={comment.id} />
        )}
        {comment.isLoading && (
          <Box>
            <Stack align="center">
              <CircleLoader size={60} color="rgba(28, 82, 108, 1)" />
              <Text size="xs" color="gray">
                我正在计算中，已计算 <TimeCounter />s
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
