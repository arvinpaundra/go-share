import { callAPI } from '../config/api';

const ROOT_URL = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'v1';

export const setRegister = async (data) => {
  const url = `${ROOT_URL}/${API_VERSION}/auth/register`;

  return callAPI({ url, data, method: 'POST', token: false });
};

export const setLogin = async (data) => {
  const url = `${ROOT_URL}/${API_VERSION}/auth/login`;

  return callAPI({ url, method: 'POST', data, token: false });
};
