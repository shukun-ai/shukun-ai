import {
  CreateConversationDto,
  CreateConversationResponse,
  conversationPath,
} from '@ailake/apitype';
import { getAxios } from './axios';

export const createConversation = async (
  data: CreateConversationDto
): Promise<CreateConversationResponse> => {
  const response = await getAxios().post<CreateConversationResponse>(
    conversationPath.createConversation,
    data
  );
  return response.data;
};
