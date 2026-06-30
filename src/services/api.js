import axios from "axios";

const api = axios.create({
  baseURL: "",
});

let _logoutCallback = null;

export function setLogoutCallback(fn) {
  _logoutCallback = fn;
}

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = Bearer ;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && _logoutCallback) {
      _logoutCallback();
    }
    return Promise.reject(error);
  }
);

export default api;
