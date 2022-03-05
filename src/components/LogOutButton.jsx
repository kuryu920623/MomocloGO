import React from 'react';
import firebase from 'firebase';
import {
  TouchableOpacity, Text, StyleSheet, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LogOutButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.logOutView}
      onPress={() => {
        firebase.auth().signOut()
          .then(() => {
            navigation.reset({ index: 0, routes: [{ name: 'LogIn' }] });
          })
          .catch(() => { Alert.alert('ログアウトに失敗しました'); });
      }}
    >
      <Text style={styles.logOutText}>ログアウト</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logOutView: {
    marginRight: 12,
  },
  logOutText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});
