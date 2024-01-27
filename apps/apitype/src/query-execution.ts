import { Query, QueryGeneratedQuery } from './domain/query';

export type QueryExecutionCreateInput = {
  metadata: Query;
  stepIndex: number;
};

export type QueryExecutionCreateOutput = {
  generatedSteps: {
    generatedResult?: QueryGeneratedQuery;
  }[];
};
