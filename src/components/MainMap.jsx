import React, { useState, useEffect, memo } from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { func } from 'prop-types';

const MainMap = memo((props) => {
  const { setModalBlock, setModalVisible } = props;
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 35.665755,
    longitude: 139.698257,
  });
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // 本当は聖地リストを取得
    const tmp = [];
    for (let i = 0; i < 30; i += 1) {
      tmp.push({
        key: i,
        val: i * 2,
      });
    }
    setPlaces(tmp);
  }, []);

  // ピンがタップされたときに走る、モーダルの内容を変更する関数
  function GenAndShoweModalContents(obj) {
    setModalVisible(true);
    setModalBlock(<Text>{obj.key}</Text>);
  }

  // Marker コンポーネントを生成する関数
  function GenMarkerComponent(obj) {
    return (<Marker
      key={obj.key}
      coordinate={{
        latitude: 35 + 10 * (Math.random() - 0.5),
        longitude: 135 + 10 * (Math.random() - 0.5),
      }}
      onPress={() => {
        setModalBlock(<Text>{obj.key}</Text>);
        setModalVisible(true);
      }}
    />);
  }

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
