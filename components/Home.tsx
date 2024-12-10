import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {ImagePicker} from './ImagePicker';

interface ApiResponse {
  disease: string;
}

const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#4fa94d',
  text: '#FFFFFF',
  error: '#CF6679',
  border: '#2C2C2C',
};

const Home = () => {
  const [file, setFile] = useState<Asset | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      // Log the file object being sent
      const fileObject = {
        uri:
          Platform.OS === 'android'
            ? file.uri
            : file.uri?.replace('file://', ''),
        type: file.type || 'image/jpeg',
        name: file.fileName || 'image.jpg',
      };
      console.log('File object:', fileObject);

      formData.append('file', {
        uri:
          Platform.OS === 'android'
            ? file.uri
            : file.uri?.replace('file://', ''),
        type: file.type || 'image/jpeg',
        name: file.fileName || 'image.jpg',
      } as any);

      console.log('Making request to server...');
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

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`,
        );
      }

      setResult(data);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to upload image';
      console.error('Upload error:', error);
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Leaf Disease Detection</Text>
      </View>
      <ImagePicker
        file={file}
        setFile={setFile}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpload}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Detect Disease</Text>
          )}
        </TouchableOpacity>
      </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.text,
    marginVertical: 16,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    backgroundColor: darkTheme.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: darkTheme.text,
    fontSize: 16,
    fontWeight: '600',
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

export default Home;
