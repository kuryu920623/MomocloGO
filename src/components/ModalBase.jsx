import React from 'react';
import {
  Modal, StyleSheet, Pressable, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { func, bool } from 'prop-types';

export default function ModalBase(props) {
  // const [modalVisible, setModalVisible] = useState(false);
  const { children, onPress, modalVisible } = props;

  return (
    <View style={[styles.centeredView]}>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
      >
        <Pressable
          activeOpacity={1}
          style={[styles.centeredView, styles.modalBackGroundView]}
          onPress={() => onPress(!modalVisible)}
        />
        <View style={styles.modalView}>
          {children}
          <Pressable onPress={() => onPress(!modalVisible)}>
            <AntDesign name="closecircleo" size={32} color="black" />
          </Pressable>
        </View>

      </Modal>
    </View>
  );
}

ModalBase.propTypes = {
  // children: elementType.isRequired,
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
