import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { colors } from '../../../../assets/styles/colors';

const StackAppBarr = ({title , goBack}) => (
  <Appbar.Header style={{ backgroundColor: colors.primary ,     marginTop: 40
}}>
    <Appbar.BackAction onPress={goBack}  color="white" />
    <Appbar.Content title={title} titleStyle={{ color: 'white' }}/>
   
  </Appbar.Header>
);

export default StackAppBarr