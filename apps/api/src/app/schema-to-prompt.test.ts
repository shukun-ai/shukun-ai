import { ColumnDefinition } from './schema';
import { buildColumn } from './schema-to-prompt';

describe('buildColumn', () => {
  it('should build the column string correctly', () => {
    const column: ColumnDefinition = {
      columnName: 'id',
      columnAlias: ['id'],
      columnType: 'varchar',
      precision: 24,
      notNullable: true,
      isPrimary: true,
      isUnique: true,
      isIndexed: true,
      comment: 'This is a test column',
    };

    const expectedColumnString = 'id text "This is a test column."';
    const result = buildColumn(column);

    expect(result).toEqual(expectedColumnString);
  });

  it('should build the column string correctly', () => {
    const column: ColumnDefinition = {
      columnName: 'arrival_task_id',
      columnAlias: ['arrival_task_id'],
      columnType: 'varchar',
      precision: 24,
      notNullable: false,
      isPrimary: false,
      isUnique: false,
      isIndexed: false,
      comment: 'This is a foreign Id',
      reference: {
        tableName: 'arrival_tasks',
        columnName: 'id',
        displayColumnName: 'flight_number',
      },
    };

    const expectedColumnString =
      'arrival_task_id text "This is a foreign Id. This can be joined with table_id column in the table_arrival_tasks table and select flight_number column."';
    const result = buildColumn(column);

    expect(result).toEqual(expectedColumnString);
  });
});
