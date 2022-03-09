import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { string, func, shape } from 'prop-types';

export default function FriendListComponent(props) {
  const {
    id, name, navigation, moveFunc, deleteFunc,
  } = props;
  return (
    <TouchableOpacity
      onPress={() => { moveFunc(id, navigation); }}
      style={styles.topView}
    >
      <View>
        <Text style={styles.userNameText}>{name}</Text>
        <Text style={styles.userIdText}>{`ID: ${id}`}</Text>
      </View>
      <TouchableOpacity onPress={() => { deleteFunc(id); }}>
        <AntDesign name="closecircleo" size={28} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

FriendListComponent.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  navigation: shape().isRequired,
  moveFunc: func.isRequired,
  deleteFunc: func.isRequired,
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#AAAAAA',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 18,
  },
  userIdText: {
    fontSize: 12,
    color: 'gray',
  },
});
