import axios from "axios";

const axiosadminInstance = axios.create({
  baseURL: "http://localhost:3400/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosadminInstance;
