import {
  QueryGeneratorSqlToResultInput,
  QueryGeneratorSqlToResultOutput,
  QueryGeneratorTextToSqlInput,
  QueryGeneratorTextToSqlOutput,
  apiPath,
} from '@ailake/apitype';
import { getAxios } from './axios';

export const textToSql = async (
  input: QueryGeneratorTextToSqlInput
): Promise<QueryGeneratorTextToSqlOutput> => {
  const response = await getAxios().post<QueryGeneratorTextToSqlOutput>(
    apiPath.queryGenerators.textToSql,
    input
  );
  return response.data;
};

export const sqlToResult = async (
  input: QueryGeneratorSqlToResultInput
): Promise<QueryGeneratorSqlToResultOutput> => {
  const response = await getAxios().post<QueryGeneratorSqlToResultOutput>(
    apiPath.queryGenerators.sqlToResult,
    input
  );
  return response.data;
};
