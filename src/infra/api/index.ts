import axios from "axios";

export const api = axios.create({
  baseURL: 'http://https://deae-michel.herokuapp.com/',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
})
