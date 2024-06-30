import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';

function Menu(props) {
   const MenuItem = ({item})=>{
    const navigation = useNavigation()
      return (
        <List.Section>
           <TouchableOpacity onPress={()=>{
            navigation.navigate('repas-cantine')
           }}>
               <List.Item title={item.name} left={()=>(
                <Ionicons size={20} name={item.icon}/>
            )} />
           </TouchableOpacity>
        </List.Section>
    );
   }
   const menu = [
    {
        icon: 'fast-food',
        name: 'Service cantine',
        route: 'cantine'
    },
    {
     icon: 'people',
     name: 'Mes enfants'
    },
      {
     icon: 'time',
     name: 'Historique'
    },

   ]

   return (
    <ScrollView style={{padding: 20}}>
        {
            menu.map((item)=>{
                return(
                    <MenuItem item={item}/>
                )
            })
        }
    </ScrollView>
   )
}

export default Menu;