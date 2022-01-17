import React, { useState, useEffect, memo } from 'react';
import {
  StyleSheet, Text, Pressable, View, Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import ModalBase from '../components/ModalBase';
import MainMap from '../components/MainMap';

function GenerateModalContents(obj) {
  return <Text>text</Text>;
}

export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBlock, setModalBlock] = useState(<Text>test</Text>);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 35.665755,
    longitude: 139.698257,
  });

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
    let block = GenerateModalContents(obj);
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

  return (
    <>
      <ModalBase
        onPress={setModalVisible}
        modalVisible={modalVisible}
      >
        {modalBlock}

      </ModalBase>
      <View style={styles.centeredView}>
        <MainMap
          setModalBlock={setModalBlock}
          setModalVisible={setModalVisible}
        />
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
