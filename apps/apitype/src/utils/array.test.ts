import { append, move, remove, update } from './array';

describe('Name of the group', () => {
  describe('append', () => {
    it('should append', () => {
      const sets = [{ id: 'hello' }];
      const output = append(sets, { id: 'world' });
      expect(output).toEqual([{ id: 'hello' }, { id: 'world' }]);
      expect(sets).toEqual([{ id: 'hello' }]);
    });
  });

  describe('update', () => {
    it('should update', () => {
      const sets = [{ id: 'hello' }];
      const output = update(sets, 0, { id: 'world' });
      expect(output).toEqual([{ id: 'world' }]);
      expect(sets).toEqual([{ id: 'hello' }]);
    });
  });

  describe('remove', () => {
    it('should remove', () => {
      const sets = [{ id: 'hello' }];
      const output = remove(sets, 0);
      expect(output).toEqual([]);
      expect(sets).toEqual([{ id: 'hello' }]);
    });
  });

  describe('move', () => {
    it('should move from 2 to 4', () => {
      const sets = [
        'raw',
        'bound',
        'synced',
        'published',
        'accepted',
        'executed',
      ];
      const output = move(sets, 2, 4);
      expect(output).toEqual([
        'raw',
        'bound',
        'published',
        'accepted',
        'synced',
        'executed',
      ]);
    });

    it('should move from 4 to 2', () => {
      const sets = [
        'raw',
        'bound',
        'synced',
        'published',
        'accepted',
        'executed',
      ];
      const output = move(sets, 4, 2);
      expect(output).toEqual([
        'raw',
        'bound',
        'accepted',
        'synced',
        'published',
        'executed',
      ]);
    });
  });
});
