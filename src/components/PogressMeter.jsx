import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  bool, number, shape, string,
} from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProgressMeter(prop) {
  const { persentage } = prop;
  const endX = persentage + 0.05;
  return (
    <LinearGradient
      style={{
        height: 8,
        width: 40,
        borderWidth: 1,
        borderColor: '#777777',
        borderRadius: 0,
        marginTop: 5,
      }}
      colors={['#777777', '#FFFFFF']}
      start={{ x: persentage, y: 0 }}
      end={{ x: endX, y: 0 }}
    />
  );
}
