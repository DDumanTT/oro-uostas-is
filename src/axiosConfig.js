import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://localhost/api/',
});

// Add a request interceptor
instance.interceptors.request.use(response => {
  const token = localStorage.getItem('jwt_token');

  if (token) {
    response.headers.Authorization = 'Bearer ' + token;
  }

  return response;
});

export const isLogedIn = () => {
  return localStorage.getItem('jwt_token');
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default instance;
