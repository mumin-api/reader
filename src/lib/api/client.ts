import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3333/v1';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor для добавления API ключа
apiClient.interceptors.request.use(
    (config) => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        if (apiKey) {
            config.headers['X-API-Key'] = apiKey;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Error handling interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error:', error.response.status, error.response.data);
            if (error.response.status === 429) {
                // Handle rate limiting
                return Promise.reject(new Error('Too many requests. Please try again later.'));
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network Error:', error.request);
            return Promise.reject(new Error('Network error. Please check your connection.'));
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export interface Translation {
    id: number;
    hadithId: number;
    languageCode: string;
    text: string;
    narrator?: string;
    grade?: string;
    translator?: string;
}

export interface Hadith {
    id: number;
    collection: string;
    bookNumber: number;
    hadithNumber: number;
    arabicText: string;
    arabicNarrator?: string;
    translation: Translation | null;
    metadata?: any;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: Pagination;
}

export const hadithApi = {
    getHadiths: async (params: {
        page?: number;
        limit?: number;
        collection?: string;
        bookNumber?: number;
        hadithNumber?: number;
        language?: string;
        topic?: string;
    }) => {
        const response = await apiClient.get<any>('/hadiths', { params });
        return response.data.data || response.data;
    },

    getHadithById: async (id: number, language: string = 'en') => {
        const response = await apiClient.get<any>(`/hadiths/${id}`, { params: { language } });
        return response.data.data || response.data;
    },

    getRandomHadith: async (params?: { language?: string; collection?: string; grade?: string }) => {
        const response = await apiClient.get<any>('/hadiths/random', { params });
        return response.data.data || response.data;
    },

    searchHadiths: async (params: { q: string; language?: string; page?: number; limit?: number; collection?: string; grade?: string }) => {
        const response = await apiClient.get<any>('/hadiths/search', { params });
        return response.data.data || response.data;
    },

    getDailyHadith: async (language: string = 'en') => {
        const response = await apiClient.get<any>(`/hadiths/daily`, { params: { language } });
        return response.data.data || response.data;
    },

    getCollections: async () => {
        const response = await apiClient.get<any>('/collections');
        return response.data.data || response.data;
    },

    getCollectionBySlug: async (slug: string) => {
        const response = await apiClient.get<any>(`/collections/${slug}`);
        return response.data.data || response.data;
    },

    getActiveEvents: async () => {
        const response = await apiClient.get<any>('/events/active');
        return response.data.data || response.data;
    },

    getSuggestions: async (params: { q: string; language?: string }) => {
        const response = await apiClient.get<any>('/hadiths/suggestions', { params });
        return response.data.data || response.data;
    },

    getSpell: async (params: { q: string; language?: string }) => {
        const response = await apiClient.get<any>('/hadiths/spell', { params });
        return response.data.data || response.data;
    },
};