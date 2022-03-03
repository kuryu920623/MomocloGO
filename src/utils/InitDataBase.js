import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

const initialDatabase = require('./InitialDatabase.db');

async function UpdatePlaceList(name) {
  const db = SQLite.openDatabase(name);
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT updated_at FROM place_master ORDER BY updated_at DESC LIMIT 1;',
      [],
      (_, resSql) => {
        console.log('UpdatePlaceList', resSql.rows._array[0].updated_at);
        const lastUpdate = resSql.rows._array[0].updated_at.substring(0, 10);
        fetch(`https://momoclomap.com/momoclogo/placeapi?last_update=${lastUpdate}`)
          .then((res) => res.json())
          .then((json) => { InsertUpdatedPlaces(json); })
          .catch((error) => { console.log('GetUpdatedPlacesFromAPI', error); });
      },
    );
  });
}

function InsertUpdatedPlaces(places) {
  const cols = [
    'place_seq', 'region', 'prefecture', 'name', 'detail',
    'longitude', 'latitude', 'tag', 'address', 'updated_at',
  ];
  const updates = cols.slice(1, 10).map((col) => `${col} = excluded.${col}`).join(', ');
  const sqlInsert = `
    INSERT OR REPLACE INTO place_master ( ${cols.join(', ')} )
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `;
  places.forEach((place) => {
    const db = SQLite.openDatabase('test.db');
    place.updated_at = place._updated_at;
    place.region = place.resion;
    db.transaction((tx) => {
      tx.executeSql(
        sqlInsert,
        cols.map((col) => place[col]),
      );
    });
  });
}

export default async function CopyDefaultDatabase(name = 'test.db') {
  const fileDir = FileSystem.documentDirectory;
  const fileExists = await FileSystem.getInfoAsync(`${fileDir}SQLite/${name}`);
  if (!fileExists.exists) {
    if (!(await FileSystem.getInfoAsync(`${fileDir}SQLite`)).exists) {
      await FileSystem.makeDirectoryAsync(`${fileDir}SQLite`);
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(initialDatabase).uri,
      `${fileDir}SQLite/${name}`,
    );
  }
  const memoPath = `${fileDir}flags.txt`;
  const flagsMemo = await FileSystem.getInfoAsync(memoPath);
  if (!flagsMemo.exists) {
    FileSystem.writeAsStringAsync(memoPath, '');
  }
  // 聖地情報更新
  await UpdatePlaceList(name);
}
