import React from 'react';
import { shape } from 'prop-types';
import AwardsScreen from './AwardsScreen';

export default function FriendAwardScreen(props) {
  const { flags, userId } = props.route.params;
  return (
    <AwardsScreen
      friendsFlags={flags}
      friendsId={userId}
    />
  );
}

FriendAwardScreen.propTypes = {
  route: shape().isRequired,
};
