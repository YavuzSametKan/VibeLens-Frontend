import axios from 'axios';

// Fallback services to fetch posters when backend returns empty
export const fetchPoster = async (title: string, category: string): Promise<string | null> => {
    try {
        const query = encodeURIComponent(title);

        // 1. Movies & Series & Music -> iTunes Search API (Free, no key, reliable)
        if (category === 'Movie' || category === 'Movies' || category === 'Series' || category === 'Music') {
            // Entity type mapping
            let entity = 'movie';
            if (category === 'Music') entity = 'album';
            if (category === 'Series') entity = 'tvSeason';

            const url = `https://itunes.apple.com/search?term=${query}&media=${category === 'Music' ? 'music' : 'movie'}&entity=${entity}&limit=1`;

            // iTunes is a bit weird with TV Shows, sometimes 'tvSeason' or just generic search works better. 
            // For simplicity, let's try a generic search if specific fails, or just default to movie/music.

            const response = await axios.get(url);
            if (response.data.results && response.data.results.length > 0) {
                // Get the highest resolution available (usually 100x100 is returned, we replace to get 600x600)
                return response.data.results[0].artworkUrl100.replace('100x100', '600x600');
            }
        }

        // 2. Books -> Google Books API
        if (category === 'Book' || category === 'Books') {
            const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=1`;
            const response = await axios.get(url);
            if (response.data.items && response.data.items.length > 0) {
                const vol = response.data.items[0].volumeInfo;
                if (vol.imageLinks) {
                    // Try extraLarge, large, medium, small, thumbnail
                    return vol.imageLinks.extraLarge || vol.imageLinks.large || vol.imageLinks.medium || vol.imageLinks.thumbnail || null;
                }
            }
        }

        return null;
    } catch (error) {
        console.warn('Error fetching poster:', error);
        return null;
    }
};
