import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  bool, number, shape, string,
} from 'prop-types';
import * as SQLite from 'expo-sqlite';
import {
  FontAwesome5, MaterialCommunityIcons, Ionicons, MaterialIcons,
} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';

import Button from '../components/Button';
import ProgressMeter from '../components/PogressMeter';

export default function AwardsScreen() {
  return (
    <ScrollView>
      <LinearGradient
        style={styles.container}
        colors={['rgba(234,246,255,0.5)', 'rgba(183,225,254,0.3)']}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.6, y: 0.6 }}
      >

        <View style={[styles.views, styles.rankingView]}>
          <View style={styles.leftLabelView}>
            <FontAwesome5 name="crown" size={48} color="#ffcc33" />
            <Text style={styles.rankLabelText}> Ranking</Text>
          </View>
          <View style={styles.rightLabelView}>
            <Text style={styles.rankText}> 123</Text>
            <Text style={styles.rankLabelText}> / 1234</Text>
          </View>
        </View>

        <View style={[styles.views, styles.rankingView]}>
          <View style={styles.leftLabelView}>
            <MaterialCommunityIcons name="medal-outline" size={48} color="#ffcc33" />
            <Text style={styles.rankLabelText}> Medals</Text>
          </View>
          <View style={styles.rightLabelView}>
            <Text style={styles.rankText}> 234</Text>
            <Text style={styles.rankLabelText}> / 2345</Text>
          </View>
        </View>

        <View style={styles.awardsRowView}>
          <View style={styles.awardsColView}>
            <FontAwesome5 name="award" size={48} color="#C47222" />
            <ProgressMeter persentage={1} />
          </View>
          <View style={styles.awardsColView}>
            <FontAwesome5 name="award" size={48} color="rgba(200,200,200,0.3)" />
            <ProgressMeter persentage={0.6} />
          </View>
          <View style={styles.awardsColView}>
            <FontAwesome5 name="award" size={48} color="rgba(200,200,200,0.3)" />
            <ProgressMeter persentage={0.3} />
          </View>
          <View style={styles.awardsColView}>
            <Ionicons name="restaurant" size={48} color="#C47222" />
            <ProgressMeter persentage={1} />
          </View>
        </View>

        <View style={styles.awardsRowView}>
          <View style={styles.awardsColView}>
            <Ionicons name="restaurant" size={48} color="#C0C0C0" />
            <ProgressMeter persentage={1} />
          </View>
          <View style={styles.awardsColView}>
            <Ionicons name="restaurant" size={48} color="rgba(200,200,200,0.3)" />
            <ProgressMeter persentage={0.6} />
          </View>
        </View>

      </LinearGradient>
    </ScrollView>
  );
}

AwardsScreen.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 35,
  },
  views: {
    marginBottom: 20,
    alignItems: 'center',
  },
  rankingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftLabelView: {
    alignItems: 'center',
    width: '50%',
    paddingLeft: 30,
  },
  rightLabelView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '50%',
    paddingRight: 30,
  },
  rankLabelText: {
    fontSize: 16,
  },
  rankText: {
    fontSize: 40,
  },

  awardsContainer: {
    marginTop: 15,
  },
  awardsRowView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  awardsColView: {
    width: '25%',
    alignItems: 'center',
  },
});
