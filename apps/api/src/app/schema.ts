import { Metadata } from './get-embedding-query';

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
        comment: '每个业务袋的唯一ID',
      },
      {
        columnName: 'created_at',
        columnAlias: ['创建时间'],
        columnType: 'timestamp',
        comment: '业务袋的创建时间',
      },
      {
        columnName: 'number',
        columnAlias: ['袋号'],
        columnType: 'varchar',
        comment: '业务袋的袋号',
      },
      {
        columnName: 'arrival_task_id',
        columnAlias: ['任务ID'],
        columnType: 'varchar',
        reference: {
          tableName: 'arrival_tasks',
          columnName: 'id',
          displayColumnName: 'flight_number',
        },
        comment: '业务袋所属的任务ID',
      },
      {
        columnName: 'updated_at',
        columnAlias: ['更新时间'],
        columnType: 'timestamp',
        comment: '业务袋的更新时间',
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
        comment: '每个任务的唯一ID',
      },
      {
        columnName: 'flight_number',
        columnAlias: ['航班号'],
        columnType: 'varchar',
        comment: '航班号',
      },
      {
        columnName: 'airport_code',
        columnAlias: ['机场代码', '机场'],
        columnType: 'varchar',
        comment: '任务的机场代码',
      },
      {
        columnName: 'actual_at',
        columnAlias: ['实到时间', '到达时间'],
        columnType: 'timestamp',
        comment: '实到时间',
      },
      {
        columnName: 'bridge',
        columnAlias: ['桥位', '机位'],
        columnType: 'varchar',
        comment: '桥位',
      },
      {
        columnName: 'created_at',
        columnAlias: ['创建时间'],
        columnType: 'timestamp',
        comment: '任务的创建时间',
      },
      {
        columnName: 'estimated_at',
        columnAlias: ['预到时间'],
        columnType: 'timestamp',
        comment: '预到时间',
      },
      {
        columnName: 'flight_at',
        columnAlias: ['航班日期'],
        columnType: 'timestamp',
        comment: '航班日期',
      },
      {
        columnName: 'source_departure_at',
        columnAlias: ['前站起飞时间'],
        columnType: 'timestamp',
        comment: '航班从上个机场起飞的时间',
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
        comment: '任务的状态',
      },
      {
        columnName: 'updated_at',
        columnAlias: ['更新时间'],
        columnType: 'timestamp',
        comment: '业务袋的更新时间',
      },
      {
        columnName: 'vehicle_id',
        columnAlias: ['车辆ID'],
        columnType: 'varchar',
        reference: {
          tableName: 'vehicles',
          columnName: 'id',
          displayColumnName: 'title',
        },
        comment: '任务关联的车辆ID',
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
        comment: '每个车辆的唯一ID',
      },
      {
        columnName: 'title',
        columnAlias: ['车牌号'],
        columnType: 'varchar',
        comment: '车牌号',
      },
      {
        columnName: 'vehicle_brand',
        columnAlias: ['车辆品牌'],
        columnType: 'varchar',
        comment: '车辆品牌',
      },
    ],
  },
  {
    tableName: 'task_logs',
    tableAlias: ['日志'],
    columns: [
      {
        columnName: 'log_id',
        columnAlias: ['日志ID'],
        columnType: 'varchar',
        comment: '每个日志的唯一ID',
      },
      {
        columnName: 'created_at',
        columnAlias: ['创建时间'],
        columnType: 'timestamp',
        comment: '创建时间',
      },
      {
        columnName: 'foreign_id',
        columnAlias: ['日志相关联的任务ID'],
        columnType: 'varchar',
        comment: '任务日志相关联的任务ID',
        reference: {
          tableName: 'arrival_tasks',
          columnName: 'id',
          displayColumnName: 'flight_number',
        },
      },
      {
        columnName: 'log_type',
        columnAlias: ['日志类型'],
        columnType: 'enum',
        comment: '日志类型',
        enums: [
          {
            key: 'raw',
            label: '待绑业务袋',
          },
          {
            key: 'bound',
            label: '已绑业务袋',
          },
          {
            key: 'documentTaken',
            label: '空侧送机业务袋取袋',
          },
          {
            key: 'documentDelivery',
            label: '空侧送机业务袋至交接点',
          },
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
          {
            key: 'reversing',
            label: '撤回中',
          },
          {
            key: 'reversed',
            label: '已撤回',
          },
          {
            key: 'reverseArchived',
            label: '撤回已归档',
          },
          {
            key: 'reverseFailed',
            label: '撤回失败',
          },
        ],
      },
      {
        columnName: 'mobile_version',
        columnAlias: ['移动端的版本号'],
        columnType: 'varchar',
        comment: '移动端的版本号',
      },
      {
        columnName: 'operator',
        columnAlias: ['操作者的ID'],
        columnType: 'varchar',
        comment: '操作者的ID',
      },
      {
        columnName: 'updated_at',
        columnAlias: ['更新时间'],
        columnType: 'timestamp',
        comment: '更新时间',
      },
      {
        columnName: 'vehicle',
        columnAlias: ['日志关联的车辆ID'],
        columnType: 'varchar',
        comment: '日志关联的车辆ID',
      },
      {
        columnName: 'vehicle_latitude',
        columnAlias: ['日志经度'],
        columnType: 'float',
        comment: '日志经度',
      },
      {
        columnName: 'vehicle_longitude',
        columnAlias: ['日志纬度'],
        columnType: 'float',
        comment: '日志纬度',
      },
      {
        columnName: 'operator_name',
        columnAlias: ['日志操作者'],
        columnType: 'varchar',
        comment: 'operatorName',
      },
    ],
  },
];

export const getAllSchema = (): SchemaDefinition => {
  return {
    tables,
  };
};

export const getPartialSchema = (embedding: {
  ids: string[][];
  metadatas: Metadata[][];
}): SchemaDefinition => {
  const newTables: TableDefinition[] = [];

  for (const table of tables) {
    const newColumns: ColumnDefinition[] = [];
    for (const column of table.columns) {
      const id = `${table.tableName}.${column.columnName}`;
      const index = embedding.ids[0].indexOf(id);
      if (index > -1) {
        newColumns.push(column);
      }
    }
    if (newColumns.length > 0) {
      newTables.push({ ...table, columns: newColumns });
    }
  }

  return { tables: newTables };
};

export const getSchemaDefinition = () => {
  return {
    tables,
  };
};
