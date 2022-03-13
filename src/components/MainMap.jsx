import React, {
  useState, useEffect, useMemo,
} from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { func } from 'prop-types';
import * as SQLite from 'expo-sqlite';
import { Audio } from 'expo-av';
import PlaceModal from './PlaceModal';
import Loading from './Loading';
import { UserContext } from '../utils/settings';

const flagOrange = require('../../assets/images/flag_orange.png');
const flagBlack = require('../../assets/images/flag_black.png');
const flagRed = require('../../assets/images/flag_red.png');
const flagYellow = require('../../assets/images/flag_yellow.png');
const flagPink = require('../../assets/images/flag_pink.png');
const flagPurple = require('../../assets/images/flag_purple.png');

const modaOprn = require('../../assets/sounds/modal_open.mp3');

let setModalBlock;
let setModalVisible;

async function PlayAudio() {
  const soundObj = new Audio.Sound();
  await soundObj.loadAsync(modaOprn);
  await soundObj.playAsync();
}

function GenMarkerComponent(obj, resetMap) {
  const {
    get_flg, tag, place_seq, latitude, longitude,
  } = obj;

  let flag;
  if (get_flg) {
    flag = flagOrange;
  } else if (tag === '百田夏菜子') {
    flag = flagRed;
  } else if (tag === '玉井詩織') {
    flag = flagYellow;
  } else if (tag === '佐々木彩夏') {
    flag = flagPink;
  } else if (tag === '高城れに') {
    flag = flagPurple;
  } else {
    flag = flagBlack;
  }

  return (
    <Marker
      key={place_seq}
      coordinate={{ latitude, longitude }}
      onPress={() => {
        setModalBlock(<PlaceModal placeObj={obj} resetMap={resetMap} />);
        setModalVisible(true);
        PlayAudio();
      }}
      image={flag}
    />
  );
}

function MainMap(props) {
  console.log('Main Map');
  setModalBlock = props.setModalBlock;
  setModalVisible = props.setModalVisible;
  const [map, resetMap] = useState(0);
  const [mapView, setMapView] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function generateMapView(lotation, places) {
    console.log('generateMapView');
    setMapView(
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType="standard"
        initialRegion={lotation}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton
        showsPointsOfInterest={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
      >
        {places.map((obj) => GenMarkerComponent(obj, resetMap))}
      </MapView>,
    );
    setIsLoading(false);
  }

  useEffect(async () => {
    // 現在位置
    console.log('useEffect');
    const { status } = await Location.requestForegroundPermissionsAsync({});
    if (status !== 'granted') { return; }

    const tmp = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
      distanceInterval: 1000,
    });
    const location = {
      latitude: tmp.coords.latitude,
      longitude: tmp.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    // 近くのフラグ取得
    const db = SQLite.openDatabase(`${UserContext.id}.db`);
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM place_master WHERE longitude IS NOT NULL
        ORDER BY ABS(longitude - ?) + ABS(latitude - ?) % 360 ASC LIMIT 200;`,
        [location.longitude, location.latitude],
        (_, res) => { generateMapView(location, res.rows._array, setMapView, resetMap); },
        (_, err) => { console.log(err); },
      );
    });
  }, [map]);

  return (
    <>
      <Loading isLoading={isLoading} />
      {mapView}
    </>
  );
}

MainMap.propTypes = {
  setModalBlock: func.isRequired,
  setModalVisible: func.isRequired,
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MainMap;
