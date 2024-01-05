import { ColumnDefinition } from './schema';
import { buildColumn } from './schema-to-prompt';

describe('buildColumn', () => {
  it('should build the column string correctly', () => {
    const column: ColumnDefinition = {
      columnName: 'id',
      columnType: 'varchar',
      precision: 24,
      notNullable: true,
      isPrimary: true,
      isUnique: true,
      isIndexed: true,
      comment: 'This is a test column',
    };

    const expectedColumnString =
      'id varchar(24) PRIMARY KEY "This is a test column"';
    const result = buildColumn(column, 'arrival_packages');

    expect(result).toEqual(expectedColumnString);
  });

  it('should build the column string correctly', () => {
    const column: ColumnDefinition = {
      columnName: 'arrival_task_id',
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
      'arrival_task_id varchar(24) "This is a foreign Id, arrival_packages.arrival_task_id can be joined with arrival_tasks.id"';
    const result = buildColumn(column, 'arrival_packages');

    expect(result).toEqual(expectedColumnString);
  });
});
