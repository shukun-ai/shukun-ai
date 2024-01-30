import { Body, Controller, Post } from '@nestjs/common';
import { QueryService } from '../query/query.service';
import {
  QueryRetrieveOutput,
  QueryListOutput,
  apiPath,
  QueryRetrieveInput,
  QueryCreateInput,
  QueryCreateOutput,
  QueryUpdateInput,
  QueryUpdateOutput,
  QueryRemoveInput,
  QueryRemoveOutput,
} from '@shukun-ai/apitype';

@Controller()
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Post(apiPath.queries.retrieve)
  async retrieve(
    @Body() props: QueryRetrieveInput
  ): Promise<QueryRetrieveOutput> {
    return await this.queryService.retrieve(props);
  }

  @Post(apiPath.queries.list)
  async list(): Promise<QueryListOutput> {
    return await this.queryService.list();
  }

  @Post(apiPath.queries.create)
  async create(@Body() props: QueryCreateInput): Promise<QueryCreateOutput> {
    return await this.queryService.create(props);
  }

  @Post(apiPath.queries.update)
  async update(@Body() props: QueryUpdateInput): Promise<QueryUpdateOutput> {
    return await this.queryService.update(props);
  }

  @Post(apiPath.queries.remove)
  async remove(@Body() props: QueryRemoveInput): Promise<QueryRemoveOutput> {
    return await this.queryService.remove(props);
  }
}
