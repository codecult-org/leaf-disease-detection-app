import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Platform, StatusBar} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {ImagePicker} from './components/ImagePicker';

const App = () => {
  const [file, setFile] = useState<Asset | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ImagePicker
        file={file}
        setFile={setFile}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
