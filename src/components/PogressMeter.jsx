import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  bool, number, shape, string,
} from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProgressMeter(prop) {
  const { parsentage } = prop;
  return (
    <LinearGradient
      style={{
        height: 8,
        width: 40,
        borderWidth: 1,
        borderColor: '#040404',
        borderRadius: 2,
        marginTop: 4,
      }}
      colors={['#000000', '#FFFFFF']}
      start={{ x: 0.5, y: 0.5 }}
      end={{ x: 0.6, y: 0.5 }}
    />
  );
}
