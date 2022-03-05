import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { string, func, shape } from 'prop-types';

export default function FriendListComponent(props) {
  const { id, navigation, move } = props;
  return (
    <TouchableOpacity
      onPress={() => { move(id, navigation); }}
      style={styles.topView}
    >
      <Text style={styles.userText}>{id}</Text>
      <AntDesign name="closecircleo" size={20} color="black" />
    </TouchableOpacity>
  );
}

FriendListComponent.propTypes = {
  id: string.isRequired,
  navigation: shape().isRequired,
  move: func.isRequired,
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
  userText: {
    fontSize: 15,
  },
});
