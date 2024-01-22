import {
  MessageCreateInput,
  MessageCreateOutput,
  apiPath,
} from '@ailake/apitype';
import { getAxios } from './axios';

export const createMessage = async (
  input: MessageCreateInput
): Promise<MessageCreateOutput> => {
  const response = await getAxios().post<MessageCreateOutput>(
    apiPath.messages.create,
    input
  );
  return response.data;
};
