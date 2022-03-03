import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Text, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

import Button from '../components/Button';

function restoreFlags(flags) {
  const db = SQLite.openDatabase('test.db');
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE place_master SET get_flg = 1 WHERE place_seq IN (${flags});`,
      [],
      () => { console.log('restoreFlags'); },
      (_, err) => { console.log('restoreFlags', err); },
    );
  });
}

export default function LogInScreen(props) {
  const { navigation } = props;
  const [userId, setUserid] = useState('');
  const [password, setPassword] = useState('');

  function submit() {
    firebase.auth().signInWithEmailAndPassword(`${userId}@dummy1234321.com`, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user.email);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
        downloadFlags();
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }

  async function downloadFlags() {
    const { currentUser } = firebase.auth();

    const db = firebase.firestore();
    const fullUserId = currentUser.email.replace('@dummy1234321.com', '');
    const docRef = db.collection('flags').doc(fullUserId);
    docRef.get().then((doc) => {
      const { flags } = doc.data();
      if (!flags) return;
      const memoPath = `${FileSystem.documentDirectory}flags.txt`;
      FileSystem.writeAsStringAsync(memoPath, flags);
      restoreFlags(flags);
      console.log('downloadFlags', flags);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>ログイン</Text>

        <View>
          <Text style={styles.label}>ユーザーID</Text>
          <TextInput
            value={userId}
            style={styles.input}
            onChangeText={(text) => { setUserid(text); }}
            autoCapitalize="none"
            placeholder="userID"
            textContentType="emailAddress"
          />
        </View>

        <View>
          <Text style={styles.label}>パスワード</Text>
          <TextInput
            value={password}
            style={styles.input}
            onChangeText={(text) => { setPassword(text); }}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
        </View>

        <View style={styles.buttonLine}>
          <Button onPress={() => submit()} style={styles.logInButton} label="ログイン" />
        </View>

        <View style={styles.signUpLink}>
          <Text>新規登録は </Text>
          <TouchableOpacity onPress={() => { navigation.navigate('SignUp'); }}>
            <Text style={styles.signUpLinkText}>こちら</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  inner: {
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
