import React, { useState } from 'react';
import {
  StyleSheet, Text, Pressable, View,
} from 'react-native';

import ModalBase from '../components/ModalBase';

function GenerateModalContents() {
  return <Text>text</Text>;
}

export default function MainScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBlock, setModalBlock] = useState(<Text>test</Text>);

  function GenAndShoweModalContents() {
    let block = GenerateModalContents();
    setModalBlock(block);
    setModalVisible(true);
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
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => GenAndShoweModalContents()}
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
