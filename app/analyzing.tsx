import { analyzeMood } from '@/src/services/moodApi';
import { useAppStore } from '@/src/store/useAppStore';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

export default function AnalyzingScreen() {
    const router = useRouter();
    const { capturedPhoto, selectedCategory, setMoodData, setIsLoading } = useAppStore();

    const pulseAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start animations
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    useEffect(() => {
        const performAnalysis = async () => {
            if (!capturedPhoto || !selectedCategory) {
                router.replace('/');
                return;
            }

            setIsLoading(true);

            try {
                const result = await analyzeMood(capturedPhoto, selectedCategory);
                setMoodData(result);
                router.replace('/results');
            } catch (error) {
                console.error('Analysis error:', error);
                alert(error instanceof Error ? error.message : 'Analiz sırasında bir hata oluştu.');
                router.back();
            } finally {
                setIsLoading(false);
            }
        };

        performAnalysis();
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.8],
    });

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.iconContainer,
                        {
                            transform: [{ scale: pulseAnim }, { rotate: spin }],
                        },
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.glow,
                            {
                                opacity: glowOpacity,
                            },
                        ]}
                    />
                    <Sparkles size={64} color="#22d3ee" strokeWidth={2} />
                </Animated.View>

                <Text style={styles.title}>Ruh Haliniz Analiz Ediliyor...</Text>
                <Text style={styles.subtitle}>
                    Yapay zeka duygularınızı inceliyor
                </Text>

                <View style={styles.dotsContainer}>
                    <View style={[styles.dot, styles.dot1]} />
                    <View style={[styles.dot, styles.dot2]} />
                    <View style={[styles.dot, styles.dot3]} />
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    iconContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    glow: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#22d3ee',
        opacity: 0.3,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#9ca3af',
        textAlign: 'center',
        marginBottom: 40,
    },
    dotsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#22d3ee',
    },
    dot1: {
        opacity: 0.4,
    },
    dot2: {
        opacity: 0.7,
    },
    dot3: {
        opacity: 1,
    },
});
