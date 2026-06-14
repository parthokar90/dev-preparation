import api, { initCsrf } from "../client";

export interface LoginPayload {
    email: string;
    password: string;
}

export const login = async (data: LoginPayload) => {
    await initCsrf(); 
    const response = await api.post("/login", data);
    return response.data;
};