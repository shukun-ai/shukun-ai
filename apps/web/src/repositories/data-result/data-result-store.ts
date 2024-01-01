import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';

import { DataResult } from '@ailake/apitype';

export const dataResultStore = createStore(
  { name: 'dataResult' },
  withEntities<DataResult>()
);
