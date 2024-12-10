import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#4fa94d',
  text: '#FFFFFF',
  error: '#CF6679',
  border: '#2C2C2C',
};

const Info = () => {
  const accuracy = 74.9576985836029;

  const diseases = {
    potato: ['Potato healthy', 'Potato Late blight', 'Potato Early blight'],
    pepper: ['Pepper bell healthy', 'Pepper bell Bacterial spot'],
    tomato: [
      'Tomato healthy',
      'Tomato Leaf Mold',
      'Tomato Spider mites Two spotted spider mite',
      'Tomato Early blight',
      'Tomato YellowLeaf Curl Virus',
      'Tomato Late blight',
      'Tomato Target Spot',
      'Tomato Bacterial spot',
      'Tomato mosaic virus',
      'Tomato Septoria leaf spot',
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.accuracyCard}>
            <Text style={styles.accuracyText}>
              Model Accuracy: {accuracy.toFixed(2)}%
            </Text>
          </View>
        </View>
        <Text style={styles.title}>Type of leaf identification supported:</Text>
        <View style={styles.grid}>
          {Object.entries(diseases).map(([category, list]) => (
            <View key={category} style={styles.card}>
              <Text style={styles.categoryTitle}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              {list.map((disease, idx) => (
                <Text key={idx} style={styles.diseaseText}>
                  {disease}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <Text
          style={styles.sourceText}
          onPress={() =>
            Linking.openURL(
              'https://www.kaggle.com/datasets/emmarex/plantdisease/data',
            )
          }>
          Dataset source: kaggle/plantdisease
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: darkTheme.text,
    marginBottom: 16,
  },
  accuracyCard: {
    backgroundColor: darkTheme.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: darkTheme.border,
  },
  accuracyText: {
    fontSize: 20,
    fontWeight: '600',
    color: darkTheme.primary,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: darkTheme.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: darkTheme.border,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: darkTheme.primary,
    marginBottom: 12,
  },
  diseaseText: {
    fontSize: 16,
    color: darkTheme.text,
    marginBottom: 8,
  },
  sourceText: {
    textAlign: 'center',
    color: darkTheme.primary,
    marginTop: 24,
    textDecorationLine: 'underline',
  },
});

export default Info;
