import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Text, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

export default function LogInScreen(props) {
  const { navigation } = props;
  const [userId, setUserid] = useState('');
  const [password, setPassword] = useState('');

  function submit() {
    firebase.auth().signInWithEmailAndPassword(userId + '@dummy_1234321.com', password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
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
          <Button onPress={submit} style={styles.logInButton}>ログイン</Button>
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
