import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, TextInput, Text, Dimensions, TouchableOpacity, Alert, ScrollView,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

import FriendListComponent from '../components/FriendListComponent';

let friendsList, setFriendList;
const friendsPath = `${FileSystem.documentDirectory}friends.txt`;

function getFlagsAndMove(userId, navigation) {
  if (!userId) return;
  const db = firebase.firestore();
  const docRef = db.collection('flags').doc(userId);
  docRef.get()
    .then(async (doc) => {
      const { flags, displayName } = doc.data();
      const ids = friendsList.map((friend) => Object.keys(friend)[0]);
      if (!ids.includes(userId)) {
        const tmp = friendsList.concat([{ [userId]: displayName }]);
        setFriendList(tmp);
        FileSystem.writeAsStringAsync(friendsPath, JSON.stringify(friendsList));
      }
      navigation.navigate('FriendsAwards', { flags, userId, displayName });
    })
    .catch(() => {
      Alert.alert('ユーザーが存在しません。');
    });
}

function deleteFrined(userId) {
  Alert.alert('リストから削除しますか？', '', [
    {
      text: 'キャンセル',
      style: 'cancel',
    },
    {
      text: 'はい',
      onPress: () => {
        const tmp = friendsList.filter((friend) => Object.keys(friend)[0] !== userId);
        setFriendList(tmp);
        FileSystem.writeAsStringAsync(friendsPath, JSON.stringify(tmp));
      },
    },
  ]);
}

export default function FriendsSearchScreen(props) {
  const { navigation } = props;
  const [userId, setUserid] = useState('');
  [friendsList, setFriendList] = useState([]);

  useEffect(async () => {
    const fileExists = await FileSystem.getInfoAsync(friendsPath);
    if (!fileExists.exists) {
      FileSystem.writeAsStringAsync(friendsPath, JSON.stringify([]));
      setFriendList([]);
    } else {
      const userList = JSON.parse(await FileSystem.readAsStringAsync(friendsPath));
      setFriendList(userList);
    }
  }, []);

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
            onPress={() => getFlagsAndMove(userId, navigation)}
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.friendsListView}>
          {friendsList.map(
            (friend, index) => (
              <FriendListComponent
                id={Object.keys(friend)[0]}
                name={Object.values(friend)[0]}
                navigation={navigation}
                moveFunc={getFlagsAndMove}
                deleteFunc={deleteFrined}
                key={index}
              />
            ),
          )}
        </ScrollView>
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
  friendsListView: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    marginBottom: 150,
  },
});
