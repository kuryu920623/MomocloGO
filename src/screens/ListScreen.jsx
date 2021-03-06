import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { Table, Row } from 'react-native-table-component-2';
import * as SQLite from 'expo-sqlite';
import { FontAwesome } from '@expo/vector-icons';
import { number, string } from 'prop-types';
import { Audio } from 'expo-av';
import ModalBase from '../components/ModalBase';
import PlaceModal from '../components/PlaceModal';
import Loading from '../components/Loading';
import { UserContext } from '../utils/settings';

let curretRegion = '東京';
let currentPage = 0;
let maxPage = 0;
let placeObjects;
let setPlaceObjects;
let displayRegion = '';
let modalBlock = <Text>dummy</Text>;
let isLoading;
let setIsLoading;
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
      onPress={() => {
        curretRegion = region;
        setMaxPage();
        renderTable(curretRegion, 0);
        // ページャーの数字変更
      }}
      style={regionStyles.button}
    >
      <Text style={regionStyles.text}>
        {region}
      </Text>
    </TouchableOpacity>
  );
}

function setMaxPage() {
  const db = SQLite.openDatabase(`${UserContext.id}.db`);
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT COUNT(1) AS cnt FROM place_master WHERE ${regions[curretRegion]};`,
      [],
      (_, res) => { maxPage = Math.ceil(res.rows._array[0].cnt / 100); },
    );
  });
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
RegionButton.propTypes = { region: string.isRequired };

const renderTable = (region, page = 0) => {
  setIsLoading(true);
  displayRegion = region;
  const db = SQLite.openDatabase(`${UserContext.id}.db`);
  console.log('renderTable', page);
  db.transaction((tx) => {
    tx.executeSql(
      // ページング系の処理追加必要
      `SELECT * FROM place_master WHERE ${regions[region]} ORDER BY place_seq ASC LIMIT 100 OFFSET ?;`,
      [page * 100],
      (_, res) => { setPlaceObjects(res.rows._array); setIsLoading(false); },
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

function LinkPager(props) {
  const { page } = props;
  return (
    <TouchableOpacity onPress={() => { renderTable(curretRegion, page); }}>
      <Text style={linkPagerStyles.pagerText}>{page + 1}</Text>
    </TouchableOpacity>
  );
}

const linkPagerStyles = StyleSheet.create({
  pagerText: {
    paddingHorizontal: 8,
    fontSize: 18,
    color: '#1a73e8',
    textDecorationLine: 'underline',
  },
});

function placeObjectToData(row) {
  const data = [];
  if (row.get_flg) {
    data.push(
      <FontAwesome name="flag" size={18} color="rgb(255, 133, 133)" style={{ alignSelf: 'center' }} />,
    );
  } else {
    data.push('');
  }
  data.push(<LinkID row={row} />);
  data.push(row.prefecture);
  data.push(row.name.substr(0, 10));
  data.push(row.tag);
  data.push(row.address);
  return data;
}

export default function ListScreen() {
  const state = {
    tableHead: ['取得', 'ID', '都道府県', '名称', 'タグ', '住所'],
    widthArr: [40, 60, 80, 100, 100, 140],
  };

  [placeObjects, setPlaceObjects] = useState([]);
  [modalVisible, setModalVisible] = useState(false);
  // const [maxPage, setMaxPage] = useState(7);
  [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setMaxPage();
    renderTable(curretRegion, 0);
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
      <Loading isLoading={isLoading} />
      <ModalBase onPress={setModalVisible} modalVisible={modalVisible}>
        {modalBlock}
      </ModalBase>

      <View style={styles.regionView}>
        <ScrollView horizontal showsVerticalScrollIndicator>
          {Object.keys(regions).map(
            (region, index) => <RegionButton region={region} page={currentPage} key={index} />,
          )}
        </ScrollView>
      </View>

      <View style={styles.titleView}>
        <Text style={styles.titleText}>{`表示地域: ${displayRegion}`}</Text>
      </View>

      <View style={styles.pagerView}>
        {[...Array(maxPage)].map((_, index) => <LinkPager page={index} key={index} />)}
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
  pagerView: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
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
