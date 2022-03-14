import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, TextInput, Text, TouchableOpacity, Alert,
} from 'react-native';
import firebase from 'firebase';

import Loading from '../components/Loading';
import Button from '../components/Button';
import { transrateErrors } from '../utils/settings';
import RefleshDBandFlagInfomation from '../utils/InitDataBase';

let navigation;
let refleshStart = false;

export default function LogInScreen(props) {
  navigation = props.navigation;
  const [userId, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && !refleshStart) {
        console.log('auto Login', user.email);
        const userid = user.email.replace('@dummy1234321.com', '');
        setIsLoading(true);
        RefleshDBandFlagInfomation(userid, navigation);
      }
    });
    return unsubscribe;
  }, []);

  function submit() {
    setIsLoading(true);
    firebase.auth().signInWithEmailAndPassword(`${userId}@dummy1234321.com`, password)
      .then((userCredential) => {
        refleshStart = true;
        const { user } = userCredential;
        console.log('submit', user.email);
        const userid = user.email.replace('@dummy1234321.com', '');
        RefleshDBandFlagInfomation(userid, navigation);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.code, error.message);
        const err = transrateErrors(error.code);
        Alert.alert(err.title, err.description);
      });
  }

  return (
    <>
      <Loading isLoading={isLoading} />
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
    </>
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
