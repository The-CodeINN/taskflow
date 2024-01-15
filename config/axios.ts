// axiosConfig.ts
import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: false,
});

axiosConfig.interceptors.request.use(
  function (config) {
    // Use useAuthState to get the authentication token
    // const { token } = useAuthState.getState();
    let authToken;
    const authStateString = localStorage.getItem('auth');
    if (authStateString) {
      const authObj = JSON.parse(authStateString);

      authToken = authObj?.state?.token;
    }

    // Only add authToken to headers if it exists
    if (authToken) {
      config.headers.Authorization = 'Bearer ' + authToken;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;
