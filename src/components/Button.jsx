import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { func, shape } from 'prop-types';

export default function Button(props) {
  const {
    label, onPress, containerStyle, labelStyle,
  } = props;
  return (
    <TouchableOpacity style={[styles.buttonContainer, containerStyle]} onPress={onPress}>
      <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: func,
  containerStyle: shape(),
  labelStyle: shape(),
};

Button.defaultProps = {
  onPress: null,
  containerStyle: null,
  labelStyle: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#467FE3',
    borderRadius: 4,
    // alignSelf: 'flex-start',
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
