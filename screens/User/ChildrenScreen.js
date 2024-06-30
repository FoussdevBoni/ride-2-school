import React from 'react';
import { View } from 'react-native';
import Children from '../../components/sections/User/HomeScreen/Children';

function ChildrenScreen({user}) {
  return (
    <View style={{flex: 1}}>
       <Children user={user} />
    </View>
  );
}

export default ChildrenScreen;