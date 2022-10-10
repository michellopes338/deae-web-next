import axios from "axios";
import Router from "next/router";
import { AccessToken, RefreshToken } from "../cookies";

const access_token = new AccessToken();
const refresh_token = new RefreshToken();
const router = Router;
const api = axios.create({
  baseURL: 'https://deae-michel.herokuapp.com/',
  timeout: 10000,
})
api.interceptors.request.use(
  (config) => {
    config.headers = {
      'Authorization': `Bearer ${access_token.getToken()}`,
      'Content-Type': 'application/json',
    }

    return config;
  },
  error => {
    return error;
  }
)

async function refreshToken() {
  const refresh_token_value = refresh_token.getToken();
  return await api.post('auth/refresh', {}, {
    headers: {
      'refresh': refresh_token_value
    }
  }).then(async (res) => {
    await access_token.setToken(res.data.access_token)
    await refresh_token.setToken(res.data.refresh_token)
  }).catch(() => {
    access_token.removeToken()
    refresh_token.removeToken()
    router.replace('/login')
  })
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const access_token_value = access_token.getToken();
    const originalRequest = err.config;
    if (err.response.status === 401 && access_token_value) {
      originalRequest._retry = true;
      await refreshToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token.getToken()}`
      return await api(originalRequest);
    }
    if (err.response.status === 401 && !access_token_value) {
      router.replace('/login')
    }
  }
)

export { api };
