import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import client from './src/appollo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StackNavigator from './src/navigation/StackNavigator';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
