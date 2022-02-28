import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import {
  number, shape, string, func,
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

function CulcDistanceMeter(lat1, lng1, lat2, lng2) {
  const R = Math.PI / 180;
  const lat1rad = lat1 * R;
  const lng1rad = lng1 * R;
  const lat2rad = lat2 * R;
  const lng2rad = lng2 * R;
  const distance = 6371 * Math.acos(Math.cos(lat1rad)
    * Math.cos(lat2rad) * Math.cos(lng2rad - lng1rad)
    + Math.sin(lat1rad) * Math.sin(lat2rad)) * 1000;
  return distance;
}

function AlreadyGotButton() {
  return (
    <Button
      label="取得済み"
      labelStyle={{
        fontSize: 24,
      }}
      containerStyle={{
        backgroundColor: 'gray',
      }}
      onPress={() => { PlayAudio(medalCantGetAudio); }}
    />
  );
}

function GetButton(placeSeq, setButtonComponent, resetMap) {
  return (
    <Button
      label={<MaterialCommunityIcons name="medal-outline" size={32} color="black" />}
      labelStyle={{
        fontSize: 24,
        height: null,
      }}
      containerStyle={{
        backgroundColor: '#ffbc38',
      }}
      onPress={() => {
        UpdateGetPlace(placeSeq, resetMap);
        PlayAudio(medalGetAudio);
        setButtonComponent(AlreadyGotButton());
        resetMap(Math.random());
      }}
    />
  );
}

function UpdateGetPlace(placeSeq) {
  const sqlUpdate = 'UPDATE place_master SET get_flg = 1, got_at = ? WHERE place_seq = ?';
  const db = SQLite.openDatabase('test.db');
  db.transaction((tx) => {
    tx.executeSql(sqlUpdate, [Date.now(), placeSeq]);
  });
}

function farFromPlaceButton() {
  return (
    <Button
      label={<MaterialCommunityIcons name="medal-outline" size={32} color="black" />}
      labelStyle={{
        fontSize: 18,
        height: null,
      }}
      containerStyle={{
        backgroundColor: 'gray',
      }}
      onPress={() => { PlayAudio(medalCantGetAudio); }}
    />
  );
}

export default function PlaceModal(props) {
  const { placeObj, resetMap } = props;
  const [distance, setDistance] = useState('');
  const [buttonComponent, setButtonComponent] = useState(null);

  useEffect(async () => {
    const tmp = await Location.getCurrentPositionAsync({});
    const distMeter = CulcDistanceMeter(
      placeObj.latitude,
      placeObj.longitude,
      tmp.coords.latitude,
      tmp.coords.longitude,
    );
    let dist;
    if (distMeter > 1000) {
      const distKM = (distMeter / 1000).toFixed(1);
      dist = `${distKM.toString()} km`;
    } else {
      dist = `${distMeter.toFixed().toString()} m`;
    }
    setDistance(dist);

    const sqlGetFlg = 'SELECT get_flg FROM place_master WHERE place_seq = ?;';
    const db = SQLite.openDatabase('test.db');
    db.transaction((tx) => {
      tx.executeSql(
        sqlGetFlg,
        [placeObj.place_seq],
        (_, result) => {
          if (result.rows._array[0].get_flg) {
            setButtonComponent(AlreadyGotButton());
          } else if (distMeter < 5000) {
            setButtonComponent(GetButton(placeObj.place_seq, setButtonComponent, resetMap));
          } else {
            setButtonComponent(farFromPlaceButton());
          }
        },
      );
    });
    setButtonComponent(null);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.views]}>
        <Text style={styles.titleText}>{placeObj.name}</Text>
      </View>
      {/* 取得済みの場合ツイッター連携アイコン出したい */}
      <View style={[styles.views]}>
        <Text>{placeObj.detail}</Text>
      </View>
      <View style={[styles.views, styles.distanceView]}>
        <Text>{`約 ${distance}`}</Text>
      </View>
      <View style={[styles.views, styles.getButtonComponent]}>
        {buttonComponent}
      </View>
    </ScrollView>
  );
}

PlaceModal.propTypes = {
  resetMap: func.isRequired,
  placeObj: shape({
    latitude: number,
    longitude: number,
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
