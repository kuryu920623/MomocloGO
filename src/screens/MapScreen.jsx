import React, { useState } from 'react';
import {
  StyleSheet, Text, Pressable, View, Dimensions, FlatList,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location, Permissions } from 'expo';

import ModalBase from '../components/ModalBase';

function GenerateModalContents() {
  return <Text>text</Text>;
}

export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBlock, setModalBlock] = useState(<Text>test</Text>);

  let objList = [];
  for (let i = 0; i < 10; i += 1) {
    objList.push({
      key: i,
      val: i * 2,
    });
  }

  function GenAndShoweModalContents(obj) {
    console.log(obj);
    let block = GenerateModalContents();
    setModalBlock(block);
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
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType="standard"
          initialRegion={{
            latitude: 35,
            longitude: 135,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          showsUserLocation
          followsUserLocation
        >
          {objList.map((obj, index) => (
            <Marker
              key={obj.key}
              coordinate={{
                latitude: 35 + 0.0001 * index,
                longitude: 135 + 0.0001 * index,
              }}
              onPress={() => GenAndShoweModalContents(obj)}
            />
          ))}
        </MapView>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => GenAndShoweModalContents()}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
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
