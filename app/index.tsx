import { CategoryCard } from '@/src/components/CategoryCard';
import { MoodButton } from '@/src/components/MoodButton';
import { Category, useAppStore } from '@/src/store/useAppStore';
import { router } from 'expo-router';
import { Book, Film, Music, Tv } from 'lucide-react-native';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CategoryConfig {
    id: Category;
    icon: any;
    description: string;
    color: string;
}

export default function HomeScreen() {
    const { selectedCategory, setSelectedCategory } = useAppStore();
    const insets = useSafeAreaInsets();

    const handleScanPress = () => {
        if (!selectedCategory) {
            Alert.alert("Seçim Gerekli", "Lütfen önce bir kategori seçin.");
            return;
        }
        router.push('/camera');
    };

    const categories: CategoryConfig[] = [
        {
            id: 'Movies',
            icon: Film,
            description: 'Hislerine uygun\nfilmler bul',
            color: '#22d3ee' // cyan
        },
        {
            id: 'Series',
            icon: Tv,
            description: 'Her ruh hali için\ndiziler keşfet',
            color: '#e879f9' // magenta
        },
        {
            id: 'Music',
            icon: Music,
            description: 'Mükemmel\nsoundtrack\'i bul',
            color: '#fb923c' // orange
        },
        {
            id: 'Books',
            icon: Book,
            description: 'İçini ısıtan\nhikayeleri oku',
            color: '#4ade80' // green
        },
    ];

    const categoryLabels: Record<Category, string> = {
        'Movies': 'Filmler',
        'Series': 'Diziler',
        'Music': 'Müzik',
        'Books': 'Kitaplar',
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>VibeLens</Text>
                    <Text style={styles.subtitle}>
                        Ruh haline uygun içerikler keşfet.
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Bir Kategori Seç</Text>

                <View style={styles.grid}>
                    {categories.map((cat) => (
                        <View key={cat.id} style={styles.gridItem}>
                            <CategoryCard
                                title={categoryLabels[cat.id]}
                                icon={cat.icon}
                                description={cat.description}
                                color={cat.color}
                                isSelected={selectedCategory === cat.id}
                                onPress={() => setSelectedCategory(cat.id)}
                            />
                        </View>
                    ))}
                </View>

                <View style={styles.buttonContainer}>
                    <MoodButton onPress={handleScanPress} disabled={!selectedCategory} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        marginBottom: 24,
        marginTop: 8,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#ffffff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#9ca3af',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 16,
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        height: '47%',
        marginBottom: 12,
    },
    buttonContainer: {
        paddingBottom: 20,
    },
});
