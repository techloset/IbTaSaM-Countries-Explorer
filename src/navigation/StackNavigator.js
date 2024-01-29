import React from 'react';
import SCREENS from './Screens';
import StackNavigation from './StackNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.COUNTRIES_NAME}
      screenOptions={{headerShown: false}}>
      {StackNavigation?.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.screenName}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
}
