import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';

interface ImagePickerProps {
  file: Asset | null;
  setFile: (file: Asset | null) => void;
  imageSrc: string | null;
  setImageSrc: (src: string | null) => void;
}

const requestPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Image Gallery Permission',
            message: 'App needs access to your image gallery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Image Gallery Permission',
            message: 'App needs access to your image gallery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.error('Permission request error:', err);
      return false;
    }
  }
  return true;
};

export const ImagePicker: React.FC<ImagePickerProps> = ({
  file,
  setFile,
  imageSrc,
  setImageSrc,
}) => {
  const handleFileChange = async () => {
    const hasPermission = await requestPermissions();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Please grant gallery access in app settings',
      );
      return;
    }

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.errorCode) {
        console.error('ImagePicker Error:', result.errorMessage);
        Alert.alert('Error', result.errorMessage || 'Unknown error');
        return;
      }

      if (result.assets && result.assets[0]) {
        const selectedFile = result.assets[0];

        // Ensure URI is valid, especially on Android
        const validUri =
          Platform.OS === 'android'
            ? selectedFile.uri?.startsWith('file://')
              ? selectedFile.uri
              : `file://${selectedFile.uri}`
            : selectedFile.uri;

        console.log('Selected Image Details:', {
          uri: validUri,
          type: selectedFile.type,
          fileName: selectedFile.fileName,
        });

        setFile(selectedFile);
        setImageSrc(validUri || null);
      }
    } catch (error) {
      console.error('Image selection error:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropzone} onPress={handleFileChange}>
        <Text style={styles.text}>Upload or Tap to Select</Text>
        <Text style={styles.subtext}>PNG or JPG</Text>
      </TouchableOpacity>

      {imageSrc && (
        <Image
          source={{uri: imageSrc}}
          style={styles.imagePreview}
          resizeMode="cover"
          onError={e => {
            console.error('Image load error:', e.nativeEvent);
            Alert.alert('Error', 'Could not load image');
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  dropzone: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
