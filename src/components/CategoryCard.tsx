import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
    title: string;
    icon: LucideIcon;
    description: string;
    color: string;
    isSelected: boolean;
    onPress: () => void;
}

export function CategoryCard({
    title,
    icon: Icon,
    description,
    color,
    isSelected,
    onPress
}: CategoryCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.card,
                isSelected && { borderColor: color, borderWidth: 2 },
            ]}
        >
            <View style={[styles.iconContainer, { borderColor: color }]}>
                <Icon size={32} color={color} strokeWidth={2.5} />
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        borderRadius: 24,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    iconContainer: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 6,
    },
    description: {
        fontSize: 13,
        color: '#9ca3af',
        textAlign: 'center',
        lineHeight: 18,
    },
});
