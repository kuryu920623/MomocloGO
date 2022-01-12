import React, { useState } from 'react';
import {
  StyleSheet, Text, Pressable, View,
} from 'react-native';

import ModalBase from '../components/ModalBase';

export default function MainScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ModalBase
        onPress={setModalVisible}
        modalVisible={modalVisible}
      >
        <Text style={styles.modalText}>Hello World!</Text>
      </ModalBase>
      <View style={styles.centeredView}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
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
  modalBackGroundView: {
    opacity: 0.7,
    backgroundColor: 'black',
  },
  modalView: {
    position: 'absolute',
    top: '20%',
    height: '60%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
