import React from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import { number, shape } from 'prop-types';
import { Audio } from 'expo-av';
import TweetButton from './TweetButton';

async function PlayAudio(file) {
  const soundObj = new Audio.Sound();
  await soundObj.loadAsync(file);
  await soundObj.playAsync();
}

export default function AwardModal(props) {
  const { obj, isFriend, getCount, targetCount } = props;
  let button;
  if (getCount >= targetCount && !isFriend) {
    button = (
      <TweetButton
        tweetText={`ももクロGOで「${obj.description}」を達成し、【${obj.title}】メダルを獲得しました!`}
        size={20}
        width={120}
      />
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.views]}>
        <Text style={styles.titleText}>{obj.title}</Text>
      </View>
      <View style={[styles.views]}>
        <Text>{obj.description}</Text>
      </View>
      <View style={styles.progressView}>
        <Text style={styles.progressText}>{`${Math.min(getCount, targetCount)} / ${targetCount}`}</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        {button}
      </View>
    </ScrollView>
  );
}

AwardModal.propTypes = {
  obj: shape().isRequired,
  getCount: number.isRequired,
  targetCount: number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 35,
  },
  views: {
    marginBottom: 15,
  },
  titleText: {
    fontSize: 24,
  },
  distanceView: {
    alignItems: 'flex-end',
  },
  getButtonComponent: {
    alignItems: 'center',
  },
  progressView: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 25,
  },
});
