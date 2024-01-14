
import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://127.0.0.1:7001/api/",
  withCredentials: false,
});

axiosConfig.interceptors.request.use(
  function (config) {
    //Getting the auth token that was persisted by zustand
    const authToken = localStorage.getItem("jwtToken");
    // Only add authToken to headers if it exists
    if (authToken) {
      config.headers.Authorization = "Bearer " + authToken;
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
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // if (
    //   error.response.status == 401 
    // ) {
    //   //Getting the auth state that was persisted by zustand and setting its values to undefined to logout the user
    //   localStorage.removeItem("jwtToken");

    //   // Redirect to login page after logging the user out
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  }
);

export default axiosConfig;