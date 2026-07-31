import axios from "axios";

const token=localStorage.getItem('accessToken')

const authAxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BURL}`,
  headers:{
          "Accept-Language":"en",
          "Authorization":`Bearer ${token}`
        }
});

export default authAxiosInstance;