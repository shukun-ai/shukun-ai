import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  apiPath,
  QueryGeneratorSqlToResultInput,
  QueryGeneratorSqlToResultOutput,
  QueryGeneratorTextToSqlInput,
  QueryGeneratorTextToSqlOutput,
  QueryStep,
} from '@shukun-ai/apitype';
import { SchemaService } from '@shukun-ai/entities';
import { LlmService } from '@shukun-ai/llm';
import { SqlPromptService } from '@shukun-ai/prompt';
import { PostgresService } from '@shukun-ai/db';

@Controller()
export class QueryGeneratorController {
  constructor(
    private readonly schemaService: SchemaService,
    private readonly llmService: LlmService,
    private readonly sqlPromptService: SqlPromptService,
    private readonly postgresService: PostgresService
  ) {}

  @Post(apiPath.queryGenerators.textToSql)
  async textToSql(
    @Body() props: QueryGeneratorTextToSqlInput
  ): Promise<QueryGeneratorTextToSqlOutput> {
    const { metadata, stepIndex } = props;
    const currentStep = metadata.steps[stepIndex];

    if (!currentStep) {
      throw new BadRequestException("Step doesn't exist");
    }

    const { schemaId, promptTask } = currentStep;

    if (!schemaId) {
      throw new BadRequestException("schema Id doesn't exist");
    }

    const schema = await this.schemaService.retrieve({ schemaId });

    const lastResultDDL = this.getLastResultDDL(props);

    const { prompt, schemaDdl } = this.sqlPromptService.getDQL(
      promptTask,
      schema,
      lastResultDDL
    );

    const sql = await this.llmService.askSql(prompt);

    return {
      generatedQuery: {
        tableName: 'generated_step_' + stepIndex + 1,
        dbType: schema.dbType as 'postgres',
        schemaDdl,
        querySql: sql,
        lastGeneratedAt: new Date().toISOString(),
      },
    };
  }

  private getLastResultDDL(props: QueryGeneratorTextToSqlInput): string {
    const { metadata, stepIndex } = props;
    if (stepIndex === 0) {
      return '';
    }

    return metadata.steps
      .slice(0, stepIndex)
      .map((step) => {
        return this.resultFieldsToDdl(step);
      })
      .join('\n');
  }

  private resultFieldsToDdl(step: QueryStep): string {
    const { queriedFields, generatedQuery } = step;
    if (!queriedFields || !generatedQuery) {
      throw new Error('queriedFields or generatedQuery is not exist');
    }

    const fields = queriedFields.fields
      .map((field) => {
        return `${field.name} ${field.type}`;
      })
      .join(',\n');

    return `CREATE TABLE ${generatedQuery.tableName} (\n${fields}\n);`;
  }

  @Post(apiPath.queryGenerators.sqlToResult)
  async sqlToResult(
    @Body() props: QueryGeneratorSqlToResultInput
  ): Promise<QueryGeneratorSqlToResultOutput> {
    const { metadata, stepIndex } = props;

    const currentStep = metadata.steps[stepIndex];

    if (!currentStep) {
      throw new BadRequestException("Step doesn't exist");
    }

    const { schemaId } = currentStep;

    if (!schemaId) {
      throw new BadRequestException("schema Id doesn't exist");
    }

    if (!currentStep.generatedQuery) {
      throw new BadRequestException("generatedQuery doesn't exist");
    }

    const schema = await this.schemaService.retrieve({ schemaId });

    const sqls: string[] = [];

    metadata.steps.slice(0, stepIndex + 1).forEach((step) => {
      const querySql = step.generatedQuery?.querySql;
      if (!querySql) {
        throw new Error('The querySql is not generated');
      }
      sqls.push(querySql);
    });

    const tableName = currentStep.generatedQuery.tableName;

    const withSql = sqls
      .map((sql) => (sql.endsWith(';') ? sql.slice(0, sql.length - 1) : sql))
      .map(
        (sql, index) =>
          `${metadata.steps[index].generatedQuery?.tableName} AS (${sql})`
      )
      .join(',\n');

    const sql = `WITH ${withSql} SELECT * FROM ${tableName}`;

    const result = await this.postgresService.runQuery(sql, schema.dbUrl);

    return {
      result: {
        fields: result.fields.map((field) => ({
          name: field.name,
          type: field.type,
        })),
        rows: result.rows,
      },
    };
  }
}
