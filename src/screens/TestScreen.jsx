import React, { useState, useEffect, useRef } from 'react';
import {
  Platform, Text, View, StyleSheet, TouchableOpacity, Animated, Button,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Icon from '../components/Icon';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);
const AnimIconCustom = Animated.createAnimatedComponent(FontAwesome5);

export default function TestScreen() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animValCustom = useRef(new Animated.Value(1)).current;
  const customFadeIn = () => {
    Animated.timing(animValCustom, { toValue: 1, duration: 500, useNativeDriver: false }).start();
  };
  const customFadeOut = () => {
    Animated.timing(animValCustom, { toValue: 0, duration: 500, useNativeDriver: false }).start();
  };

  const interPolateColor = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['#999', '#B11'],
  });

  const interPolateSize = animatedValue.interpolate({
    inputRange: [0, 50, 100, 150],
    outputRange: [28, 38, 34, 28],
  });

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };


  return (
    <View>
      <TouchableOpacity onPress={customFadeOut}>
        <AnimIconCustom style={{ opacity: animValCustom }} name="crown" size={32} />
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => {
          Animated.timing(animatedValue, {
            toValue: 150,
            duration: 200,
            useNativeDriver: false,
          }).start();
        }}
      >
        <Animated.Text style={{color: interPolateColor}}>
          <AnimatedIcon name="medal-outline" size={32} style={{fontSize: interPolateSize}} />
        </Animated.Text>
      </TouchableOpacity>


      <Animated.View
        style={[styles.fadingContainer, { opacity: fadeAnim }]}
      >
        <Text style={[styles.fadingText]}>Fading View!</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In View" onPress={fadeIn} />
        <Button title="Fade Out View" onPress={fadeOut} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});
