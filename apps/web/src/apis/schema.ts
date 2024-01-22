import {
  SchemaCreateInput,
  SchemaCreateOutput,
  SchemaListInput,
  SchemaListOutput,
  SchemaRemoveInput,
  SchemaRemoveOutput,
  SchemaRetrieveInput,
  SchemaRetrieveOutput,
  SchemaUpdateInput,
  SchemaUpdateOutput,
  apiPath,
} from '@ailake/apitype';
import { getAxios } from './axios';

export const listSchema = async (
  input: SchemaListInput
): Promise<SchemaListOutput> => {
  const response = await getAxios().post<SchemaListOutput>(
    apiPath.schema.list,
    input
  );
  return response.data;
};

export const retrieveSchema = async (
  input: SchemaRetrieveInput
): Promise<SchemaRetrieveOutput> => {
  const response = await getAxios().post<SchemaRetrieveOutput>(
    apiPath.schema.retrieve,
    input
  );
  return response.data;
};

export const createSchema = async (
  input: SchemaCreateInput
): Promise<SchemaCreateOutput> => {
  const response = await getAxios().post<SchemaCreateOutput>(
    apiPath.schema.create,
    input
  );
  return response.data;
};

export const updateSchema = async (
  input: SchemaUpdateInput
): Promise<SchemaUpdateOutput> => {
  const response = await getAxios().post<SchemaUpdateOutput>(
    apiPath.schema.update,
    input
  );
  return response.data;
};

export const removeSchema = async (
  input: SchemaRemoveInput
): Promise<SchemaRemoveOutput> => {
  const response = await getAxios().post<SchemaRemoveOutput>(
    apiPath.schema.remove,
    input
  );
  return response.data;
};
