import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Divider, List, Paragraph, Switch, Title } from 'react-native-paper';
import { getChildren } from '../../../../utils/api';
import { useSelector } from 'react-redux';




function ChildItem({user , child , onSwitchChange}) {
const navigation = useNavigation()
   const schools = useSelector((state)=> state.schools.schools)
   const school  = schools.filter(school=>(school._id===child?.ecole))
            console.log('checked',child._id)


    return (
        <TouchableOpacity  onPress={()=>{
           if (child.isChecked) {
                onSwitchChange(child.id , false)
           }else{
             onSwitchChange(child.id , true)
           }
        }} style= {{ paddingHorizontal: 8  }}>
            <List.Item style= {{backgroundColor: 'white', marginVertical: 1}} title = {child?.nom} left={()=>(
                <View style={styles.profilContainer}>
                        <Image source={{uri: child.photoo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIdTCYywEuvhTcpaCBVppRUEWWWqd71grN-Q&s' }} style={styles.driverProfil}/>
                </View>
            )}   description={school[0]?.nomEcole||''} right={()=>(
               
                <View style={styles.signal}>

                </View>
            )}>

            </List.Item>
            <Divider />
        </TouchableOpacity>
    );
}

export default ChildItem;




const styles = StyleSheet.create({
    driverProfil:{
      width: 50,
      height: 50,
      borderRadius: 25,
      
    },
    profilContainer: {
        padding: 5
    },
    signal: {
      width: 20,
      height: 20,
      backgroundColor: 'orange',
      borderRadius: 20,
      marginTop: 20
    }
})