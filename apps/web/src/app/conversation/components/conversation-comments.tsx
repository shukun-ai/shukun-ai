import {
  ActionIcon,
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useConversationContext } from './conversation-context';
import { Comment } from '@ailake/apitype';
import { useEffect, useMemo, useState } from 'react';
import { DataVisualization } from '@ailake/shared-ui';
import { CircleLoader } from 'react-spinners';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import {
  IconStarFilled,
  IconThumbDown,
  IconThumbUp,
  IconTool,
} from '@tabler/icons-react';
import logo from '../../../assets/dark-logo@4x.png';

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
          <Avatar radius="lg" color="blue">
            <img src={logo} alt="SHUKUN AI" style={{ width: 38, height: 38 }} />
          </Avatar>
        )}
      </Box>
      <Box style={{ flex: 1 }}>
        {comment.commentText && <Text>{comment.commentText}</Text>}
        {comment.sentByRobot && !comment.isLoading && (
          <Group spacing={4}>
            <Button
              radius="sm"
              size="xs"
              color="gray"
              leftIcon={<IconStarFilled size="0.8rem" />}
            >
              {t('conversation.saveFavorite')}
            </Button>
            <Button
              variant="white"
              size="xs"
              color="gray"
              onClick={() => {
                toggle();
              }}
              leftIcon={<IconTool size="0.8rem" />}
            >
              {t('conversation.debug')}
            </Button>
            <ActionIcon variant="white" size="xs" color="gray">
              <IconThumbUp size="0.8rem" />
            </ActionIcon>
            <ActionIcon variant="white" size="xs" color="gray">
              <IconThumbDown size="0.8rem" />
            </ActionIcon>
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
                {t('conversation.robotLoading')} <TimeCounter />s
              </Text>
            </Stack>
          </Box>
        )}
      </Box>
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
