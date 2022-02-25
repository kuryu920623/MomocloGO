import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {
  FontAwesome5, MaterialCommunityIcons, Ionicons, MaterialIcons, AntDesign,
} from '@expo/vector-icons';
// タイトル
// 説明文
// 上限数
// 取得数function(SQL)
// アイコン

export default async function GetAwardList() {
  // iconSizeのデフォルトは48
  const awardList = [
    {
      title: 'タイトル',
      description: '聖地のメダルを10個獲得する。',
      targetCount: 10,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#C47222',

      icon: <FontAwesome5 name="award" size={48} color="#C47222" />,
    },
    {
      title: 'タイトル',
      description: '聖地のメダルを50個獲得する。',
      targetCount: 50,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#A0A0A0',
    },
    {
      title: 'タイトル',
      description: '聖地のメダルを100個獲得する。',
      targetCount: 100,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#E8DC00',
    },
    {
      title: 'タイトル',
      description: '聖地のメダルを300個獲得する。',
      targetCount: 300,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'FontAwesome5',
      iconName: 'award',
      iconColor: '#444444',
    },

    {
      title: 'こってりパトロール見習い隊員',
      description: 'こってりパトロールで紹介されたお店のメダルを1個獲得する。',
      targetCount: 1,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#C47222',
    },
    {
      title: 'こってりパトロール正隊員',
      description: 'こってりパトロールで紹介されたお店のメダルを5個獲得する。',
      targetCount: 5,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#A0A0A0',
    },
    {
      title: 'こってりパトロール司令官',
      description: 'こってりパトロールで紹介されたお店のメダルを10個獲得する。',
      targetCount: 10,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#E8DC00',
    },
    {
      title: 'こってりパトロール総監',
      description: 'こってりパトロールで紹介されたお店のメダルを20個獲得する。',
      targetCount: 20,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      iconProvider: 'Ionicons',
      iconName: 'restaurant',
      iconColor: '#444444',
    },

  ];

  const promises = [];
  awardList.forEach((award) => {
    promises.push(GetSqlResult(award.getCountSQL));
  });
  const p = Promise.all(promises).then((values) => {
    values.forEach((value, index) => {
      awardList[index].getCount = value;
    });
    return awardList;
  });
  return p;
}

async function GetSqlResult(sql, params = []) {
  const db = SQLite.openDatabase('test.db');
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, res) => { resolve(res.rows._array[0].count); },
        (_, error) => { console.log(error); },
      );
    });
  });
}
