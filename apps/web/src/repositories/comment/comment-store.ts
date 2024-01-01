import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { Comment } from '@ailake/apitype';

export const commentStore = createStore(
  { name: 'comment' },
  withEntities<Comment>()
);
