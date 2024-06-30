import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import StackAppBarr from '../../components/sections/User/Appbars/StackAppBar';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import DriverItem from '../../components/items/User/FlotteScreen/DriverItem';

function DriversScreen({flotte  , user}) {
    const navigation = useNavigation()
    const [drivers , setDrivers] = useState([])

    useEffect(()=>{
        const driversData = [
            1 , 1 , 4 , 5 , 8 , 7 , 7 
        ]
        setDrivers(driversData)
    },[])
    return (
        <View style={{flex: 1 }}>
       <StackAppBarr title={'Choisir un chauffeur'} goBack={navigation.goBack}/>
        <ScrollView style={{backgroundColor: '#ECF0F1'}}>
            <List.Section>
             {
                drivers&&drivers.map((item , index)=>{
                    return(
                        <DriverItem  key={index}/>
                    )
                })
             }
            </List.Section>
        </ScrollView>
            
        </View>
    );
}

export default DriversScreen;