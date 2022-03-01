import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import * as SQLite from 'expo-sqlite';
import { FontAwesome } from '@expo/vector-icons';
import { string } from 'prop-types';
import { Audio } from 'expo-av';
import ModalBase from '../components/ModalBase';
import PlaceModal from '../components/PlaceModal';

let placeObjects;
let setPlaceObjects;
let displayRegion;
let modalBlock;
let modalVisible;
let setModalVisible;

const modaOprn = require('../../assets/sounds/modal_open.mp3');

async function PlayAudio() {
  const soundObj = new Audio.Sound();
  await soundObj.loadAsync(modaOprn);
  await soundObj.playAsync();
}

const regions = {
  '北海道・東北': "region = '北海道・東北'",
  '関東(東京以外)': "region = '関東' AND prefecture != '東京都'",
  '東京': '`prefecture` = "東京都"',
  '中部': '`region` = "中部"',
  '近畿': '`region` = "近畿"',
  '中国・四国': '`region` = "中国・四国"',
  '九州・沖縄': '`region` = "九州・沖縄"',
  '外国': '`region` = "海外"',
};

function RegionButton(props) {
  const { region } = props;
  return (
    <TouchableOpacity
      onPress={() => renderTable(region)}
      style={regionStyles.button}
    >
      <Text style={regionStyles.text}>
        {region}
      </Text>
    </TouchableOpacity>
  );
}

const regionStyles = StyleSheet.create({
  button: {
    margin: 5,
    marginBottom: 9,
    backgroundColor: '#F9C7D1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  text: {
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

RegionButton.propTypes = {
  region: string.isRequired,
};

const renderTable = (region) => {
  displayRegion = region;
  const db = SQLite.openDatabase('test.db');
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM place_master WHERE ${regions[region]} ORDER BY place_seq ASC LIMIT 100;`,
      [],
      (_, res) => { setPlaceObjects(res.rows._array); },
      (_, err) => { console.log(err); },
    );
  });
};

function LinkID(props) {
  const { row } = props;
  return (
    <TouchableOpacity
      style={linkIDStyles.button}
      onPress={() => {
        PlayAudio();
        modalBlock = <PlaceModal placeObj={row} setModalVisible={setModalVisible} />;
        setModalVisible(true);
      }}
    >
      <Text style={linkIDStyles.text}>
        {row.place_seq}
      </Text>
    </TouchableOpacity>
  );
}

const linkIDStyles = StyleSheet.create({
  button: { alignSelf: 'center' },
  text: { color: '#1a73e8', fontSize: 15, textDecorationLine: 'underline' },
});

function placeObjectToData(row) {
  const data = [];
  if (row.get_flg) {
    data.push(<FontAwesome name="flag" size={18} color="red" style={{}} />);
  } else {
    data.push('');
  }
  // ホントはモーダル開く処理
  data.push(<LinkID row={row} />);
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
    widthArr: [40, 60, 80, 100, 100, 140, 160],
  };

  [placeObjects, setPlaceObjects] = useState([]);
  [modalVisible, setModalVisible] = useState(false);

  useEffect(async () => {
    renderTable('東京');
  }, []);

  const tableMemo = useMemo(() => (
    <ScrollView horizontal style={styles.tableContainer}>
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
  ), [placeObjects]);

  return (
    <>
      <ModalBase onPress={setModalVisible} modalVisible={modalVisible}>
        {modalBlock}
      </ModalBase>

      <View style={styles.regionView}>
        <ScrollView horizontal showsVerticalScrollIndicator>
          {Object.keys(regions).map(
            (region, index) => <RegionButton region={region} key={index} />,
          )}
        </ScrollView>
      </View>

      <View style={styles.titleView}>
        <Text style={styles.titleText}>{`表示地域: ${displayRegion}`}</Text>
      </View>

      {tableMemo}
    </>
  );
}
const styles = StyleSheet.create({
  regionView: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  titleView: {
    alignItems: 'center',
    margin: 10,
  },
  titleText: {
    fontSize: 20,
  },
  tableContainer: {
    marginHorizontal: 10,
    marginBottom: 3,
  },
  header: { height: 50, backgroundColor: '#F9C7D1' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
    justifyContent: 'center',
  },
});
