import {
  CreateSchemaDto,
  CreateSchemaResponse,
  FindSchemaDto,
  FindSchemaResponse,
  ModifySchemaDto,
  ModifySchemaResponse,
  PushTablesDto,
  PushTablesResponse,
  RemoveSchemaDto,
  RemoveSchemaResponse,
  schemaPath,
} from '@ailake/apitype';
import { getAxios } from './axios';

export const createSchema = async (
  data: CreateSchemaDto
): Promise<CreateSchemaResponse> => {
  const response = await getAxios().post<CreateSchemaResponse>(
    schemaPath.createSchema,
    data
  );
  return response.data;
};

export const modifySchema = async (
  data: ModifySchemaDto
): Promise<ModifySchemaResponse> => {
  const response = await getAxios().put<ModifySchemaResponse>(
    schemaPath.modifySchema,
    data
  );
  return response.data;
};

export const removeSchema = async (
  data: RemoveSchemaDto
): Promise<RemoveSchemaResponse> => {
  const response = await getAxios().put<RemoveSchemaResponse>(
    schemaPath.removeSchema,
    data
  );
  return response.data;
};

export const findSchema = async (
  data: FindSchemaDto
): Promise<FindSchemaResponse> => {
  const response = await getAxios().put<FindSchemaResponse>(
    schemaPath.findSchema,
    data
  );
  return response.data;
};

export const pushTables = async (
  data: PushTablesDto
): Promise<PushTablesResponse> => {
  const response = await getAxios().put<PushTablesResponse>(
    schemaPath.pushTables,
    data
  );
  return response.data;
};
