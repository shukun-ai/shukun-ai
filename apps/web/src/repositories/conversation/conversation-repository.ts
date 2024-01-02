import { select, setProps } from '@ngneat/elf';
import { nanoid } from 'nanoid';
import {
  selectAllEntities,
  addEntities,
  updateEntities,
  deleteEntities,
  deleteAllEntities,
} from '@ngneat/elf-entities';
import { conversationStore } from './conversation-store';
import { createConversion } from '../../apis/apis';
import { commentStore } from '../comment/comment-store';
import { dataResultStore } from '../data-result/data-result-store';
import { Comment, Conversation } from '@ailake/apitype';

export const conversationRepository = {
  inputAskMessage$: conversationStore.pipe(
    select((state) => state.inputAskMessage)
  ),

  robotIsWorking$: conversationStore.pipe(
    select((state) => state.robotIsWorking)
  ),

  all$: conversationStore.pipe(selectAllEntities()),

  create: async (props: { ask: string }) => {
    conversationStore.update(setProps({ robotIsWorking: true }));

    conversationStore.update(deleteAllEntities());
    commentStore.update(deleteAllEntities());
    dataResultStore.update(deleteAllEntities());

    const conversationId = nanoid();
    const conversation: Conversation = {
      id: conversationId,
      createdAt: new Date().toISOString(),
    };
    const askCommentId = nanoid();
    const askComment: Comment = {
      id: askCommentId,
      conversationId: conversationId,
      belongUserId: '1',
      sentByRobot: false,
      commentType: 'text',
      commentText: props.ask,
      commentSQL: null,
      createdAt: new Date().toISOString(),
    };
    const replyCommentId = nanoid();
    const replyComment: Comment = {
      id: replyCommentId,
      conversationId: conversationId,
      belongUserId: '1',
      sentByRobot: true,
      commentType: 'text',
      commentText: null,
      commentSQL: null,
      isLoading: true,
      createdAt: new Date().toISOString(),
    };
    conversationStore.update(addEntities(conversation));
    commentStore.update(addEntities(askComment));
    commentStore.update(addEntities(replyComment));

    try {
      const data = await createConversion({
        ...props,
        askCommentId,
        conversationId,
      });
      conversationStore.update(
        updateEntities(conversationId, data.conversation)
      );
      commentStore.update(updateEntities(askCommentId, data.askComment));
      commentStore.update(deleteEntities(replyCommentId));
      commentStore.update(addEntities(data.replyComment));
      dataResultStore.update(addEntities(data.dataResult));
    } finally {
      conversationStore.update(setProps({ robotIsWorking: false }));
    }
  },

  updateInputAskMessage: (props: { ask: string }) => {
    conversationStore.update(setProps({ inputAskMessage: props.ask }));
  },
};
