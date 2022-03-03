import React, { useState, useEffect, useRef } from 'react';
import {
  Linking, Text, View, StyleSheet, TouchableOpacity, Animated, Button,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Icon from '../components/Icon';
import TweetButton from '../components/TweetButton';
const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);
const AnimIconCustom = Animated.createAnimatedComponent(FontAwesome5);

export default function TestScreen() {

  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL('https://twitter.com/home');

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL('https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fmomoclomap.com%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=%E3%80%8C%E5%91%B3%E5%9C%A8(%E3%81%82%E3%81%9C)%E3%80%8D%E3%81%AB%E8%A1%8C%E3%81%8D%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81%20%7C%20%E3%82%82%E3%82%82%E3%82%AF%E3%83%AD%E8%81%96%E5%9C%B0%E5%B7%A1%E7%A4%BC%E3%83%9E%E3%83%83%E3%83%97%0A%23MomocloMap&url=https%3A%2F%2Fmomoclomap.com%2Fsingle%2F%3Fid%3D5630');
    }
  };

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

      <TweetButton
        tweetText="日本語 https://www.google.com/webhp"
        size={16}
      />
      <Button title="#test" onPress={handlePress} />

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
