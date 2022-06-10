import { callAPI } from '../config/api';

const ROOT_URL = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'v1';

export const getWatchPointAPI = async (id_creator) => {
  const url = `${ROOT_URL}/${API_VERSION}/points/watch/${id_creator}`;

  return callAPI({ url, method: 'GET', token: true });
};

export const getSeenPointAPI = async (id_creator) => {
  const url = `${ROOT_URL}/${API_VERSION}/points/seen/${id_creator}`;

  return callAPI({ url, method: 'GET', token: true });
};

export const getRemainingPointAPI = async (id_creator) => {
  const url = `${ROOT_URL}/${API_VERSION}/points/remaining/${id_creator}`;

  return callAPI({ url, method: 'GET', token: true });
};

export const setCounterWatch = (id_creator) => {
  const url = `${ROOT_URL}/${API_VERSION}/points/watch/${id_creator}`;

  return callAPI({ url, method: 'PUT', token: true });
};

export const setCounterSeen = async (id_creator) => {
  const url = `${ROOT_URL}/${API_VERSION}/points/seen/${id_creator}`;

  return callAPI({ url, method: 'PUT', token: true });
};
