import axios from 'axios';

// NOT: Gerçek cihazda test ederken terminalde 'ifconfig' (Mac) yazarak 
// bilgisayarının yerel IP adresini bul ve bura ile değiştir.
// Örnek: 'http://192.168.1.10:8000'
const BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // Analiz biraz sürebilir
});

export const moodService = {
    analyzeMood: async (imageUri: string, category: string) => {
        const formData = new FormData();

        // React Native'de dosya gönderme formatı
        const filename = imageUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append('image', {
            uri: imageUri,
            name: filename,
            type,
        } as any);

        formData.append('category', category.toLowerCase());

        const response = await api.post('/analyze', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    },
};
