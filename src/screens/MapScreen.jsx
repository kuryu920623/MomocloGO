import React, { useState, useEffect, memo } from 'react';
import {
  StyleSheet, Text, Pressable, View, Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import ModalBase from '../components/ModalBase';

function GenerateModalContents() {
  return <Text>text</Text>;
}

export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBlock, setModalBlock] = useState(<Text>test</Text>);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 35.665755,
    longitude: 139.698257,
  });
  const [places, setPlaces] = useState([]);

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

  useEffect(() => {
    // 近くの聖地リストを取得
    setPlaces([]);
  }, []);

  // DB から現在位置周辺の聖地情報を取得する。
  let objList = [];
  for (let i = 0; i < 30; i += 1) {
    objList.push({
      key: i,
      val: i * 2,
    });
  }

  function GenAndShoweModalContents(obj) {
    console.log(obj);
    let block = GenerateModalContents();
    setModalBlock(<Text>{obj.key}</Text>);
    setModalVisible(true);
  }

  function renderItem({ item, index }) {
    const lon = 135 + 0.0001 * index;
    const lat = 35 + 0.0001 * index;
    return (
      <Marker
        coordinate={{ latitude: lat, longitude: lon }}
      />
    );
  }

  const Child = memo(() => (
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
  ));

  return (
    <>
      <ModalBase
        onPress={setModalVisible}
        modalVisible={modalVisible}
      >
        {modalBlock}

      </ModalBase>
      <View style={styles.centeredView}>
        <Child />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
