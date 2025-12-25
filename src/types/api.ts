export interface ExternalLinks {
    spotify?: string;
    youtube?: string;
}

export interface Recommendation {
    title: string;
    creator: string;
    rating: string;
    poster_url: string;
    overview: string;
    year: string;
    reason: string;
    external_links?: ExternalLinks;
}

export interface EmotionScores {
    [key: string]: number;
}

export interface MoodResponse {
    mood_title: string;
    mood_description: string;
    dominant_emotion: string;
    secondary_emotion: string;
    detected_age: number;
    detected_gender: string;
    emotion_scores: EmotionScores;
    recommendations: Recommendation[];
}
