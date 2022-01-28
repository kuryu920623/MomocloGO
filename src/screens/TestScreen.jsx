import React, { useState, useEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import * as Location from 'expo-location';
import * as SQLite from 'expo-sqlite';
import Icon from '../components/Icon';

import SVG, { SvgXml, G, Path } from 'react-native-svg';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

export default function TestScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const interPolateColor = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['#999', '#B11'],
  });

  const interPolateSize = animatedValue.interpolate({
    inputRange: [0, 50, 100, 150],
    outputRange: [28, 38, 34, 28],
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const db = SQLite.openDatabase('test.db');

  return (
    <View>

      <Text>{text}</Text>
      <Icon name='eggplant' size={50} color='#123456' />
      <TouchableOpacity onPress={() => {
        Animated.timing(animatedValue, {
          toValue: 150,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }}>
        <Animated.Text style={{color: interPolateColor}}>
          <AnimatedIcon name="medal-outline" size={32} style={{fontSize: interPolateSize}} />
        </Animated.Text>
      </TouchableOpacity>


    </View>
  );
}
