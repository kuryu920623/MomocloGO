import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import {number, shape} from 'prop-types';
import * as SQLite from 'expo-sqlite';
import { Audio } from 'expo-av';

async function PlayAudio(file) {
  const soundObj = new Audio.Sound();
  await soundObj.loadAsync(file);
  await soundObj.playAsync();
}

export default function AwardModal(props) {
  const { obj, getCount, targetCount } = props;
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.views]}>
        <Text style={styles.titleText}>{obj.title}</Text>
      </View>
      {/* 取得済みの場合ツイッター連携アイコン出したい */}
      <View style={[styles.views]}>
        <Text>{obj.description}</Text>
      </View>
      <View style={styles.progressView}>
        <Text style={styles.progressText}>{`${Math.min(getCount, targetCount)} / ${targetCount}`}</Text>
      </View>
    </ScrollView>
  );
}

AwardModal.propTypes = {
  obj: shape().isRequired,
  getCount: number.isRequired,
  targetCount: number.isRequired,
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
  progressView: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 25,
  },
});
