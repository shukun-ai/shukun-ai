import {
  CreateConversationDto,
  CreateConversationResponse,
} from '@ailake/apitype';
import axios from 'axios';

export const createConversion = async (
  data: CreateConversationDto
): Promise<CreateConversationResponse> => {
  const response = await axios.post<CreateConversationResponse>(
    'http://localhost:3000/api/create-conversation',
    data
  );
  return response.data;
};
