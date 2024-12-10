import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TopTabs} from './components/TopTabs';

export default function App() {
  return (
    <NavigationContainer>
      <TopTabs />
    </NavigationContainer>
  );
}
