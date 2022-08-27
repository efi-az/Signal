import axios, { Axios } from 'axios';

const BASE_URL = import.meta.env.VITE_API

class AuthenticationClient {
    static httpClient: Axios;
  
    static getInstance() {
      if (!this.httpClient) {
        this.httpClient = axios.create({
          baseURL: BASE_URL,
        });
      }
  
      return this.httpClient;
    }
  }
  
  export default AuthenticationClient;
  