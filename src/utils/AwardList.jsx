import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
// タイトル
// 説明文
// 上限数
// 取得数function(SQL)
// アイコン

export default async function GetAwardList() {
  const awardList = [
    {
      title: 'タイトル',
      description: '説明文',
      targetCount: 10,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master WHERE get_flg = 1;',
      icon: 'wer',
    },
    {
      title: 'タイトル',
      description: '説明文',
      targetCount: 50,
      getCountSQL: 'SELECT COUNT(1) AS count FROM place_master;',
      icon: 'ert',
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
