import type { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('userStore');
    window.location.reload();
    return null;
  }

  if (error.message !== 'canceled') console.log('canceled');
  return Promise.reject(error);
};
