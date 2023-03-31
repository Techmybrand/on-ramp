import axios from "axios";
const API_URL = process.env.API_URL || 'http://localhost:8080/api';

export default axios.create({
  baseURL: API_URL
});

export const API = axios.create({
  baseURL: API_URL,
  headers: { "content-Type": "application/json" }
  // withCredentials: true
});

