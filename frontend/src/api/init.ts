import axios from "axios";

const axiosInstace = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  //baseURL: "http://localhost:3001",
});

export default axiosInstace;
