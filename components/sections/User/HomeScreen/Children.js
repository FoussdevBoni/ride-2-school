import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { ActivityIndicator, Button, List } from 'react-native-paper';
import ChildItem from '../../../items/User/HomeSScreen/ChildItem';
import axios from 'axios';
import { getChildren } from '../../../../utils/api';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../../assets/styles/colors';
import { useNavigation } from '@react-navigation/native';

function Children({user}) {
   const [children , setChildren]= useState([])
   const navigation = useNavigation()
    console.log('moi' , user)
  async function getMyChildren() {
      try {
         const response = await axios.get(getChildren+'/'+user?.id)
         console.log(response.data)
         setChildren(response.data)
      } catch (error) {
         alert("Une erreur s'est produite")
         console.log(getChildren+'/'+user?.id)
      }
   }
    useEffect(()=>{
       getMyChildren()
    },[])


    const handleSwitchChange = (id, newValue) => {
  setChildren((prevEnfants) =>
    prevEnfants.map((enfant) =>
      enfant.id === id ? { ...enfant, isChecked: newValue } : enfant
    )
  );
};

  console.log(children)
const selectedEnfants = user ? children.filter((child) => child.isChecked):[];

   if (user) {
       return (
        <>
          {
            children.length > 0 ?   <View style={styles.container}>
        <List.Subheader>
           Enfants ajoutés
        </List.Subheader>
          <List.Section>
            {
           children?.map((child , index)=>{
                 return(
                    <ChildItem key={index} child={child} onSwitchChange={handleSwitchChange}/>
                 )
             })
            }
              
        </List.Section>
         {selectedEnfants.length>0 && <View style={{padding: 12}}>
             <TouchableOpacity  onPress={()=>{
                  navigation.navigate('Suivre mes Enfants' , {selectedEnfants})
               }} style={styles.button}>
                 <Text style={{ color: 'white' , textAlign: 'center' }}>
                    Suivre mes enfants
                 </Text>
          

           </TouchableOpacity>
          </View>}
       </View>: <View style={{flex: 1 , justifyContent: 'center' , alignItems: 'center'}}>
          <ActivityIndicator color={colors.primary} size={40}/>
       </View>
          }
        </>
    );
   }
}

export default Children;

const styles = StyleSheet.create({
  container: {
     flex: 1
  },
    button: {
    marginVertical: 10,
    backgroundColor: colors.primary,
    color: 'white',
    marginBottom:50,
    height:40,
     justifyContent:'center',
     borderRadius: 20
  },
});
