import axios from 'axios';
import Cookies from 'js-cookie';

export const callAPI = async ({ url, method, data, token, serverToken }) => {
  let headers = {};

  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenFromCookies = Cookies.get('token');
    const jwtToken = Buffer.from(tokenFromCookies, 'base64').toString('ascii');
    headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
  }

  const response = await axios({ url, data, method, headers }).catch((error) => error.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.data.message,
      data: response.data.data.message ? response.data.data.message : null,
    };

    return res;
  }

  const res = {
    error: false,
    message: response.data.data.message,
    data: response.data.data,
  };

  return res;
};
