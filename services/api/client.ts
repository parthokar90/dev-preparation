import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default api;

export const initCsrf = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_SANCTUM_CSRF_API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
};