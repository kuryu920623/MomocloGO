import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import {
  bool, number, shape, string,
} from 'prop-types';
import * as SQLite from 'expo-sqlite';

import Button from '../components/Button';

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

export default function PlaceModal(props) {
  const { placeObj } = props;
  const [distance, setDistance] = useState('');
  const [buttonView, setButtonView] = useState(null);

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
          if (!result.rows._array[0].get_flg && distMeter < 100) {
            setButtonView(
              <View style={[styles.views, styles.getButtonView]}>
                <Button>GET</Button>
              </View>
            );
          }
        },
      );
    });
    setButtonView(null);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.views]}>
        <Text style={styles.titleText}>{placeObj.name}</Text>
      </View>
      <View style={[styles.views]}>
        <Text>{placeObj.detail}</Text>
      </View>
      <View style={[styles.views, styles.distanceView]}>
        <Text>約 {distance}</Text>
      </View>
      {buttonView}
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
  getButtonView: {
    alignItems: 'center',
  },
});
