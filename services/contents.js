import { callAPI } from '../config/api';

const ROOT_URL = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'v1';

export const getAllContentsAPI = async (token) => {
  const url = `${ROOT_URL}/${API_VERSION}/contents/all`;

  return callAPI({ method: 'GET', serverToken: token, token: false, url });
};

export const getDetailContentAPI = async (id_content) => {
  const url = `${ROOT_URL}/${API_VERSION}/contents/${id_content}`;

  return callAPI({ url, method: 'GET', token: true });
};

export const getCreatorContentsAPI = async (id_creator) => {
  const url = `${ROOT_URL}/${API_VERSION}/contents/all/${id_creator}`;

  return callAPI({ url, method: 'GET', token: true });
};

export const setAddContent = async (data) => {
  const url = `${ROOT_URL}/${API_VERSION}/contents`;

  return callAPI({ url, data, method: 'POST', token: true });
};

export const setEditContent = async (data, id_content) => {
  const url = `${ROOT_URL}/${API_VERSION}/contents/${id_content}`;

  return callAPI({ url, data, method: 'PUT', token: true });
};

export const deleteContent = async (id_content) => {
  const url = `${ROOT_URL}/${API_VERSION}/contents/${id_content}`;

  return callAPI({ url, method: 'DELETE', token: true });
};
