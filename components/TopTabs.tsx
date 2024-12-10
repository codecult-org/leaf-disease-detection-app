import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './Home';
import Info from './Info';

const Tab = createMaterialTopTabNavigator();

export function TopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#000'},
        tabBarLabelStyle: {color: '#fff'},
        tabBarIndicatorStyle: {backgroundColor: '#fff'},
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Info" component={Info} />
    </Tab.Navigator>
  );
}
