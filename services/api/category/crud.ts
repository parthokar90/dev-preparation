"use server"; 

import { cookies } from "next/headers";
import axios from "axios";

const LARAVEL_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function getAuthClient() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    return axios.create({
        baseURL: LARAVEL_API_URL,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
        },
    });
}

export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface CategoryPayload {
    name: string;
    description?: string;
}

export const getCategories = async (): Promise<Category[]> => {
    const client = await getAuthClient();
    const response = await client.get("/category-index"); 
    return response.data; 
};

export const getCategoryById = async (id: number | string): Promise<Category> => {
    const client = await getAuthClient();
    const response = await client.get(`/categories/${id}`);
    return response.data;
};

export const createCategory = async (data: CategoryPayload): Promise<Category> => {
    const client = await getAuthClient();
    const response = await client.post("/categories", data);
    return response.data;
};

export const updateCategory = async (id: number | string, data: CategoryPayload): Promise<Category> => {
    const client = await getAuthClient();
    const response = await client.put(`/categories/${id}`, data);
    return response.data;
};

export const deleteCategory = async (id: number | string): Promise<void> => {
    const client = await getAuthClient();
    await client.delete(`/categories/${id}`);
};