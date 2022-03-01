import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {
  FontAwesome5, MaterialCommunityIcons, Ionicons, MaterialIcons, AntDesign,
} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { shape } from 'prop-types';

import Icon from '../components/Icon';
import ProgressMeter from '../components/PogressMeter';
import ModalBase from '../components/ModalBase';
import AwardModal from '../components/AwardModal';

import GetAwardList from '../utils/AwardList';

const modalOpenAudio = require('../../assets/sounds/modal_open.mp3');

let modalVisible;
let setModalVisible;
let modalBlock;
let setModalBlock;

async function PlayAudio() {
  const soundObj = new Audio.Sound();
  await soundObj.loadAsync(modalOpenAudio);
  await soundObj.playAsync();
}

function AwardIconSet(props) {
  const { obj } = props;
  const [getCount, setGetCount] = useState(0);
  const [iconColor, setIconColor] = useState('rgba(200,200,200,0.3)');
  useEffect(async () => {
    const db = SQLite.openDatabase('test.db');
    db.transaction((tx) => {
      tx.executeSql(
        obj.getCountSQL,
        [],
        (_, res) => {
          setGetCount(res.rows._array[0].count);
          if (res.rows._array[0].count >= obj.targetCount) {
            setIconColor(obj.iconColor);
          }
        },
      );
    });
    setGetCount(0);
  }, []);

  return (
    <View style={iconSetStyles.awardsColView}>
      <TouchableOpacity
        style={iconSetStyles.iconView}
        onPress={() => {
          PlayAudio();
          setModalBlock(<AwardModal obj={obj} getCount={getCount} targetCount={obj.targetCount} />);
          setModalVisible(true);
        }}
      >
        <Icon provider={obj.iconProvider} name={obj.iconName} color={iconColor} size={36} />
      </TouchableOpacity>
      <View style={iconSetStyles.progressView}>
        <ProgressMeter persentage={getCount / obj.targetCount} />
      </View>
    </View>
  );
}

AwardIconSet.propTypes = {
  obj: shape().isRequired,
};

const iconSetStyles = {
  awardsColView: {
    width: '25%',
    alignItems: 'center',
    marginTop: 20,
  },
  iconView: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,

  },
  progressView: {
    height: 10,
  },
};

export default function AwardsScreen() {
  [modalVisible, setModalVisible] = useState(false);
  [modalBlock, setModalBlock] = useState(<Text>test</Text>);
  const [getMedalCount, setGetMedalCount] = useState(0);
  const [allMedalCount, setAllMedalCount] = useState(0);
  const [userRanking, setUserRanking] = useState(0);
  const [allUserCount, setAllUserCount] = useState(0);
  const [awardList, setAwardList] = useState([]);

  useEffect(async () => {
    setAwardList(await GetAwardList());
    const db = SQLite.openDatabase('test.db');
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT COUNT(get_flg = 1) AS getCount, COUNT(1) AS allCount FROM place_master;',
        [],
        (_, res) => {
          setGetMedalCount(res.rows._array[0].getCount);
          setAllMedalCount(res.rows._array[0].allCount);
        },
      );
    });

    // firebaseからユーザーランキング取得する処理
    // setUserRanking(123)
    // setAllUserCount(456)
  }, []);

  return (
    <>
      <ModalBase onPress={setModalVisible} modalVisible={modalVisible}>
        {modalBlock}
      </ModalBase>

      <ScrollView>
        <LinearGradient
          style={styles.container}
          colors={['rgba(234,246,255,1)', 'rgba(183,225,255,0.5)']}
          start={{ x: 0.7, y: 0.7 }}
          end={{ x: 0.3, y: 0.3 }}
        >

          <View style={[styles.views, styles.rankingView]}>
            <View style={styles.leftLabelView}>
              <FontAwesome5 name="crown" size={48} color="#ffcc66" style={styles.test} />
              <Text style={styles.rankLabelText}> Ranking</Text>
            </View>
            <View style={styles.rightLabelView}>
              <Text style={styles.rankText}>{userRanking}</Text>
              <Text style={styles.rankLabelText}>{` / ${allUserCount}`}</Text>
            </View>
          </View>

          <View style={[styles.views, styles.rankingView]}>
            <View style={styles.leftLabelView}>
              <MaterialCommunityIcons name="medal-outline" size={48} color="#ffcc66" />
              <Text style={styles.rankLabelText}> Medals</Text>
            </View>
            <View style={styles.rightLabelView}>
              <Text style={styles.rankText}>{` ${getMedalCount}`}</Text>
              <Text style={styles.rankLabelText}>{` / ${allMedalCount}`}</Text>
            </View>
          </View>

          <View style={styles.awardsRowView}>
            {awardList.map((obj, index) => <AwardIconSet obj={obj} key={index} />)}
          </View>

        </LinearGradient>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 35,
  },
  views: {
    marginBottom: 20,
    alignItems: 'center',
  },
  rankingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftLabelView: {
    alignItems: 'center',
    width: '50%',
    paddingLeft: 30,
  },
  rightLabelView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '50%',
    paddingRight: 30,
  },
  rankLabelText: {
    fontSize: 16,
  },
  rankText: {
    fontSize: 40,
  },

  awardsRowView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
});
