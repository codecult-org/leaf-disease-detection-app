import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TopTabs} from './components/TopTabs';
import {View, StyleSheet} from 'react-native';
import StickyWebBar from './components/StickyWebBar';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <TopTabs />
      </NavigationContainer>
      <StickyWebBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
