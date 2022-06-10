import { callAPI } from '../config/api';

const ROOT_URL = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'v1';

export const getDetailCreator = (id_creator, token) => {
  const url = `${ROOT_URL}/${API_VERSION}/creators/${id_creator}`;

  return callAPI({ url, method: 'GET', token: false, serverToken: token });
};
