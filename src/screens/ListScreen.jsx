import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import * as SQLite from 'expo-sqlite';
import {
  FontAwesome5, MaterialCommunityIcons, Ionicons, MaterialIcons, AntDesign,
} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { shape } from 'prop-types';

import Icon from '../components/Icon';

let placeObjects;
let setPlaceObjects;

const regions = {
  '北海道・東北': "region = '北海道・東北'",
  '関東(東京以外)': "region = '関東' AND prefecture <> '東京'",
  '東京': '`prefecture` = "東京都"',
};

function regionButton(region) {

  return (
    <TouchableOpacity>
      <></>
    </TouchableOpacity>
  )
}

function renderTable(region) {
  const db = SQLite.openDatabase('test.db');
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM place_master WHERE ${regions[region]} ORDER BY place_seq ASC LIMIT 100;`,
      [],
      (_, res) => { setPlaceObjects(res.rows._array); },
      (_, err) => { console.log(err); },
    );
  });
}

function placeObjectToData(row) {
  const data = [];
  if (row.get_flg) {
    data.push(<FontAwesome5 name="flag" />);
  } else {
    data.push('');
  }
  // ホントはモーダル開く処理
  data.push(row.place_seq);
  data.push(row.prefecture);
  data.push(row.name.substr(0, 10));
  data.push(row.tag);
  data.push(row.address);
  data.push(row.detail.substr(0, 15));
  return data;
}

export default function ListScreen() {
  const state = {
    tableHead: ['取得', 'ID', '都道府県', '名称', 'タグ', '住所', '詳細'],
    widthArr: [40, 60, 80, 100, 120, 140, 160],
  };

  [placeObjects, setPlaceObjects] = useState([]);

  useEffect(async () => {
    renderTable('関東(東京以外)');
  }, []);

  return (
    <>
      <View style={styles.regionView}>
        <ScrollView horizontal>
          <Text>45</Text>
        </ScrollView>
      </View>

      <View style={styles.container}>
        <ScrollView horizontal>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                {
                  placeObjects.map((rowData, index) => (
                    <Row
                      key={index}
                      data={placeObjectToData(rowData)}
                      widthArr={state.widthArr}
                      style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  regionView: {
    height: 40,
    backgroundColor: 'white',
  },
  container: { padding: 16, paddingTop: 30 },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
});
