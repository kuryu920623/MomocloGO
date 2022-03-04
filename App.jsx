import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { LogBox } from 'react-native';

import { firebaseConfig } from './env';

import Loading from './src/components/Loading';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LogInScreen';
import MapScreen from './src/screens/MapScreen';
import AwardsScreen from './src/screens/AwardsScreen';
import ListScreen from './src/screens/ListScreen';
import TestScreen from './src/screens/TestScreen';
import FriendsSearchScreen from './src/screens/FriendSearchScreen';
import CopyDefaultDatabase from './src/utils/InitDataBase';

LogBox.ignoreLogs([
  'AsyncStorage has been extracted',
  'Setting a timer for a long period of time',
]);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackFriends = createStackNavigator();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function FriendsScreen() {
  return (
    <StackFriends.Navigator
      initialRouteName="Search"
      screenOptions={{
        headerStyle: { backgroundColor: '#467FD3' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF',
        headerBackTitle: 'Back',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <StackFriends.Screen name="FriendsSearch" component={FriendsSearchScreen} options={{ title: 'Search Friends' }} />
      <StackFriends.Screen name="FriendsAwards" component={AwardsScreen} options={{ title: 'Awards Friends' }} />
    </StackFriends.Navigator>
  );
}

function TabScreen() {
  // 聖地更新中ならローディング画面を返却する処理必要
  return (
    <>
      <Loading isLoading={false} />
      <Tab.Navigator
        initialRouteName="Map"
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
          options={{ tabBarIcon: () => <AntDesign  name="table" size={28}/> }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{ tabBarIcon: () => <FontAwesome5  name="user-friends" size={28}/>, headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  console.log('Load App');
  CopyDefaultDatabase();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
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
