import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Text, Dimensions, TouchableOpacity, Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

const friendsPath = `${FileSystem.documentDirectory}friends.txt`;
let friendsList;
async function initFriendsFile() {
  const fileExists = await FileSystem.getInfoAsync(friendsPath);
  if (!fileExists.exists) {
    FileSystem.writeAsStringAsync(friendsPath, '');
    friendsList = [];
  } else {
    friendsList = (await FileSystem.readAsStringAsync(friendsPath)).split(',');
  }
  console.log('friends', friendsList.join(','));
}
initFriendsFile();

export default function FriendsSearchScreen(props) {
  const { navigation } = props;
  const [userId, setUserid] = useState('');

  function search() {
    if (!userId) return;
    const db = firebase.firestore();
    const docRef = db.collection('flags').doc(userId);
    docRef.get()
      .then(async (doc) => {
        const { flags } = doc.data();
        friendsList.push(userId);
        friendsList = Array.from(new Set(friendsList));
        FileSystem.writeAsStringAsync(friendsPath, friendsList.join(','));
        navigation.navigate('FriendsAwards', { flags, userId });
      })
      .catch(() => {
        Alert.alert('ユーザーが存在しません。');
      });
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.searchLabel}>ユーザーID検索</Text>
        <View style={styles.searchLineView}>
          <TextInput
            value={userId}
            style={styles.input}
            onChangeText={(text) => { setUserid(text); }}
            autoCapitalize="none"
            placeholder="userID"
            textContentType="emailAddress"
          />
          <TouchableOpacity
            style={styles.searchIconBox}
            onPress={() => search()}
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Text>
            test
          </Text>
        </View>
      </View>
    </View>
  );
}

const displayWidth = Dimensions.get('window').width;
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
  searchLabel: {
    marginBottom: 5,
  },
  searchLineView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  input: {
    fontSize: 16,
    height: 48,
    // 27 * 2 + 48
    width: displayWidth - 102,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
  },
  searchIconBox: {
    backgroundColor: '#3879D9',
    padding: 4,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#DDDDDD',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
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
