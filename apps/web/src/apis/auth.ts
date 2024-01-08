import { CreateJwtDto, CreateJwtResponse, authPath } from '@ailake/apitype';
import { getAxios } from './axios';

export const createConversation = async (
  data: CreateJwtDto
): Promise<CreateJwtResponse> => {
  const response = await getAxios().post<CreateJwtResponse>(
    authPath.createJwt,
    data
  );
  return response.data;
};
