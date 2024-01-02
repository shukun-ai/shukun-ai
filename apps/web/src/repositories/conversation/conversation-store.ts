import { createStore, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { Conversation } from '@ailake/apitype';

export const conversationStore = createStore(
  { name: 'conversation' },
  withProps<{
    inputAskMessage: string;
    robotIsWorking: boolean;
  }>({ inputAskMessage: '', robotIsWorking: false }),
  withEntities<Conversation>()
);
