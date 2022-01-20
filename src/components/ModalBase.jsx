import React from 'react';
import {
  Modal, StyleSheet, Pressable, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { func, bool, object } from 'prop-types';

export default function ModalBase(props) {
  const { children, onPress, modalVisible } = props;

  return (
    <View style={[styles.centeredView]}>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
      >
        <Pressable
          activeOpacity={1}
          style={[styles.centeredView, styles.modalBackGroundView]}
          onPress={() => onPress(false)}
        />
        <View style={styles.modalView}>
          {children}
          <Pressable onPress={() => onPress(false)}>
            <AntDesign name="closecircleo" size={32} color="black" />
          </Pressable>
        </View>

      </Modal>
    </View>
  );
}

ModalBase.propTypes = {
  children: object.isRequired,
  onPress: func.isRequired,
  modalVisible: bool,
};

ModalBase.defaultProps = {
  modalVisible: false,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  modalBackGroundView: {
    opacity: 0.7,
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
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
});
