import api from "../client";

export interface Category {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CategoryPayload {
    name: string;
    description?: string;
}

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get("category-index"); 
    return response.data; 
};

export const getCategoryById = async (id: number | string): Promise<Category> => {
    const response = await api.get(`categories/${id}`);
    return response.data;
};

export const createCategory = async (data: CategoryPayload): Promise<Category> => {
    const response = await api.post("categories", data);
    return response.data;
};

export const updateCategory = async (id: number | string, data: CategoryPayload): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
};

export const deleteCategory = async (id: number | string): Promise<void> => {
    await api.delete(`/categories/${id}`);
};