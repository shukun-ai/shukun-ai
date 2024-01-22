import {
  ThreadCreateInput,
  ThreadCreateOutput,
  ThreadRetrieveInput,
  ThreadRetrieveOutput,
  apiPath,
} from '@ailake/apitype';
import { getAxios } from './axios';

export const retrieveThread = async (
  input: ThreadRetrieveInput
): Promise<ThreadRetrieveOutput> => {
  const response = await getAxios().post<ThreadRetrieveOutput>(
    apiPath.threads.retrieve,
    input
  );
  return response.data;
};

export const createThread = async (
  input: ThreadCreateInput
): Promise<ThreadCreateOutput> => {
  const response = await getAxios().post<ThreadCreateOutput>(
    apiPath.threads.create,
    input
  );
  return response.data;
};
