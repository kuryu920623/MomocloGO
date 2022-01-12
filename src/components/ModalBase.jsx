import React from 'react';
import {
  Modal, StyleSheet, Text, Pressable, View,
} from 'react-native';
import { func, bool, elementType } from 'prop-types';

export default function ModalBase(props) {
  // const [modalVisible, setModalVisible] = useState(false);
  const { children, onPress, modalVisible } = props;

  return (
    <View style={styles.centeredView}>

      <Modal
        animationType="fade"
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
          <Pressable
            style={[styles.buttonClose]}
            onPress={() => onPress(!modalVisible)}
          >
            <Text style={styles.textStyle}>閉じる</Text>
          </Pressable>
        </View>

      </Modal>
    </View>
  );
}

ModalBase.propTypes = {
  children: elementType.isRequired,
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
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
