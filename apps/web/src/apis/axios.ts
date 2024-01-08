import axios from 'axios';

export const getAxios = () => {
  return axios.create({
    baseURL: (import.meta.env?.VITE_SERVER_API ?? '') + '/api',
  });
};
