import { fetchPoster } from '@/src/services/imageService';
import { useAppStore } from '@/src/store/useAppStore';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, BarChart2, Book, Calendar, ExternalLink, Film, Music, Star, TrendingUp, Tv, User } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
// Card width optimized for next card visibility
const CARD_WIDTH = width * 0.75;
const SPACING = 15;
// Standard movie poster ratio is 2:3. 
// Let's make the image container follow roughly this ratio within the card.
const POSTER_HEIGHT = CARD_WIDTH * 1.5; // True 2:3 ratio

export default function ResultsScreen() {
    const router = useRouter();
    const { moodData, reset, resetForNewScan, setReusePhoto, selectedCategory } = useAppStore();
    const insets = useSafeAreaInsets();
    const scrollX = useRef(new Animated.Value(0)).current;

    // State to store fetched poster URLs
    const [posters, setPosters] = useState<Record<number, string>>({});

    useEffect(() => {
        if (!moodData) {
            router.replace('/');
            return;
        }

        const loadPosters = async () => {
            moodData.recommendations.forEach(async (rec, index) => {
                if (!rec.poster_url) {
                    const url = await fetchPoster(rec.title, selectedCategory || 'Movies');
                    if (url) {
                        setPosters(prev => ({ ...prev, [index]: url }));
                    }
                }
            });
        };
        loadPosters();
    }, [moodData]);

    if (!moodData) {
        return null;
    }

    const handleBackHome = () => {
        Alert.alert(
            "Yeni Tarama",
            "Aynı fotoğraf ile devam etmek ister misin?",
            [
                {
                    text: "Hayır",
                    style: "cancel",
                    onPress: () => {
                        reset();
                        router.replace('/');
                    }
                },
                {
                    text: "Evet",
                    onPress: () => {
                        setReusePhoto(true);
                        resetForNewScan();
                        router.replace('/');
                    }
                }
            ]
        );
    };

    const emotionColors: Record<string, string> = {
        'Happiness': '#22d3ee',
        'Sadness': '#60a5fa',
        'Anger': '#f87171',
        'Fear': '#a78bfa',
        'Disgust': '#4ade80',
        'Surprise': '#fbbf24',
        'Contempt': '#e879f9',
        'Neutral': '#9ca3af',
    };

    const dominantColor = emotionColors[moodData.dominant_emotion] || '#22d3ee';

    const sortedEmotions = Object.entries(moodData.emotion_scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const getCategoryIcon = () => {
        switch (selectedCategory) {
            case 'Movies': return <Film size={40} color={dominantColor} />;
            case 'Series': return <Tv size={40} color={dominantColor} />;
            case 'Music': return <Music size={40} color={dominantColor} />;
            case 'Books': return <Book size={40} color={dominantColor} />;
            default: return <Film size={40} color={dominantColor} />;
        }
    };

    const openMusicLink = (platform: 'spotify' | 'apple' | 'youtube', title: string) => {
        // Construct search URLs if direct link is missing
        const query = encodeURIComponent(title);
        let url = '';
        switch (platform) {
            case 'spotify':
                url = `https://open.spotify.com/search/${query}`;
                break;
            case 'apple':
                url = `https://music.apple.com/us/search?term=${query}`;
                break;
            case 'youtube':
                url = `https://music.youtube.com/search?q=${query}`;
                break;
        }
        Linking.openURL(url);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                {/* Header Navigation */}
                <View style={styles.navHeader}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBackHome}>
                        <ArrowLeft size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.logoText}>Analiz Sonuçları</Text>
                </View>

                {/* Main Analysis Section */}
                <View style={styles.analysisSection}>
                    <Text style={styles.moodTitle}>{moodData.mood_title}</Text>
                    <Text style={styles.moodDescription}>{moodData.mood_description}</Text>

                    <View style={styles.demographicsRow}>
                        <View style={styles.tag}>
                            <User size={14} color="#9ca3af" />
                            <Text style={styles.tagText}>{moodData.detected_gender}</Text>
                        </View>
                        <View style={styles.tag}>
                            <Calendar size={14} color="#9ca3af" />
                            <Text style={styles.tagText}>{moodData.detected_age} Yaş</Text>
                        </View>
                    </View>
                </View>

                {/* Emotion Stats */}
                <View style={styles.statsMixedContainer}>
                    <View style={styles.statsHeader}>
                        <BarChart2 size={18} color={dominantColor} />
                        <Text style={styles.sectionTitle}>Duygu Haritası</Text>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.keyStatsCol}>
                            <View style={styles.statBox}>
                                <Text style={[styles.statValueBig, { color: dominantColor }]}>
                                    {moodData.dominant_emotion}
                                </Text>
                                <Text style={styles.statLabel}>Baskın</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={styles.statValueSmall}>
                                    {moodData.secondary_emotion}
                                </Text>
                                <Text style={styles.statLabel}>İkincil</Text>
                            </View>
                        </View>

                        <View style={styles.chartCol}>
                            {sortedEmotions.map(([emotion, score]) => (
                                <View key={emotion} style={styles.barRow}>
                                    <Text style={styles.barLabel} numberOfLines={1}>{emotion}</Text>
                                    <View style={styles.track}>
                                        <View
                                            style={[
                                                styles.fill,
                                                {
                                                    width: `${Math.max(score * 100, 5)}%`,
                                                    backgroundColor: emotionColors[emotion] || '#444'
                                                }
                                            ]}
                                        />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Recommendations Slider */}
                <View style={styles.recommendationsSection}>
                    <View style={styles.sectionHeader}>
                        <TrendingUp size={18} color={dominantColor} />
                        <Text style={styles.sectionTitle}>Sizin İçin Seçtiklerimiz</Text>
                    </View>

                    <Animated.ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH + SPACING}
                        decelerationRate="fast"
                        contentContainerStyle={styles.sliderContent}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                    >
                        {moodData.recommendations.map((rec, index) => {
                            const inputRange = [
                                (index - 1) * (CARD_WIDTH + SPACING),
                                index * (CARD_WIDTH + SPACING),
                                (index + 1) * (CARD_WIDTH + SPACING),
                            ];

                            const scale = scrollX.interpolate({
                                inputRange,
                                outputRange: [0.95, 1, 0.95],
                                extrapolate: 'clamp',
                            });

                            const posterUrl = rec.poster_url || posters[index];

                            return (
                                <Animated.View
                                    key={index}
                                    style={[
                                        styles.sliderCard,
                                        { transform: [{ scale }] }
                                    ]}
                                >
                                    {/* Dynamic Poster Container: Square for Music, Vertical for others */}
                                    <View style={[
                                        styles.cardImageContainer,
                                        selectedCategory === 'Music' && { height: CARD_WIDTH }
                                    ]}>
                                        {posterUrl ? (
                                            <Image source={{ uri: posterUrl }} style={styles.sliderImage} />
                                        ) : (
                                            <View style={[styles.posterPlaceholder, { backgroundColor: '#1a1a1a' }]}>
                                                {getCategoryIcon()}
                                            </View>
                                        )}
                                        <LinearGradient
                                            colors={['transparent', 'rgba(0,0,0,0.9)']}
                                            style={styles.imageOverlay}
                                        />
                                        <View style={styles.ratingOnImage}>
                                            <Star size={14} color="#fbbf24" fill="#fbbf24" />
                                            <Text style={styles.ratingText}>{rec.rating?.split('/')[0] || 'N/A'}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.sliderCardContent}>
                                        <Text style={styles.sliderTitle} numberOfLines={2}>{rec.title}</Text>
                                        <Text style={styles.sliderMeta}>{rec.year} • {rec.creator}</Text>

                                        <View style={styles.reasonBox}>
                                            <Text style={styles.reasonLabel}>Neden?</Text>
                                            <Text style={styles.sliderReason}>
                                                {rec.reason}
                                            </Text>
                                        </View>

                                        {/* Actions Section */}
                                        <View style={styles.sliderActions}>
                                            {selectedCategory === 'Music' ? (
                                                <View style={styles.musicButtonsRow}>
                                                    {/* Spotify */}
                                                    <TouchableOpacity
                                                        style={[styles.platformBtnIconOnly, { backgroundColor: '#1DB954' }]}
                                                        onPress={() => rec.external_links?.spotify
                                                            ? Linking.openURL(rec.external_links.spotify)
                                                            : openMusicLink('spotify', rec.title)}
                                                    >
                                                        <FontAwesome5 name="spotify" size={22} color="#fff" />
                                                    </TouchableOpacity>

                                                    {/* YouTube Music */}
                                                    <TouchableOpacity
                                                        style={[styles.platformBtnIconOnly, { backgroundColor: '#FF0000' }]}
                                                        onPress={() => rec.external_links?.youtube_music
                                                            ? Linking.openURL(rec.external_links.youtube_music)
                                                            : openMusicLink('youtube', rec.title)}
                                                    >
                                                        <FontAwesome5 name="play" size={20} color="#fff" solid />
                                                    </TouchableOpacity>

                                                    {/* YouTube */}
                                                    <TouchableOpacity
                                                        style={[styles.platformBtnIconOnly, { backgroundColor: '#FF0000' }]}
                                                        onPress={() => rec.external_links?.youtube
                                                            ? Linking.openURL(rec.external_links.youtube)
                                                            : Linking.openURL(`https://www.youtube.com/results?search_query=${encodeURIComponent(rec.title)}`)}
                                                    >
                                                        <FontAwesome5 name="youtube" size={22} color="#fff" />
                                                    </TouchableOpacity>

                                                    {/* Apple Music */}
                                                    <TouchableOpacity
                                                        style={[styles.platformBtnIconOnly, { backgroundColor: '#FA243C' }]}
                                                        onPress={() => rec.external_links?.apple
                                                            ? Linking.openURL(rec.external_links.apple)
                                                            : openMusicLink('apple', rec.title)}
                                                    >
                                                        <FontAwesome5 name="apple" size={22} color="#fff" />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : (
                                                // Standard links for Books/Movies if needed, or just external links
                                                rec.external_links && (
                                                    <>
                                                        {rec.external_links.spotify && (
                                                            <TouchableOpacity style={styles.iconBtn} onPress={() => Linking.openURL(rec.external_links!.spotify!)}>
                                                                <ExternalLink size={20} color="#1DB954" />
                                                            </TouchableOpacity>
                                                        )}
                                                        {rec.external_links.youtube && (
                                                            <TouchableOpacity style={styles.iconBtn} onPress={() => Linking.openURL(rec.external_links!.youtube!)}>
                                                                <ExternalLink size={20} color="#FF0000" />
                                                            </TouchableOpacity>
                                                        )}
                                                    </>
                                                )
                                            )}
                                        </View>
                                    </View>
                                </Animated.View>
                            );
                        })}
                    </Animated.ScrollView>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Floating Action Button */}
            <View style={styles.fabContainer}>
                <TouchableOpacity
                    style={[styles.fab, { backgroundColor: dominantColor }]}
                    onPress={handleBackHome}
                    activeOpacity={0.9}
                >
                    <Text style={styles.fabText}>Yeni Tarama Başlat</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    scrollView: {
        flex: 1,
    },
    navHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        padding: 8,
        marginRight: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 50,
    },
    logoText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        letterSpacing: 0.5,
    },
    analysisSection: {
        paddingHorizontal: 24,
        marginBottom: 32,
    },
    moodTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: 12,
        lineHeight: 34,
    },
    moodDescription: {
        fontSize: 15,
        color: '#a3a3a3',
        lineHeight: 22,
        marginBottom: 16,
    },
    demographicsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
        borderWidth: 1,
        borderColor: '#333',
    },
    tagText: {
        color: '#d4d4d4',
        fontSize: 13,
        fontWeight: '500',
    },
    statsMixedContainer: {
        backgroundColor: '#111',
        marginHorizontal: 0,
        paddingVertical: 24,
        paddingHorizontal: 24,
        marginBottom: 32,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#222',
    },
    statsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 20,
    },
    keyStatsCol: {
        width: '35%',
        justifyContent: 'center',
        gap: 20,
    },
    statBox: {

    },
    statValueBig: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 2,
    },
    statValueSmall: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ccc',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    chartCol: {
        flex: 1,
        justifyContent: 'center',
        gap: 12,
    },
    barRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    barLabel: {
        width: 65,
        color: '#bbb',
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'right',
    },
    track: {
        flex: 1,
        height: 6,
        backgroundColor: '#333',
        borderRadius: 3,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 3,
    },
    recommendationsSection: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 24,
        gap: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    sliderContent: {
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    sliderCard: {
        width: CARD_WIDTH,
        backgroundColor: '#151515',
        borderRadius: 24,
        marginRight: SPACING,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#222',
        // Increased height to prevent overflow with vertical poster and text
        height: 650,
    },
    cardImageContainer: {
        // Vertical Poster Aspect Ratio
        height: 400, // Roughly 2:3 relative to width
        width: '100%',
        backgroundColor: '#222',
        position: 'relative',
    },
    sliderImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    posterPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    posterPlaceholderTitle: {
        fontSize: 24,
        fontWeight: '900',
        marginTop: 20,
        textAlign: 'center',
        lineHeight: 30,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    ratingOnImage: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '800',
    },
    sliderCardContent: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    sliderTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
        lineHeight: 26,
        marginBottom: 4,
    },
    sliderMeta: {
        fontSize: 13,
        color: '#888',
        marginBottom: 12,
        fontWeight: '500',
    },
    reasonBox: {
        backgroundColor: '#1f1f1f',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
    },
    reasonLabel: {
        fontSize: 10,
        color: '#666',
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    sliderReason: {
        fontSize: 13,
        color: '#ccc',
        lineHeight: 18,
    },
    sliderActions: {
        marginTop: 'auto',
    },
    musicButtonsRow: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'flex-start',
    },
    platformBtnIconOnly: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    platformBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        gap: 6,
    },
    platformBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },
    iconBtn: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 50,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    fab: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    fabText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '800',
    },
});
