import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase';

import { firebaseConfig } from './env';

import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LogInScreen';
import MainScreen from './src/screens/MainScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Medals" component={MainScreen} />
      <Tab.Screen name="Map" component={MainScreen} />
      <Tab.Screen name="List" component={MainScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerStyle: { backgroundColor: '#467FD3' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerTintColor: '#FFFFFF',
          headerBackTitle: 'Back',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="LogIn" component={LogInScreen} options={{ title: 'Log In' }} />
        <Stack.Screen name="Main" component={TabScreen} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
