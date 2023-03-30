import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api"
});

export const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "content-Type": "application/json" }
  // withCredentials: true
});

