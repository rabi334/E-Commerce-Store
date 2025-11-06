import axios from "axios";

const axiosServerInstance = axios.create({
  baseURL: "http://localhost:3300/products",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosServerInstance;
