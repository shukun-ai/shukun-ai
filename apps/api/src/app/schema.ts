export type SchemaDefinition = {
  tables: TableDefinition[];
};

export type TableDefinition = {
  tableName: string;
  tableAlias: string[];
  columns: ColumnDefinition[];
};

export type ColumnDefinition = {
  columnName: string;
  columnAlias: string[];
  columnType:
    | 'varchar'
    | 'integer'
    | 'float'
    | 'boolean'
    | 'timestamp'
    | 'enum';
  precision?: number;
  scale?: number;
  enums?: {
    key: string;
    label: string;
  }[];
  columnDefault?: unknown;
  notNullable?: boolean;
  isPrimary?: boolean;
  isUnique?: boolean;
  isIndexed?: boolean;
  comment?: string;
  reference?: {
    tableName: string;
    columnName: string;
    displayColumnName: string;
  };
};

const tables: TableDefinition[] = [
  {
    tableName: 'arrival_packages',
    tableAlias: ['业务袋'],
    columns: [
      {
        columnName: 'id',
        columnAlias: ['业务袋ID'],
        columnType: 'varchar',
        isPrimary: true,
        notNullable: true,
      },
      {
        columnName: 'created_at',
        columnAlias: ['创建时间'],
        columnType: 'timestamp',
      },
      {
        columnName: 'number',
        columnAlias: ['袋号'],
        columnType: 'varchar',
      },
      {
        columnName: 'arrival_task_id',
        columnAlias: ['任务ID'],
        columnType: 'varchar',
      },
      {
        columnName: 'updated_at',
        columnAlias: ['更新时间'],
        columnType: 'timestamp',
      },
    ],
  },
  {
    tableName: 'arrival_tasks',
    tableAlias: ['任务', '到达任务'],
    columns: [
      {
        columnName: 'id',
        columnAlias: ['任务ID'],
        columnType: 'varchar',
      },
      {
        columnName: 'flight_number',
        columnAlias: ['航班号'],
        columnType: 'varchar',
      },
      {
        columnName: 'airport_code',
        columnAlias: ['机场', '机场代码'],
        columnType: 'varchar',
      },
      {
        columnName: 'actual_at',
        columnAlias: ['实到时间', '到达时间'],
        columnType: 'timestamp',
      },
      {
        columnName: 'bridge',
        columnAlias: ['桥位', '机位'],
        columnType: 'varchar',
      },
      {
        columnName: 'created_at',
        columnAlias: ['创建时间'],
        columnType: 'timestamp',
      },
      {
        columnName: 'estimated_at',
        columnAlias: ['预到时间'],
        columnType: 'timestamp',
      },
      {
        columnName: 'flight_at',
        columnAlias: ['航班日期'],
        columnType: 'timestamp',
      },
      {
        columnName: 'source_departure_at',
        columnAlias: ['前站起飞时间'],
        columnType: 'timestamp',
      },
      {
        columnName: 'status',
        columnAlias: ['航班状态'],
        columnType: 'enum',
        enums: [
          {
            key: 'synced',
            label: '待发布',
          },
          {
            key: 'published',
            label: '已发布',
          },
          {
            key: 'accepted',
            label: '已接受',
          },
          {
            key: 'executed',
            label: '已执行',
          },
          {
            key: 'finished',
            label: '已完成',
          },
          {
            key: 'canceled',
            label: '已完成无袋',
          },
          {
            key: 'achieved',
            label: '已交接',
          },
        ],
      },
      {
        columnName: 'updated_at',
        columnAlias: ['更新时间'],
        columnType: 'timestamp',
      },
      {
        columnName: 'vehicle_id',
        columnAlias: ['车辆ID'],
        columnType: 'varchar',
      },
    ],
  },
  {
    tableName: 'vehicles',
    tableAlias: ['车辆', '机动车'],
    columns: [
      {
        columnName: 'id',
        columnAlias: ['车辆ID'],
        columnType: 'varchar',
      },
      {
        columnName: 'title',
        columnAlias: ['车牌号'],
        columnType: 'varchar',
      },
      {
        columnName: 'vehicle_brand',
        columnAlias: ['车辆品牌'],
        columnType: 'varchar',
      },
    ],
  },
];

export const getSchemaDefinition = () => {
  return {
    tables,
  };
};
