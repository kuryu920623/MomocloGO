import React, { useState, useEffect, memo } from 'react';
import {
  StyleSheet, Text, Pressable, View, Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const MainMap = memo((props) => {
  const { setModalBlock, setModalVisible } = props;
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 35.665755,
    longitude: 139.698257,
  });
  const [places, setPlaces] = useState([]);

  // DB から現在位置周辺の聖地情報を取得する。
  const objList = [];
  for (let i = 0; i < 30; i += 1) {
    objList.push({
      key: i,
      val: i * 2,
    });
  }

  useEffect(() => {
    // 近くの聖地リストを取得
    setPlaces([]);
  }, []);

  function GenAndShoweModalContents(obj) {
    setModalVisible(true);
    setModalBlock(<Text>{obj.key}</Text>);
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { return; }

      let tmp = await Location.getCurrentPositionAsync({});
      let location = {};
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

      {objList.map((obj, index) => (
        <Marker
          key={obj.key}
          coordinate={{
            latitude: 35 + 10 * (Math.random() - 0.5),
            longitude: 135 + 10 * (Math.random() - 0.5),
          }}
          onPress={() => GenAndShoweModalContents(obj)}
        />
      ))}
    </MapView>
  );
});

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MainMap;
