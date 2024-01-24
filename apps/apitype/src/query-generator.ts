import { Query, QueryGeneratedQuery } from './domain/query';

export type QueryGeneratorCreateInput = {
  metadata: Query;
  stepIndex: number;
};

export type QueryGeneratorCreateOutput = {
  generatedSteps: {
    generatedQuery: QueryGeneratedQuery;
  }[];
};
