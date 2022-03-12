import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import firebase from 'firebase';
import { Asset } from 'expo-asset';
import { UserContext } from './settings';

const initialDatabase = require('./InitialDatabase.db');

let nav;

export default async function RefleshDBandFlagInfomation(userid, navigation) {
  nav = navigation;
  setUserContext(userid);
  InitializeFiles(userid);
  // UpdatePlaceData(userid);
}

// userContextの設定
function setUserContext(userid) {
  console.log('setUserContext', userid);
  UserContext.id = userid;
  const fb = firebase.firestore();
  const docRef = fb.collection('flags').doc(userid);
  docRef.get()
    .then(async (doc) => {
      const { displayName } = doc.data();
      UserContext.name = displayName;
    });
}

// (ファイルが存在しない場合)DBとflagsのファイルを初期化
async function InitializeFiles(userid) {
  const fileDir = FileSystem.documentDirectory;
  console.log(fileDir);

  const sqliteDir = `${fileDir}SQLite`;
  const sqliteDirInfo = await FileSystem.getInfoAsync(sqliteDir);
  if (!sqliteDirInfo.exists) {
    await FileSystem.makeDirectoryAsync(sqliteDir);
  }
  const filePath = `${sqliteDir}/${userid}.db`;
  const filePathInfo = await FileSystem.getInfoAsync(filePath);
  const p1 = new Promise((resolve) => {
    if (!filePathInfo.exists) {
      FileSystem.downloadAsync(Asset.fromModule(initialDatabase).uri, filePath).then(resolve);
    } else {
      resolve();
    }
  });

  const flagDir = `${fileDir}flags`;
  const flagDirInfo = await FileSystem.getInfoAsync(flagDir);
  if (!flagDirInfo.exists) {
    await FileSystem.makeDirectoryAsync(flagDir);
  }
  const flagPath = `${flagDir}/${userid}.txt`;
  const flagPathInfo = await FileSystem.getInfoAsync(flagPath);
  const p2 = new Promise((resolve) => {
    if (!flagPathInfo.exists) {
      FileSystem.writeAsStringAsync(flagPath, '').then(resolve);
    } else {
      resolve();
    }
  });

  Promise.all([p1, p2]).then(() => { UpdatePlaceData(userid); });
}

// 聖地更新情報をAPIで取得してDBに書き込み
async function UpdatePlaceData(userid) {
  console.log('UpdatePlaceData', `${userid}.db`);
  const db = SQLite.openDatabase(`${userid}.db`);
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT updated_at FROM place_master ORDER BY updated_at DESC LIMIT 1;',
      [],
      (_, resSql) => {
        const lastUpdateAt = resSql.rows._array[0].updated_at.substring(0, 10);
        console.log('UpdatePlaceList', lastUpdateAt);
        fetch(`https://momoclomap.com/momoclogo/placeapi?last_update=${lastUpdateAt}`)
          .then((res) => res.json())
          .then(async (json) => { await InsertUpdatedPlaces(json, userid); })
          .catch((error) => { console.log('GetUpdatedPlacesFromAPI', error); });
      },
      (_, err) => { console.log(err); },
    );
  });
}

// APIで取得したリストをBDに書き込み
async function InsertUpdatedPlaces(places, userid) {
  const cols = [
    'place_seq', 'region', 'prefecture', 'name', 'detail',
    'longitude', 'latitude', 'tag', 'address', 'updated_at',
  ];
  const sqlInsert = `
    INSERT OR REPLACE INTO place_master ( ${cols.join(', ')} )
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `;
  const promises = [];
  places.forEach((place) => {
    place.updated_at = place._updated_at;
    place.region = place.resion;
    const p = new Promise((resolve) => {
      const db = SQLite.openDatabase(`${userid}.db`);
      console.log(place.name);
      db.transaction((tx) => {
        tx.executeSql(
          sqlInsert,
          cols.map((col) => place[col]),
          resolve,
        );
      });
    });
    promises.push(p);
  });
  Promise.all(promises).then(
    () => { DownloadAndRestoreFlags(userid); },
  );
}

// firebaseのflagsを取得してローカルファイルとDBに書き込み
async function DownloadAndRestoreFlags(userid) {
  const db = firebase.firestore();
  const docRef = db.collection('flags').doc(userid);
  docRef.get().then((doc) => {
    const { flags } = doc.data();
    if (flags) {
      const memoPath = `${FileSystem.documentDirectory}flags/${userid}.txt`;
      FileSystem.writeAsStringAsync(memoPath, flags);
      RestoreFlags(flags, userid);
      console.log('DownloadAndRestoreFlags', flags);
    } else {
      console.log('no flags');
      nav.reset({ index: 0, routes: [{ name: 'Main' }] });
    }
  });
}

// firebaseから取得したflagsをDBに書き込み
function RestoreFlags(flags, userid) {
  const db = SQLite.openDatabase(`${userid}.db`);
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE place_master SET get_flg = 1 WHERE place_seq IN (${flags});`,
      [],
      () => {
        console.log('RestoreFlags');
        nav.reset({ index: 0, routes: [{ name: 'Main' }] });
      },
      (_, err) => { console.log('restoreFlags', err); },
    );
  });
}
