import { number } from 'prop-types';
import { string } from 'prop-types';
import React from 'react';
import {
  Linking, Text, View, StyleSheet, TouchableOpacity,
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
  const {
    tweetText, displayText, size, width,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.button, { width }]}
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
  width: number,
};
TweetButton.defaultProps = {
  displayText: 'Tweet',
  size: 24,
  width: null,
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
