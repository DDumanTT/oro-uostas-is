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

export default instance;
