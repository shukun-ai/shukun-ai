import {
  CreateConversationDto,
  CreateConversationResponse,
} from '@ailake/apitype';
import axios from 'axios';

export const createConversion = async (
  data: CreateConversationDto
): Promise<CreateConversationResponse> => {
  const response = await axios.post<CreateConversationResponse>(
    import.meta.env?.VITE_SERVER_API + '/api/create-conversation',
    data
  );
  return response.data;
};
