import React, { useState, useEffect, memo } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { func } from 'prop-types';
import * as SQLite from 'expo-sqlite';

import PlaceModal from '../components/PlaceModal';

const MainMap = memo((props) => {
  const { setModalBlock, setModalVisible } = props;
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 35.665755,
    longitude: 139.698257,
  });
  const [places, setPlaces] = useState([]);

  // 聖地リスト, 現在地
  // 現在地,

  // Marker コンポーネントを生成する関数
  function GenMarkerComponent(obj) {
    return (<Marker
      key={obj.place_seq}
      coordinate={{
        latitude: obj.latitude,
        longitude: obj.longitude,
      }}
      onPress={() => {
        setModalBlock(<PlaceModal obj={obj} />);
        setModalVisible(true);
      }}
    />);
  }

  useEffect(() => {
    const db = SQLite.openDatabase('test.db');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM place_master WHERE longitude IS NOT NULL LIMIT 300;',
        [],
        (_, res) => { setPlaces(res.rows._array); },
      );
    });
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { return; }

      const tmp = await Location.getCurrentPositionAsync({});
      const location = {};
      location.latitude = tmp.coords.latitude;
      location.longitude = tmp.coords.longitude;
      setCurrentLocation(location);
    })();
  }, []);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      mapType="standard"
      initialRegion={{
        ...currentLocation,
        ...{
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      }}
      showsUserLocation
      followsUserLocation
      showsMyLocationButton
      showsPointsOfInterest={false}
      toolbarEnabled={false}
      moveOnMarkerPress={false}
    >
      {places.map((obj) => GenMarkerComponent(obj))}
    </MapView>
  );
});

MainMap.propTypes = {
  setModalBlock: func.isRequired,
  setModalVisible: func.isRequired,
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MainMap;
