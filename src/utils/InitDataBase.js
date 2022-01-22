import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

async function UpdateMedalMasterTable(name) {
  const db = SQLite.openDatabase(name);
  // メダルマスタから最新の updateAt 取得
  // firebaseからリスト取得
  // 追加情報 insert
}

async function UpdateMedalIdTable(name) {
  const db = SQLite.openDatabase(name);
}

async function UpdatePlaceList(name) {
  const db = SQLite.openDatabase(name);
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT updated_at FROM place_master ORDER BY updated_at DESC LIMIT 1;',
      [],
      (_, res) => { GetUpdatedPlacesFromAPI(tx, res.rows._array[0].updated_at); },
    );
  });
}

function GetUpdatedPlacesFromAPI(tx, updateAt) {
  const url = 'https://momoclomap.com/momoclogo/placeapi?last_update=2022-01-01';
  fetch(url)
    .then((res) => res.json())
    .then((json) => { InsertUpdatedPlaces(tx, json); })
    .catch((error) => { console.log('GetUpdatedPlacesFromAPI', error); });
}

function InsertUpdatedPlaces(tx, places) {
  const cols = ['place_seq', 'region'].join(',');
  const sqlInsert = `INSERT INTO placeMaster ( ${cols} ) VALUES (?,?,?,?,?,?,?,?,?,?) ON CONFLICT DO UPDATE`;
  places.forEach((place) => {

  });
}

async function UpdateGotPlaceList(name) {
  const db = SQLite.openDatabase(name);
}

export default async function CopyDefaultDatabase(name = 'test.db') {
  // 初期DBコピー
  const fileExists = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/${name}`);
  if (!fileExists.exists) {
    if (!(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)).exists) {
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`);
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require('./test.db')).uri,
      `${FileSystem.documentDirectory}SQLite/${name}`,
    );
  }

  // firebase のメダルマスタテーブル反映
  UpdateMedalMasterTable(name);

  // firebase のメダルIDテーブル取得 & 反映
  UpdateMedalIdTable(name);

  // 聖地情報更新
  await UpdatePlaceList(name);

  // firebase のメダル獲得情報取得 & 反映
  await UpdateGotPlaceList(name);
}
