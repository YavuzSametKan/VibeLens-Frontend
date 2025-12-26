import React, { useEffect, useState } from 'react';
import { Text, TextStyle } from 'react-native';

interface TypewriterTextProps {
    text: string;
    style?: TextStyle;
    speed?: number;
    isActive: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    style,
    speed = 15,
    isActive
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setDisplayedText('');
            setCurrentIndex(0);
            return;
        }

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed, isActive]);

    useEffect(() => {
        if (isActive && currentIndex === 0) {
            setDisplayedText('');
        }
    }, [isActive]);

    return (
        <Text style={style}>
            {displayedText}
            {isActive && currentIndex < text.length && (
                <Text style={{ opacity: 0.5 }}>▌</Text>
            )}
        </Text>
    );
};
