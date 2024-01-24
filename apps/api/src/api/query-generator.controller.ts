import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  apiPath,
  QueryGeneratorCreateInput,
  QueryGeneratorCreateOutput,
} from '@ailake/apitype';
import { SchemaService } from '../schema/schema.service';
import { LlmService } from '../llm/llm.service';
import { SqlPromptService } from '../sql-prompt/sql-prompt.service';

@Controller()
export class QueryGeneratorController {
  constructor(
    private readonly schemaService: SchemaService,
    private readonly llmService: LlmService,
    private readonly sqlPromptService: SqlPromptService
  ) {}

  @Post(apiPath.queryGenerators.create)
  async create(
    @Body() props: QueryGeneratorCreateInput
  ): Promise<QueryGeneratorCreateOutput> {
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

    const { prompt: ddlPrompt } = this.sqlPromptService.getDDL(sql, schemaDdl);

    const resultDdl = await this.llmService.askSql(ddlPrompt);

    return {
      generatedQuery: {
        dbType: schema.dbType as 'postgres',
        schemaDdl,
        querySql: sql,
        resultDdl: resultDdl,
        lastGeneratedAt: new Date().toISOString(),
      },
    };
  }

  private getLastResultDDL(props: QueryGeneratorCreateInput): string {
    const { metadata, stepIndex } = props;
    if (stepIndex === 0) {
      return '';
    }

    return metadata.steps
      .slice(0, stepIndex)
      .map((step) => {
        return step.generatedQuery?.resultDdl ?? '';
      })
      .join('\n');
  }
}
