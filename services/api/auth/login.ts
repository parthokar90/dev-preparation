import api from "../client";

export interface LoginPayload {
    email: string;
    password: string;
}

export const login = async (data: LoginPayload) => {
    const response = await api.post("/login", data);
    return response.data;
};