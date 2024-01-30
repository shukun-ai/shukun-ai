import axios from 'axios';

export const getAxios = () => {
  const instance = axios.create({
    baseURL: (import.meta.env?.VITE_SERVER_API ?? '') + '/api',
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error(error);
      if (error.response) {
        return Promise.reject(
          createError({
            name: error?.response?.data?.error,
            message: error?.response?.data?.message,
          })
        );
      } else if (error.request) {
        return Promise.reject(
          createError({
            name: 'The request is not sent.',
            message: 'The request was made but no response was received.',
          })
        );
      } else {
        return Promise.reject(error);
      }
    }
  );

  return instance;
};

const createError = (props: { name?: string; message?: string }) => {
  const error = new Error(props.message ?? 'Unknown error message');
  error.name = props.name ?? 'Unknown network error';
  return error;
};
