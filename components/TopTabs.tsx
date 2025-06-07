import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './Home';
import Info from './Info';
import Camera from './Camera';

const Tab = createMaterialTopTabNavigator();

export function TopTabs() {
  return (
    <View style={styles.tabsContainer}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: '#000'},
          tabBarLabelStyle: {color: '#fff'},
          tabBarIndicatorStyle: {backgroundColor: '#fff'},
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Camera" component={Camera} />
        <Tab.Screen name="Info" component={Info} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flex: 1,
    marginBottom: 65,
  },
});
