import {
  QueryCreateInput,
  QueryCreateOutput,
  QueryListInput,
  QueryListOutput,
  QueryRemoveInput,
  QueryRemoveOutput,
  QueryRetrieveInput,
  QueryRetrieveOutput,
  QueryUpdateInput,
  QueryUpdateOutput,
  apiPath,
} from '@ailake/apitype';
import { getAxios } from './axios';

export const listQuery = async (
  input: QueryListInput
): Promise<QueryListOutput> => {
  const response = await getAxios().post<QueryListOutput>(
    apiPath.queries.list,
    input
  );
  return response.data;
};

export const retrieveQuery = async (
  input: QueryRetrieveInput
): Promise<QueryRetrieveOutput> => {
  const response = await getAxios().post<QueryRetrieveOutput>(
    apiPath.queries.retrieve,
    input
  );
  return response.data;
};

export const createQuery = async (
  input: QueryCreateInput
): Promise<QueryCreateOutput> => {
  const response = await getAxios().post<QueryCreateOutput>(
    apiPath.queries.create,
    input
  );
  return response.data;
};

export const updateQuery = async (
  input: QueryUpdateInput
): Promise<QueryUpdateOutput> => {
  const response = await getAxios().post<QueryUpdateOutput>(
    apiPath.queries.update,
    input
  );
  return response.data;
};

export const removeQuery = async (
  input: QueryRemoveInput
): Promise<QueryRemoveOutput> => {
  const response = await getAxios().post<QueryRemoveOutput>(
    apiPath.queries.remove,
    input
  );
  return response.data;
};
