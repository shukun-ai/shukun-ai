import { selectAllEntities } from '@ngneat/elf-entities';
import { commentStore } from './comment-store';

export const commentRepository = {
  all$: commentStore.pipe(selectAllEntities()),
};
