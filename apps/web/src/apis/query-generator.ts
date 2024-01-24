import {
  QueryGeneratorCreateInput,
  QueryGeneratorCreateOutput,
  apiPath,
} from '@ailake/apitype';
import { getAxios } from './axios';

export const createQueryGenerator = async (
  input: QueryGeneratorCreateInput
): Promise<QueryGeneratorCreateOutput> => {
  console.log('input', input);
  const response = await getAxios().post<QueryGeneratorCreateOutput>(
    apiPath.queryGenerators.create,
    input
  );
  return response.data;
};
