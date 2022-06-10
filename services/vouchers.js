import { callAPI } from '../config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'v1';

export const getAllVouchersAPI = async () => {
  const url = `${ROOT_API}/${API_VERSION}/vouchers`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
};
