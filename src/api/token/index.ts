import { initialToken } from '../../state/token/tokenTypes';
import arise from '../apiUrl/arise';

export const getListToken = async (): Promise<initialToken['listTokens']> => {
  try {
    const { data } = await arise({
      url: '/v1/tokens',
      method: 'GET',
      params: {
        page: 1,
        limit: 10
      }
    });
    return data.data.records;
  } catch (error: any) {
    throw error.response;
  }
};
