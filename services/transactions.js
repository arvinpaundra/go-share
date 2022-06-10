import { callAPI } from '../config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'v1';

export const setNewTransaction = async (data) => {
  const url = `${ROOT_API}/${API_VERSION}/transactions`;

  return callAPI({ url, data, method: 'POST', token: true });
};
