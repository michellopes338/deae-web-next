import axios from "axios";

export const api = axios.create({
  baseURL: 'https://deae-michel.herokuapp.com/',
  timeout: 12000,
  headers: {'Content-Type': 'application/json'}
})
