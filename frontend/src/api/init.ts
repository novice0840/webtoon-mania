import axios from "axios";

const axiosInstace = axios.create({
  baseURL: `${import.meta.env.API_URI as string}:${import.meta.env.API_PORT as string}`,
});

export default axiosInstace;
