import axios from 'axios';
import { MoodResponse } from '../types/api';

// Get the development server IP automatically
// Bilgisayarının IP adresini buraya yaz (örn: 172.20.10.x)
// 'ipconfig getifaddr en0' komutu ile bulabilirsin.
const API_BASE_URL = 'http://172.20.10.2:8000'; // IP adresini terminalden çıkanla değiştir

console.log('API Base URL:', API_BASE_URL); // Debug log

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
        // iOS expects 'file://' prefix, Android might not.
        // But for upload, we need to ensure it's a valid object.
        const file = {
            uri: imageUri, // Keep file:// prefix for iOS
            type: 'image/jpeg',
            name: 'photo.jpg',
        } as any;

        formData.append('file', file);

        // Map frontend categories (plural) to API categories (singular)
        const categoryMapping: Record<string, string> = {
            'Movies': 'Movie',
            'Series': 'Series',
            'Music': 'Music',
            'Books': 'Book',
        };

        const apiCategory = categoryMapping[category] || category;
        formData.append('category', apiCategory);

        const response = await axios.post<MoodResponse>(
            `${API_BASE_URL}/analyze`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                timeout: 60000, // 60 second timeout (backend takes 15-20s)
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
