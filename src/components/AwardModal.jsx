import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import {
  bool, number, shape, string,
} from 'prop-types';
import * as SQLite from 'expo-sqlite';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import Button from './Button';

const medalGetAudio = require('../../assets/sounds/medal_get.mp3');
const medalCantGetAudio = require('../../assets/sounds/medal_cannot_get.mp3');

async function PlayAudio(file) {
  const soundObj = new Audio.Sound();
  await soundObj.loadAsync(file);
  await soundObj.playAsync();
}

export default function AwardModal() {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.views]}>
        <Text style={styles.titleText}>称号の名前</Text>
      </View>
      {/* 取得済みの場合ツイッター連携アイコン出したい */}
      <View style={[styles.views]}>
        <Text>称号の取得条件とか進捗状況とか</Text>
      </View>
    </ScrollView>
  );
}

AwardModal.propTypes = {
  placeObj: shape({
    latitude: number,
    longitude: number,
    get_flg: bool,
    name: string,
    detail: string,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 35,
  },
  views: {
    marginBottom: 15,
  },
  titleText: {
    fontSize: 24,
  },
  distanceView: {
    alignItems: 'flex-end',
  },
  getButtonComponent: {
    alignItems: 'center',
  },
});
