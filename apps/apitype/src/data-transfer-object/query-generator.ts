import { Query, QueryGeneratedQuery } from '../domain/query';
import { Result } from '../domain/result';

export type QueryGeneratorTextToSqlInput = {
  metadata: Query;
  stepIndex: number;
};

export type QueryGeneratorTextToSqlOutput = {
  generatedQuery: QueryGeneratedQuery;
};

export type QueryGeneratorSqlToResultInput = {
  metadata: Query;
  stepIndex: number;
};

export type QueryGeneratorSqlToResultOutput = {
  result: Result;
};
