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

function CulcDistanceMeter(lat1, lng1, lat2, lng2) {
  const R = Math.PI / 180;
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  const distance = 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)
    + Math.sin(lat1) * Math.sin(lat2)) * 1000;
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

function GetButton(placeSeq, setButtonComponent) {
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
        UpdateGetPlace(placeSeq);
        PlayAudio(medalGetAudio);
        setButtonComponent(AlreadyGotButton());
      }}
    />
  );
}

function UpdateGetPlace(placeSeq) {
  const _sqlUpdate = 'UPDATE place_master SET get_flg = 1, got_at = ? WHERE place_seq = ?';
  // 更新はいったん止めておく
  const sqlUpdate = 'UPDATE place_master SET get_flg = 1, got_at = ? WHERE place_seq = 12456';
  const db = SQLite.openDatabase('test.db');
  db.transaction((tx) => {
    tx.executeSql(
      _sqlUpdate,
      [Date.now(), placeSeq],
      (_, res) => {
        // firebaseに連携
      },
    );
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
  const { placeObj } = props;
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
          } else if (distMeter < 50 ** 10) {
            setButtonComponent(GetButton(placeObj.place_seq, setButtonComponent));
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
        <Text>約 {distance}</Text>
      </View>
      <View style={[styles.views, styles.getButtonComponent]}>
        {buttonComponent}
      </View>
    </ScrollView>
  );
}

PlaceModal.propTypes = {
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
