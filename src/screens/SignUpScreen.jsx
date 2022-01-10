import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Text, TouchableOpacity,
} from 'react-native';

import Button from '../components/Button';

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fixPassword, setFixPassword] = useState('');

  function handlePress() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignUp' }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>アカウント登録</Text>
        <Text>アカウント登録済みの方は こちら</Text>

        <Text style={styles.label}>
          <Text style={styles.textRequire}>* </Text>
          ユーザーID
        </Text>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(text) => { setEmail(text); }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />

        <Button onPress={ handlePress }>取得可能か確認</Button>

        <Text style={styles.label}>
          <Text style={styles.textRequire}>* </Text>
          パスワード
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
});
