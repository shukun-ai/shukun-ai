import { selectAllEntities } from '@ngneat/elf-entities';
import { dataResultStore } from './data-result-store';

export const dataResultRepository = {
  all$: dataResultStore.pipe(selectAllEntities()),
};
