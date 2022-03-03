import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Text, Alert, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [userId, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [fixPassword, setFixPassword] = useState('');
  const [idCheck, setIdCheck] = useState('');

  function checkIdDuplication() {
    if (userId.length < 5) {
      Alert.alert('ユーザーIDは6文字以上です。');
      setIdCheck('✗ NG');
      checkLabelStyle('red');
    } else {
      const mail = `${userId}@dummy1234321.com`;
      if (true) {
        setIdCheck('✔ OK');
      } else {
        setIdCheck('✔ OK');
      }
    }
  }

  function submit() {
    if (password !== fixPassword) {
      Alert.alert('確認用パスワードが異なります。');
      return;
    }
    if (userId.length < 5) {
      Alert.alert('ユーザーIDは6文字以上です。');
    }
    // 英数字のみか確認
    // アラートは面倒なので、ポップアップにしたい。
    firebase.auth().createUserWithEmailAndPassword(`${userId}@dummy1234321.com`, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user.uid);
        navigation.navigate('Main');
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>新規登録</Text>
        <Text style={styles.attention}>
          Friends機能を使用する場合、ユーザーIDを公開する必要があります。ユーザーIDとパスワードは一致させないことを推奨いたします。
        </Text>

        <View>
          <Text style={styles.label}>
            <Text style={styles.textRequire}>* </Text>
            ユーザーID (半角英数字6文字以上)
          </Text>
          <TextInput
            value={userId}
            style={styles.input}
            onChangeText={(text) => { setUserid(text); }}
            autoCapitalize="none"
            placeholder="userID"
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.buttonLine}>
          <View style={{ width: 45 }}>
            <Text style={checkLabelStyle()}>{idCheck}</Text>
          </View>
          <Button onPress={() => checkIdDuplication()} label="取得可能か確認" />

        </View>

        <View>
          <Text style={styles.label}>
            <Text style={styles.textRequire}>* </Text>
            パスワード(6文字以上)
          </Text>
          <TextInput
            value={password}
            style={styles.input}
            onChangeText={(text) => { setPassword(text); }}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />

          <Text style={styles.label}>
            <Text style={styles.textRequire}>* </Text>
            パスワード(確認用)
          </Text>
          <TextInput
            value={fixPassword}
            style={styles.input}
            onChangeText={(text) => { setFixPassword(text); }}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
        </View>

        <View style={styles.buttonLine}>
          <Button onPress={() => submit()} label="登録" />
        </View>

        <View style={styles.signUpLink}>
          <Text>ログインは </Text>
          <TouchableOpacity onPress={() => { navigation.navigate('LogIn'); }}>
            <Text style={styles.signUpLinkText}>こちら</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

function checkLabelStyle(color) {
  return { color };
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
  attention: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F15B55',
    marginBottom: 10,
  },
  textRequire: {
    color: 'red',
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
    flexDirection: 'row',
  },
  checkMark: {
    fontSize: 16,
  },
  signUpLink: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  signUpLinkText: {
    color: '#467FD3',
  },
});
