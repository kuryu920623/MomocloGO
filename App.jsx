import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { LogBox } from 'react-native';

import { firebaseConfig } from './env';

import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LogInScreen';
import MapScreen from './src/screens/MapScreen';
import AwardsScreen from './src/screens/AwardsScreen';
import ListScreen from './src/screens/ListScreen';
import TestScreen from './src/screens/TestScreen';
import CopyDefaultDatabase from './src/utils/InitDataBase';

LogBox.ignoreLogs(['AsyncStorage has been extracted']);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function TabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="List"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarActiveBackgroundColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Awards"
        component={AwardsScreen}
        options={{ tabBarIcon: () => <FontAwesome5 name="award" size={28}/>, unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ tabBarIcon: () => <FontAwesome5 name="map" size={28}/> }}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{ tabBarIcon: () => <AntDesign  name="table" size={28}/>, unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Friends"
        component={TestScreen}
        options={{ tabBarIcon: () => <FontAwesome5  name="user-friends" size={28}/>, unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  CopyDefaultDatabase();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
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
