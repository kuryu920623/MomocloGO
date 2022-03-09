import React from 'react';
import { shape } from 'prop-types';
import AwardsScreen from './AwardsScreen';

export default function FriendAwardScreen(props) {
  const { flags, userId, displayName } = props.route.params;
  return (
    <AwardsScreen
      friendsFlags={flags}
      friendsId={userId}
      friendsName={displayName}
    />
  );
}

FriendAwardScreen.propTypes = {
  route: shape().isRequired,
};
