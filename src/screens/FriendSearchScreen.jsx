import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Text, Alert, TouchableOpacity,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import firebase from 'firebase';

import Button from '../components/Button';

export default function FriendsSearchScreen(props) {
  const { navigation } = props;
  const [userId, setUserid] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>ユーザーID検索</Text>
        <TextInput
          value={userId}
          style={styles.input}
          onChangeText={(text) => { setUserid(text); }}
          autoCapitalize="none"
          placeholder="userID"
          textContentType="emailAddress"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  buttonLine: {
    alignSelf: 'flex-end',
  },
  signUpLink: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  signUpLinkText: {
    color: '#467FD3',
  },
});
