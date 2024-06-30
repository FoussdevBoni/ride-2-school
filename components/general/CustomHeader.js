import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../assets/styles/colors';

const Stack = createStackNavigator();

const CustomHeader = ({ title }) => {
  return (
    <View style={{ height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
      <Ionicons name={'arrow-back-outline'} size={24} color="black" />

      <Text style={{ fontSize: 20 , textAlign:'center', color:'white' }}>{title}</Text>
    </View>
  );
};

export default CustomHeader 