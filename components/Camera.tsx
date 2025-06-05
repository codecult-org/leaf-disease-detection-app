import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {launchCamera, CameraOptions, Asset} from 'react-native-image-picker';
import GoogleCamera from '../assets/google-camera.svg';

const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#4fa94d',
  text: '#FFFFFF',
  error: '#CF6679',
  border: '#2C2C2C',
};

const Camera = () => {
  const [file, setFile] = useState<Asset | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      saveToPhotos: true,
      includeBase64: false,
      quality: 0.8,
    };

    try {
      const result = await launchCamera(options);

      if (result.didCancel) {
        return;
      }
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage || 'Camera error');
        return;
      }
      if (result.assets && result.assets[0]) {
        const capturedFile = result.assets[0];
        setFile(capturedFile);
        setImageSrc(capturedFile.uri || null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      Alert.alert('Error', 'Please capture an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', {
        uri:
          Platform.OS === 'android'
            ? file.uri
            : file.uri?.replace('file://', ''),
        type: file.type || 'image/jpeg',
        name: file.fileName || 'image.jpg',
      } as any);

      const response = await fetch(
        'https://codecult-leaf-serveit.codecult.tech/checking',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`,
        );
      }

      setResult(data.disease || JSON.stringify(data));
    } catch (error: any) {
      setError(error.message || 'Failed to upload image');
      Alert.alert('Error', error.message || 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <GoogleCamera width={32} height={32} />
      </TouchableOpacity>
      {imageSrc && (
        <Image
          source={{uri: imageSrc}}
          style={styles.imagePreview}
          resizeMode="cover"
        />
      )}
      <TouchableOpacity
        style={[styles.uploadButton, {backgroundColor: darkTheme.primary}]}
        onPress={handleUpload}
        disabled={loading || !file}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Detect Disease</Text>
        )}
      </TouchableOpacity>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Disease: {result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme.background,
  },
  captureButton: {
    backgroundColor: darkTheme.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: 200,
  },
  uploadButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    width: 200,
  },
  buttonText: {
    color: darkTheme.text,
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 16,
  },
  resultContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: darkTheme.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: darkTheme.border,
  },
  resultText: {
    fontSize: 16,
    color: darkTheme.text,
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: darkTheme.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: darkTheme.error,
  },
  errorText: {
    color: darkTheme.error,
    fontSize: 16,
  },
});

export default Camera;
