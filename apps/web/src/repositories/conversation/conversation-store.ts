import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { Conversation } from '@ailake/apitype';

export const conversationStore = createStore(
  { name: 'conversation' },
  withProps<{
    robotIsWorking: boolean;
  }>({ robotIsWorking: false }),
  withEntities<Conversation>()
);
