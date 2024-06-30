import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { Button, List } from 'react-native-paper';
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
<<<<<<< HEAD
const selectedEnfants = user ? children.filter((child) => child.isChecked):[];

   if (user) {
       return (
=======
const selectedEnfants = children.filter((child) => child.isChecked);

    return (
>>>>>>> 67b7d1f25d92989efde0379c003185b7c3941007
       <View style={styles.container}>
        <List.Subheader>
           Enfants ajoutés
        </List.Subheader>
          <List.Section>
            {
<<<<<<< HEAD
           children?.map((child , index)=>{
=======
           children.map((child , index)=>{
>>>>>>> 67b7d1f25d92989efde0379c003185b7c3941007
                 return(
                    <ChildItem key={index} child={child} onSwitchChange={handleSwitchChange}/>
                 )
             })
            }
              
        </List.Section>
<<<<<<< HEAD
         {selectedEnfants.length>0 && <View style={{padding: 12}}>
=======
          <View style={{padding: 12}}>
>>>>>>> 67b7d1f25d92989efde0379c003185b7c3941007
             <TouchableOpacity  onPress={()=>{
                  navigation.navigate('Suivre mes Enfants' , {selectedEnfants})
               }} style={styles.button}>
                 <Text style={{ color: 'white' , textAlign: 'center' }}>
                    Suivre mes enfants
                 </Text>
          

           </TouchableOpacity>
<<<<<<< HEAD
          </View>}
       </View>
    );
   }
=======
          </View>
       </View>
    );
>>>>>>> 67b7d1f25d92989efde0379c003185b7c3941007
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
