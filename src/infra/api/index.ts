import axios from "axios";
import Router from "next/router";
import { AccessToken, RefreshToken } from "../cookies";

const access_token = new AccessToken();
const refresh_token = new RefreshToken();
const router = Router;
const api = axios.create({
  baseURL: 'https://deae-michel.herokuapp.com/',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': access_token.getToken() && `Bearer ${access_token.getToken()}`,
  }
})

async function refreshToken() {
  const refresh_token_value = refresh_token.getToken();
  await api.post('auth/refresh', {}, {
    headers: {
      'refresh': refresh_token_value
    }
  }).then(res => {
    access_token.setToken(res.data.access_token)
    refresh_token.setToken(res.data.refresh_token)

    return res;
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
    const access_token_value = access_token.getToken()
    if (err.response.status === 401 && access_token_value) {
      const response = await refreshToken()
      return response;
    }
    if (err.response.status === 401 && !access_token_value) {
      router.replace('/login')
    }
  }
)

export {api};
