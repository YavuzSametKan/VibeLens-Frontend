import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Check, RotateCcw } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
    const router = useRouter();
    const [facing, setFacing] = useState<CameraType>('front');
    const [permission, requestPermission] = useCameraPermissions();
    const [capturedPhoto, setCapturedPhoto] = useState<{ uri: string; facing: CameraType } | null>(null);
    const cameraRef = useRef<CameraView>(null);

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.8,
                    base64: false,
                });
                if (photo) {
                    setCapturedPhoto({ uri: photo.uri, facing });
                }
            } catch (error) {
                console.error('Error taking picture:', error);
                Alert.alert('Hata', 'Fotoğraf çekilirken bir hata oluştu.');
            }
        }
    };

    const handleRetake = () => {
        setCapturedPhoto(null);
    };

    const handleConfirm = () => {
        if (capturedPhoto) {
            setCapturedPhoto(capturedPhoto.uri);
            router.push('/analyzing');
        }
    };

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissionText}>Kamera erişimi kontrol ediliyor...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <View style={styles.permissionContainer}>
                    <Camera size={64} color="#22d3ee" strokeWidth={2} />
                    <Text style={styles.permissionTitle}>Kamera İzni Gerekli</Text>
                    <Text style={styles.permissionText}>
                        Ruh halinizi analiz edebilmek için kamera erişimine ihtiyacımız var.
                    </Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                        <Text style={styles.permissionButtonText}>İzin Ver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backButtonAlt} onPress={() => router.back()}>
                        <Text style={styles.backButtonAltText}>Geri Dön</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Preview mode
    if (capturedPhoto) {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: capturedPhoto.uri }}
                    style={[
                        styles.preview,
                        capturedPhoto.facing === 'front' && { transform: [{ scaleX: -1 }] }
                    ]}
                />

                <View style={styles.previewOverlay}>
                    <TouchableOpacity style={styles.backButton} onPress={handleRetake}>
                        <ArrowLeft size={24} color="#ffffff" />
                    </TouchableOpacity>

                    <View style={styles.previewActions}>
                        <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
                            <RotateCcw size={28} color="#ffffff" strokeWidth={2.5} />
                            <Text style={styles.actionButtonText}>Tekrar Çek</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Check size={28} color="#000000" strokeWidth={3} />
                            <Text style={styles.confirmButtonText}>Onayla ve Analiz Et</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    // Camera mode
    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={facing}
            />

            {/* Overlay is now OUTSIDE of CameraView */}
            <View style={StyleSheet.absoluteFill}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color="#ffffff" />
                </TouchableOpacity>

                <View style={styles.guideContainer}>
                    <View style={styles.faceGuide} />
                    <Text style={styles.guideText}>
                        Yüzünüzü çerçeveye yerleştirin
                    </Text>
                </View>

                <View style={styles.cameraControls}>
                    <TouchableOpacity
                        style={styles.flipButton}
                        onPress={toggleCameraFacing}
                    >
                        <RotateCcw size={28} color="#ffffff" strokeWidth={2.5} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>

                    <View style={styles.flipButton} />
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
    camera: {
        flex: 1,
    },
    cameraOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
        padding: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    guideContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    faceGuide: {
        width: 280,
        height: 360,
        borderRadius: 180,
        borderWidth: 3,
        borderColor: '#22d3ee',
        borderStyle: 'dashed',
    },
    guideText: {
        marginTop: 24,
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
    },
    cameraControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 50,
        paddingHorizontal: 20,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    captureButtonInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#ffffff',
    },
    flipButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        flex: 1,
        resizeMode: 'cover',
    },
    previewOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    previewActions: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        gap: 12,
    },
    retakeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderWidth: 2,
        borderColor: '#ffffff',
        gap: 10,
    },
    confirmButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 100,
        backgroundColor: '#22d3ee',
        gap: 10,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    permissionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 24,
        marginBottom: 12,
        textAlign: 'center',
    },
    permissionText: {
        fontSize: 16,
        color: '#9ca3af',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    permissionButton: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 100,
        backgroundColor: '#22d3ee',
        marginBottom: 12,
    },
    permissionButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    backButtonAlt: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    backButtonAltText: {
        fontSize: 16,
        color: '#9ca3af',
    },
});
