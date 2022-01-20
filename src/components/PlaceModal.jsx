import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import * as Location from 'expo-location';
import {
  bool, number, shape, string,
} from 'prop-types';

export default function PlaceModal(props) {
  const { placeObj } = props;
  const [distance, setDistance] = useState('');

  useEffect(() => {
    (async () => {
      const tmp = await Location.getCurrentPositionAsync({});
      const latDelta = Math.abs(placeObj.latitude - tmp.coords.latitude);
      const lonDelta = Math.abs(placeObj.longitude - tmp.coords.longitude);
      const dist = Math.sqrt(latDelta ** 2 + lonDelta ** 2);
      setDistance(dist);
    })();
  }, []);

  let button = <Text>not</Text>;
  if (placeObj.get_flg) {
    button = <Text>got</Text>;
  }

  return (
    <View>
      <View>
        <Text>{placeObj.name}</Text>
      </View>
      <View>
        <Text>{placeObj.detail}</Text>
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

PlaceModal.propTypes = {
  placeObj: shape({
    latitude: number,
    longitude: number,
    get_flg: bool,
    name: string,
    detail: string,
  }).isRequired,
};

const styles = StyleSheet.create({

});
