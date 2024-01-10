import { SchemaDomainColumn } from '@ailake/apitype';
import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

type SchemaAttributes = {
  id: string;
  name: string;
  type: string;
  url: string;
  secretKey: string;
  tables: Record<
    string,
    {
      tableName: string;
      tableDescription?: string;
      columns: Record<string, SchemaDomainColumn>;
    }
  >;
};

type SchemaAttributesCreation = Optional<SchemaAttributes, 'id'>;

export class SchemaModel extends Model<
  SchemaAttributes,
  SchemaAttributesCreation
> {}

SchemaModel.init(
  {
    id: { type: DataTypes.UUIDV4, primaryKey: true },
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        max: 255,
      },
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        max: 255,
      },
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        max: 255,
      },
    },
    secretKey: {
      type: DataTypes.STRING,
      validate: {
        max: 255,
      },
    },
    tables: {
      type: DataTypes.JSON,
    },
  },
  { sequelize, modelName: 'schema_databases' }
);

(async () => {
  await sequelize.sync();
})();
