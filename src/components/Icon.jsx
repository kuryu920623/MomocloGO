import React from 'react';
import {
  createIconSetFromIcoMoon,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  AntDesign,
  Feather,
} from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { number, string } from 'prop-types';

import icomoon from '../../assets/svg/icomoon.ttf';
import selection from '../../assets/svg/selection.json';

export default function Icon(props) {
  const {
    provider, name, size, color,
  } = props;

  if (provider === 'FontAwesome5') { return <FontAwesome5 name={name} size={size} color={color} />; }
  if (provider === 'MaterialCommunityIcons') { return <MaterialCommunityIcons name={name} size={size} color={color} />; }
  if (provider === 'Ionicons') { return <Ionicons name={name} size={size} color={color} />; }
  if (provider === 'MaterialIcons') { return <MaterialIcons name={name} size={size} color={color} />; }
  if (provider === 'AntDesign') { return <AntDesign name={name} size={size} color={color} />; }
  if (provider === 'Feather') { return <Feather name={name} size={size} color={color} />; }

  const [fontLoaded] = useFonts({ icomoon });
  const CustomIcon = createIconSetFromIcoMoon(selection);
  if (!fontLoaded) {
    return null;
  }
  return <CustomIcon name={name} size={size} color={color} />;
}

Icon.propTypes = {
  provider: string,
  name: string,
  size: number,
  color: string,
};
Icon.defaultProps = {
  provider: 'custom',
  name: null,
  size: 18,
  color: 'black',
};

export function ProviderIcon(props) {
  const { provider, size, color } = props;
  if (provider === 'FontAwesome5') { return <FontAwesome5 size={size} color={color} />; }
  if (provider === 'MaterialCommunityIcons') { return <MaterialCommunityIcons size={size} color={color} />; }
  if (provider === 'Ionicons') { return <Ionicons size={size} color={color} />; }
  if (provider === 'MaterialIcons') { return <MaterialIcons size={size} color={color} />; }
  if (provider === 'AntDesign') { return <AntDesign size={size} color={color} />; }
}

ProviderIcon.propTypes = {
  provider: string.isRequired,
  size: number,
  color: string,
};
ProviderIcon.defaultProps = {
  size: 18,
  color: 'black',
};
