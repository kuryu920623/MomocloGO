import React, { useState } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';

import ModalBase from '../components/ModalBase';
import MainMap from '../components/MainMap';

export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBlock, setModalBlock] = useState(<Text>test</Text>);

  return (
    <>
      <ModalBase onPress={setModalVisible} modalVisible={modalVisible}>
        {modalBlock}
      </ModalBase>

      <View style={styles.centeredView}>
        <MainMap setModalBlock={setModalBlock} setModalVisible={setModalVisible} />
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
});
