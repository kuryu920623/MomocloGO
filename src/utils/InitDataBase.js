import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

function GetAndUpdatePlaces(tx, lastUpdateAt) {
  // サーバから lastUpdateAt に更新された聖地リスト取得
  const cols = ['place_seq', 'region'].join(',');
  const places = [];
  const vals = '(?,?,?,?,?,?,?),'.repeat(places.length).slice(0, -1);
  const sqlInsertPlaces = [
    `INSERT INTO placeMaster ( ${cols} ) VALUES ${vals}`,
  ].join('\n');

  tx.executeSql(sqlInsertPlaces, places);
}

export default function InitDatabase() {
  const db = SQLite.openDatabase('MomocloGO.db');

  console.log(FileSystem.documentDirectory + 'SQLite/');

  db.transaction((tx) => {
    // tx.executeSql('DROP TABLE placeMaster;', []);

    const sqlCreateTable = [
      'CREATE TABLE IF NOT EXISTS placeMaster (',
        'place_seq INTEGER PRIMARY KEY NOT NULL,',
        'region STRING,',
        'updated_at DATETIME);',
    ].join('\n');
    tx.executeSql(sqlCreateTable, []);

    // tx.executeSql(
    //   'INSERT INTO placeMaster (place_seq, region, updated_at) VALUES (?, ?, ?)',
    //   [Math.round(Math.random() * 10000), '関東', Date.now()],
    //   (_, result) => {},
    //   (error) => { console.log('insert', error); },
    // );

    const latestUpdataSql = 'SELECT updated_at FROM placeMaster ORDER BY updated_at DESC LIMIT 1;';
    tx.executeSql(
      latestUpdataSql,
      [],
      (_, result) => {
        let lastUpdateAt = '1000-01-01 00:00:00';
        const { rows } = result;
        if (rows.length) { lastUpdateAt = rows.item(0).updated_at; }
        GetAndUpdatePlaces(tx, lastUpdateAt);
      },
    );
  });
}
