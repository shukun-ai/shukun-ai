import {
  TemplateCreateInput,
  TemplateCreateOutput,
  TemplateListInput,
  TemplateListOutput,
  TemplateRetrieveInput,
  TemplateRetrieveOutput,
  apiPath,
} from '@ailake/apitype';
import { getAxios } from './axios';

export const listTemplate = async (
  input: TemplateListInput
): Promise<TemplateListOutput> => {
  const response = await getAxios().post<TemplateListOutput>(
    apiPath.templates.list,
    input
  );
  return response.data;
};

export const retrieveTemplate = async (
  input: TemplateRetrieveInput
): Promise<TemplateRetrieveOutput> => {
  const response = await getAxios().post<TemplateRetrieveOutput>(
    apiPath.templates.retrieve,
    input
  );
  return response.data;
};

export const createTemplate = async (
  input: TemplateCreateInput
): Promise<TemplateCreateOutput> => {
  const response = await getAxios().post<TemplateCreateOutput>(
    apiPath.templates.create,
    input
  );
  return response.data;
};
