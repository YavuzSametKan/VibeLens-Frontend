import axios from 'axios';
import { MoodResponse } from '../types/api';

const API_BASE_URL = 'http://localhost:8000';

export interface AnalyzeMoodRequest {
    image: string; // URI of the image
    category: string;
}

export const analyzeMood = async (
    imageUri: string,
    category: string
): Promise<MoodResponse> => {
    try {
        // Create FormData for image upload
        const formData = new FormData();

        // Extract filename from URI
        const filename = imageUri.split('/').pop() || 'photo.jpg';

        // Create file object for upload
        const file = {
            uri: imageUri,
            type: 'image/jpeg',
            name: filename,
        } as any;

        formData.append('image', file);
        formData.append('category', category);

        const response = await axios.post<MoodResponse>(
            `${API_BASE_URL}/analyze`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 30000, // 30 second timeout
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
            }
            if (error.response) {
                throw new Error(
                    error.response.data?.message || 'Sunucu hatası oluştu.'
                );
            }
            if (error.request) {
                throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
            }
        }
        throw new Error('Beklenmeyen bir hata oluştu.');
    }
};
