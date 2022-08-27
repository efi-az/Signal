import type { AxiosRequestConfig } from 'axios';
import { faNumberToEnNumber } from '../../../common/utilities/faNumberToEnNumber';

export const convertFaNumberToEnNumberInterceptor = (config: AxiosRequestConfig) => {
  config.headers = {
    'Content-Type': 'application/json',
    ...config.headers,
  };

  if (config.method !== 'get') {
    try {
      const data = JSON.stringify(JSON.parse(JSON.stringify(config.data).replace(/"\s+|\s+"/g, '"')));

      config.data = faNumberToEnNumber(data);
    } catch (err) {
      console.log(err);
    }
  }

  return config;
};
