import api from "../client";

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
    const response = await api.get("topics");
    return response.data;
};

export const getCategoryTopics = async (catId: number | string): Promise<Topic[]> => {
    const response = await api.get(`get-topic-details/${catId}`);
    return response.data;
};

export const createTopic = async (data: TopicPayload): Promise<Topic> => {
    const response = await api.post("topics", data);
    return response.data;
};

export const updateTopic = async (id: number | string, data: TopicPayload): Promise<Topic> => {
    const response = await api.put(`/topics/${id}`, data);
    return response.data;
};

export const deleteTopic = async (id: number | string): Promise<void> => {
    await api.delete(`/topics/${id}`);
};