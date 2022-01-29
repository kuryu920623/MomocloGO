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

import Icon from '../components/Icon';
import Button from '../components/Button';
import ProgressMeter from '../components/PogressMeter';
import ModalBase from '../components/ModalBase';
import AwardModal from '../components/AwardModal';

import GetAwardList from '../utils/AwardList';
import { FlatList } from 'react-native-gesture-handler';

async function PlayAudio() {
  const modalOpenAudio = require('../../assets/sounds/modal_open.mp3');
  const soundObj = new Audio.Sound();
  await soundObj.loadAsync(modalOpenAudio);
  await soundObj.playAsync();
}

let modalVisible;
let setModalVisible;
let modalBlock;
let setModalBlock;

function AwardIconSet(props) {
  const { obj } = props;
  return (
    <View style={iconSetStyles.awardsColView}>
      <TouchableOpacity
        style={iconSetStyles.iconView}
        onPress={() => {
          PlayAudio();
          setModalBlock(<AwardModal obj={obj} />);
          setModalVisible(true);
        }}
      >
        {obj.icon}
      </TouchableOpacity>
      <View style={iconSetStyles.progressView}>
        <ProgressMeter persentage={obj.getCount / obj.targetCount} />
      </View>
    </View>
  );
}

const iconSetStyles = {
  awardsColView: {
    width: '25%',
    alignItems: 'center',
  },
  iconView: {
    height: 50,
  },
  progressView: {
    height: 10,
  },
};

// タイトル
// 説明文
// 上限数
// 取得数function(SQL)
// アイコン

export default function AwardsScreen() {
  [modalVisible, setModalVisible] = useState(false);
  [modalBlock, setModalBlock] = useState(<Text>test</Text>);
  const [awardList, setAwardList] = useState([]);

  useEffect(async () => {
    setAwardList(await GetAwardList());
  }, []);

  return (
    <>
      <ModalBase onPress={setModalVisible} modalVisible={modalVisible}>
        {modalBlock}
      </ModalBase>

      <ScrollView>
        <LinearGradient
          style={styles.container}
          colors={['rgba(234,246,255,0.6)', 'rgba(183,225,254,0.4)']}
          start={{ x: 0.7, y: 0.7 }}
          end={{ x: 0.3, y: 0.3 }}
        >

          <View style={[styles.views, styles.rankingView]}>
            <View style={styles.leftLabelView}>
              <FontAwesome5 name="crown" size={48} color="#ffcc66" />
              <Text style={styles.rankLabelText}> Ranking</Text>
            </View>
            <View style={styles.rightLabelView}>
              <Text style={styles.rankText}> 123</Text>
              <Text style={styles.rankLabelText}> / 1234</Text>
            </View>
          </View>

          <View style={[styles.views, styles.rankingView]}>
            <View style={styles.leftLabelView}>
              <MaterialCommunityIcons name="medal-outline" size={48} color="#ffcc66" />
              <Text style={styles.rankLabelText}> Medals</Text>
            </View>
            <View style={styles.rightLabelView}>
              <Text style={styles.rankText}> 234</Text>
              <Text style={styles.rankLabelText}> / 2345</Text>
            </View>
          </View>

          <View style={styles.awardsRowView}>
            {awardList.map((obj) => <AwardIconSet obj={obj} />)}
          </View>

          <View style={styles.awardsRowView}>
            <View style={styles.awardsColView}>
              <FontAwesome5 name="award" size={48} color="#C47222" />
              <ProgressMeter persentage={1} />
            </View>
            <View style={styles.awardsColView}>
              <FontAwesome5 name="award" size={48} color="rgba(200,200,200,0.3)" />
              <ProgressMeter persentage={0.6} />
            </View>
            <View style={styles.awardsColView}>
              <FontAwesome5 name="award" size={48} color="rgba(200,200,200,0.3)" />
              <ProgressMeter persentage={0.3} />
            </View>
            <View style={styles.awardsColView}>
              <FontAwesome5 name="award" size={48} color="rgba(200,200,200,0.3)" />
              <ProgressMeter persentage={0.1} />
            </View>
          </View>

          <View style={styles.awardsRowView}>
            <View style={styles.awardsColView}>
              <Ionicons name="restaurant" size={48} color="#C47222" />
              <ProgressMeter persentage={1} />
            </View>
            <View style={styles.awardsColView}>
              <Ionicons name="restaurant" size={48} color="#A0A0A0" />
              <ProgressMeter persentage={1} />
            </View>
            <View style={styles.awardsColView}>
              <Ionicons name="restaurant" size={48} color="rgba(200,200,200,0.3)" />
              <ProgressMeter persentage={0.6} />
            </View>
            <View style={styles.awardsColView}>
              <Ionicons name="restaurant" size={48} color="rgba(200,200,200,0.3)" />
              <ProgressMeter persentage={0.3} />
            </View>
          </View>

          {/* <View style={styles.awardsRowView}>
            <AwardIconSet icon={<MaterialIcons name="wb-sunny" size={48} color="red" />} progress={1} />
            <AwardIconSet icon={<MaterialIcons name="wb-sunny" size={48} color="red" />} progress={1} />
            <AwardIconSet icon={<MaterialIcons name="wb-sunny" size={48} color="red" />} progress={1} />
            <AwardIconSet icon={<MaterialIcons name="wb-sunny" size={48} color="red" />} progress={1} />
          </View>

          <View style={styles.awardsRowView}>
            <AwardIconSet icon={<Icon name="sunflower" size={48} color="#ffcc66" />} progress={1} />
            <AwardIconSet icon={<Icon name="sunflower" size={48} color="rgba(200,200,200,0.3)" />} progress={0.7} />
            <AwardIconSet icon={<Icon name="sunflower" size={48} color="rgba(200,200,200,0.3)" />} progress={0.5} />
            <AwardIconSet icon={<Icon name="sunflower" size={48} color="rgba(200,200,200,0.3)" />} progress={0.3} />
          </View>

          <View style={styles.awardsRowView}>
            <AwardIconSet icon={<AntDesign name="heart" size={48} color="#F58E7D" />} progress={1} />
            <AwardIconSet icon={<AntDesign name="heart" size={48} color="#F58E7D" />} progress={1} />
            <AwardIconSet icon={<AntDesign name="heart" size={48} color="rgba(200,200,200,0.3)" />} progress={0.4} />
            <AwardIconSet icon={<AntDesign name="heart" size={48} color="rgba(200,200,200,0.3)" />} progress={0.2} />
          </View>

          <View style={styles.awardsRowView}>
            <AwardIconSet icon={<Icon name="eggplant" size={48} color="#7C2E69" />} progress={1} />
            <AwardIconSet icon={<Icon name="eggplant" size={48} color="#7C2E69" />} progress={1} />
            <AwardIconSet icon={<Icon name="eggplant" size={48} color="rgba(200,200,200,0.3)" />} progress={0.8} />
            <AwardIconSet icon={<Icon name="eggplant" size={48} color="rgba(200,200,200,0.3)" />} progress={0.4} />
          </View> */}

        </LinearGradient>
      </ScrollView>
    </>
  );
}

AwardsScreen.propTypes = {
};

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

  awardsContainer: {
    marginTop: 15,
  },
  awardsRowView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  awardsColView: {
    width: '25%',
    alignItems: 'center',
  },
});
