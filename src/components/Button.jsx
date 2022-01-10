import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { string, func } from 'prop-types';

export default function Button(props) {
  const { children, onPress } = props;
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonLabel}>{children}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  children: string.isRequired,
  onPress: func,
};

Button.defaultProps = {
  onPress: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#467FE3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 14,
    height: 32,
    paddingVertical: 8,
    paddingHorizontal: 18,
    color: '#FFFFFF',
  },
});
