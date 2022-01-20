import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import * as Location from 'expo-location';
import { func } from 'prop-types';

export default function PlaceModal(props) {
  const { obj } = props;
  const [distance, setDistance] = useState('');

  useEffect(() => {
    (async () => {
      const tmp = await Location.getCurrentPositionAsync({});
      const latDelta = Math.abs(obj.latitude - tmp.coords.latitude);
      const lonDelta = Math.abs(obj.longitude - tmp.coords.longitude);
      const dist = Math.sqrt(latDelta ** 2 + lonDelta ** 2);
      setDistance(dist);
    })();
  }, []);

  let button = <Text>not</Text>;
  if (obj.get_flg) {
    button = <Text>got</Text>;
  }

  return (
    <View>
      <View>
        <Text>{obj.name}</Text>
      </View>
      <View>
        <Text>{obj.detail}</Text>
      </View>
      <View>
        <Text>{distance}</Text>
      </View>
      <View>
        {button}
      </View>
    </View>
  );
}
