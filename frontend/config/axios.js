import axios from "axios";

const clienteAxios = axios.create({
  baseURL: process.env.backendURL, //${process.env.BACKEND_URL}
});

export default clienteAxios;
