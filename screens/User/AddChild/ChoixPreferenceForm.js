import React, { useState } from 'react';
import { CheckBox, Icon } from '@rneui/themed';
import { View, StyleSheet , Text, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';

import { colors } from '../../../assets/styles/colors';
import StackAppBarr from '../../../components/sections/User/Appbars/StackAppBar';
import { useNavigation } from '@react-navigation/native';

const ChoixPreferenceForm  = () => {
const [check1, setCheck1] = useState(false);
const [check2, setCheck2] = useState(false);
const [check3, setCheck3] = useState(false);
const [check4, setCheck4] = useState(false);
const navigation = useNavigation()
const handleSave = () => {
navigation.navigate('itineraire-config')
};

return (
<View style={{flex: 1}}>
      <StackAppBarr title={'Choix de préférences'} goBack={navigation.goBack}/>
    <View style={styles.container}>
    <CheckBox
      center
      title="Aller-Retour "
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={check1}
      onPress={() => setCheck1(!check1)}
    />

    <CheckBox
      center
      title="Aller unique "
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={check2}
      onPress={() => setCheck2(!check2)}
    />

    <CheckBox
      center
         title="Retour unique "
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={check3}
      onPress={() => setCheck3(!check3)}
    />
      <TouchableOpacity  onPress={()=>{handleSave()}} style={[styles.button, {height:40, justifyContent:'center'}]} >
          <Text style={{ color: 'white', textAlign:'center' }}>
            Suivant
          </Text>
        </TouchableOpacity>
  </View>
</View>
);
};

export default ChoixPreferenceForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginVertical: 10,
  },
   button: {
    marginVertical: 10,
    backgroundColor: colors.primary,
        color: 'white'

  },
});