import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import StackAppBarr from '../../components/sections/User/Appbars/StackAppBar';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import FlotteItem from '../../components/items/User/FlottesScreen/FlotteItem';

function FlottesScreen(props) {
    const navigation = useNavigation()
    const [flottes , setFlottes] = useState([])

    useEffect(()=>{
        const flottesData = [
            1 , 1 , 4 , 5 , 8 , 7 , 7 
        ]
        setFlottes(flottesData)
    },[])
    return (
        <View style={{flex: 1 }}>
       <StackAppBarr title={'Choisir une flotte'} goBack={navigation.goBack}/>
        <ScrollView style={{backgroundColor: '#ECF0F1'}}>
            <List.Section>
             {
                flottes&&flottes.map((item , index)=>{
                    return(
                        <FlotteItem  key={index}/>
                    )
                })
             }
            </List.Section>
        </ScrollView>
            
        </View>
    );
}

export default FlottesScreen;