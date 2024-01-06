import { ColumnDefinition, TableDefinition } from './schema';
import { buildColumn, buildReferences } from './schema-to-prompt';

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

    const expectedColumnString = 'id text "The Chinese label is id."';
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
      'arrival_task_id text "The Chinese label is arrival_task_id."';
    const result = buildColumn(column);

    expect(result).toEqual(expectedColumnString);
  });
});

describe('buildReferences', () => {
  it('should build the references string correctly', () => {
    const tables: TableDefinition[] = [
      {
        tableName: 'arrival_packages',
        tableAlias: ['arrival_packages'],
        columns: [
          {
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
          },
        ],
      },
    ];

    const expectedReferencesString =
      '- table_arrival_packages.arrival_task_id can be joined with table_arrival_tasks.id';
    const result = buildReferences(tables);

    expect(result).toEqual(expectedReferencesString);
  });
});
