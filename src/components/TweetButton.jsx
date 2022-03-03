import { number } from 'prop-types';
import { string } from 'prop-types';
import React from 'react';
import {
  Linking, Text, View, StyleSheet, TouchableOpacity, Animated, Button,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

async function handlePress(tweetText) {
  const supported = await Linking.canOpenURL('https://twitter.com/home');
  const text = `${encodeURI(tweetText)}%0D%0A%23${encodeURI('ももクロGO')}`;
  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(`https://twitter.com/intent/tweet?text=${text}`);
  }
}

export default function TweetButton(props) {
  const { tweetText, displayText, size } = props;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => { handlePress(tweetText); }}
    >
      <AntDesign name="twitter" size={size} color="white" />
      <Text style={[styles.text, { fontSize: size }]}>{displayText}</Text>
    </TouchableOpacity>
  );
}

TweetButton.propTypes = {
  tweetText: string.isRequired,
  displayText: string,
  size: number,
};
TweetButton.defaultProps = {
  displayText: 'ツイート',
  size: 24,
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00acee',
    borderRadius: 100,
    margin: 5,
  },
  text: {
    color: 'white',
    padding: 5,
  },
});
