import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { colors } from '../../../../assets/styles/colors';

const StackAppBarr = ({title , goBack}) => (
<<<<<<< HEAD
  <Appbar.Header style={{ backgroundColor: colors.primary ,     marginTop: 40
}}>
=======
  <Appbar.Header style={{ backgroundColor: colors.primary}}>
>>>>>>> 67b7d1f25d92989efde0379c003185b7c3941007
    <Appbar.BackAction onPress={goBack}  color="white" />
    <Appbar.Content title={title} titleStyle={{ color: 'white' }}/>
   
  </Appbar.Header>
);

export default StackAppBarr