import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

async function GetAndUpdatePlaces(tx, lastUpdateAt) {
  // サーバから lastUpdateAt に更新された聖地リスト取得
  return;
  const cols = ['place_seq', 'region'].join(',');
  const places = [];
  const vals = '(?,?,?,?,?,?,?),'.repeat(places.length).slice(0, -1);
  const sqlInsertPlaces = [
    `INSERT INTO placeMaster ( ${cols} ) VALUES ${vals}`,
  ].join('\n');

  tx.executeSql(sqlInsertPlaces, places);
}

export default async function CopyDefaultDatabase(name = 'test.db') {
  const fileExists = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/${name}`);
  if (!fileExists.exists) {
    if (!(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`)).exists) {
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`);
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require('./test.db')).uri,
      `${FileSystem.documentDirectory}SQLite/${name}`,
    );
    // firebase のメダル獲得情報取得
  }

  // 更新
  const db = await SQLite.openDatabase(name);
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT updated_at FROM place_master ORDER BY updated_at DESC LIMIT 1;',
      [],
      (_, res) => { GetAndUpdatePlaces(tx, res.item.item[0].updated_at); },
    );

    // firebase のメダル情報反映
    // firebase のメダルID情報更新
  })
}
