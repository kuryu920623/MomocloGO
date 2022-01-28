import React from 'react';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { number, string } from 'prop-types';

import icomoon from '../../assets/svg/icomoon.ttf';
import selection from '../../assets/svg/selection.json';

export default function Icon(props) {
  const [fontLoaded] = useFonts({ icomoon });
  const { name, size, color } = props;
  const CustomIcon = createIconSetFromIcoMoon(selection);
  if (!fontLoaded) {
    return null;
  }
  return <CustomIcon name={name} size={size} color={color} />;
}

Icon.propTypes = {
  name: string.isRequired,
  size: number,
  color: string,
};

Icon.defaultProps = {
  size: 18,
  color: 'black',
};
