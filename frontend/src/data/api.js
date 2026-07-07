// src/data/api.js
import axios from "axios";

const api = axios.create({
  // Endereço da API local (o json-server sobe nesta porta).
  baseURL: "http://localhost:3000",
});

export default api;