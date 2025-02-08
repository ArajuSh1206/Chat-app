import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhostL5173/api",
    withCredentials: true,
})