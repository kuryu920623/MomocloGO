import React, { useState } from 'react';
import AwardsScreen from './AwardsScreen';

export default function FriendAwardScreen(props) {
  console.log(props);
  const { flags, userId } = props.route.params;
  const isFriend = true;
  return (
    <AwardsScreen
      friendsFlags={flags}
      friendsId={userId}
    />
  );
}
