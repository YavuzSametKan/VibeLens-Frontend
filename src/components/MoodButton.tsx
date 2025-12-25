import { ScanFace } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface MoodButtonProps {
    onPress: () => void;
    disabled?: boolean;
}

export function MoodButton({ onPress, disabled }: MoodButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[styles.button, disabled && styles.buttonDisabled]}
        >
            <ScanFace size={24} color="#000000" strokeWidth={2.5} />
            <Text style={styles.text}>Ruh Halimi Tara</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 100,
        marginHorizontal: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    buttonDisabled: {
        opacity: 0.4,
    },
    text: {
        marginLeft: 12,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
});
