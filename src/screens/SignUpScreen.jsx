import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Text, Alert, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';

import Button from '../components/Button';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [userId, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [fixPassword, setFixPassword] = useState('');
  const [idCheck, setIdCheck] = useState('');
  const [idTextColor, setIdTextColor] = useState('black');

  function checkIdDuplication() {
    if (userId.length <= 5) {
      setIdTextColor('#F15B55');
      setIdCheck('IDは6文字以上です。');
    } else {
      const email = `${userId}@dummy1234321.com`;
      firebase.auth().fetchSignInMethodsForEmail(email).then((method) => {
        if (method.indexOf(firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !== -1) {
          setIdTextColor('#F15B55');
          setIdCheck('既に取得されています。');
        } else {
          setIdTextColor('green');
          setIdCheck('✔ OK');
        }
      });
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
        console.log(user.email);
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
          <Text style={[styles.idCheck, { color: idTextColor }]}>{idCheck}</Text>
          <Button
            onPress={() => checkIdDuplication()}
            containerStyle={{ marginBottom: null }}
            label="取得可能か確認"
          />
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
    marginBottom: 8,
  },
  buttonLine: {
    marginBottom: 16,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  idCheck: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  signUpLink: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  signUpLinkText: {
    color: '#467FD3',
  },
});
