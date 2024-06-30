import React from 'react';
import StackAppBarr from './../../components/sections/User/Appbars/StackAppBar';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import CarList from '../../components/sections/User/FlotteScreen/CarsList';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

function CarsListScreen(props) {
    const navigation = useNavigation()
    return (
        <View style={{flex: 1}}>
        <StackAppBarr title={'Toutes les voitures'} goBack={navigation.goBack}/>
         <ScrollView >
           <CarList isGrid={true} gridstyles={styles}/>
         </ScrollView>
        </View>
    );
}

export default CarsListScreen;




const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  gridItem: {
    width: '48%', // Ajustez la largeur pour définir le nombre de colonnes souhaité
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  gridItemText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
