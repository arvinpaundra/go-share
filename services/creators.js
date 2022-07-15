import { callAPI } from '../config/api';

const ROOT_URL = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'v1';

export const getDetailCreator = async (id_creator, token) => {
  const url = `${ROOT_URL}/${API_VERSION}/creators/${id_creator}`;

  return callAPI({ url, method: 'GET', token: false, serverToken: token });
};

export const setEditDataCreator = async (data, id_creator) => {
  const url = `${ROOT_URL}/${API_VERSION}/creators/${id_creator}/edit`;

  return callAPI({ url, method: 'PUT', data, token: true });
};

export const setEditProfilePicture = async (data, id_creator) => {
  const url = `${ROOT_URL}/${API_VERSION}/creators/${id_creator}/profile-picture`;

  return callAPI({ url, method: 'PUT', data, token: true });
};

export const setEditProfilePassword = async (data, id_creator) => {
  const url = `${ROOT_URL}/${API_VERSION}/creators/${id_creator}/edit-password`;

  return callAPI({ url, method: 'PUT', data, token: true });
};
