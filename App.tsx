import * as React from 'react';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import client from './src/common/apolloClient';
import ZellerCustomers from './src/components/zellerCustomers';
import SplashScreen from './src/components/splashScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="ZellerCustomers" component={ZellerCustomers} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
