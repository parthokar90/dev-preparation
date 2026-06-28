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

export interface Topic {
    id: number;
    category_id: number;
    title: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface TopicPayload {
    category_id: string | number;
    title: string;
    description?: string;
}

export const getTopics = async (): Promise<Topic[]> => {
    const client = await getAuthClient();
    const response = await client.get("topics");
    return response.data;
};

export const getCategoryTopics = async (catId: number | string): Promise<Topic[]> => {
    const client = await getAuthClient();
    const response = await client.get(`get-topic-details/${catId}`);
    return response.data;
};

export const createTopic = async (data: TopicPayload): Promise<Topic> => {
    const client = await getAuthClient();
    const response = await client.post("topics", data);
    return response.data;
};

export const updateTopic = async (id: number | string, data: TopicPayload): Promise<Topic> => {
    const client = await getAuthClient();
    const response = await client.put(`/topics/${id}`, data);
    return response.data;
};

export const deleteTopic = async (id: number | string): Promise<void> => {
    const client = await getAuthClient();
    await client.delete(`/topics/${id}`);
};