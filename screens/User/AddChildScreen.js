import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { colors } from '../../../assets/styles/colors';
import StackAppBarr from '../../../components/sections/User/Appbars/StackAppBar';
import { getSchoolsFromAdmins } from '../../../functions/getShools';
import { takePhoto } from '../../../functions/uploadPhoto';
import {  Select } from 'native-base';
import { saveSchools } from '../../../redurcer/schoolsSlice';

const ChildForm = ({user}) => {
  const [school, setSchool] = useState(''); 
  const [schools , setSchools] = useState([])
  const navigation = useNavigation()
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
   const [shcooId , setSchoolId]= useState()
  const [service, setService] = React.useState("");
  const dispatch = useDispatch()
  const [child, setChild] = useState({
   abonnement: '65fad65b5c542bf7f4a33009',
   photo: 'Ma photo',
   
  });


  const handleChoosePhoto = async () => {
          if (permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
            requestPermission()
          }else{
            const { uploadResp } = await   takePhoto('library', 'children' , user?._id) 

            setChild({
              ...child,
              photo: uploadResp?.downloadUrl
            })
          }
  };



  const handleChange = (key, value) => {
      setChild({
      ...child,
      [key]: value
    })
  }


  const handleNext = () => {
    console.log(child)
    navigation.navigate('itineraire-config' , {child})
  };

 

useEffect(()=>{
   async function fetchSchools() {
    try {
        const schools = await getSchoolsFromAdmins();
        console.log(schools)
        setSchools(schools); 
        dispatch(saveSchools(schools))
        // Faire quelque chose avec les écoles récupérées
    } catch (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la récupération des écoles:", error);
    }
  }

  fetchSchools()
  
}, [])
  return (
   <View style={{flex: 1}}>
    <StackAppBarr  title={'Ajouter un enfant'} goBack={navigation.goBack}/>
     {
      schools.length>0?( <ScrollView style={styles.container}>
      <View style={styles.selected}>
         <Select selectedValue={school} minWidth="200" accessibilityLabel={school.nomEcole} placeholder={school.nomEcole} _selectedItem={{
        bg: "teal.600",
        endIcon: null
      }} mt={1} onValueChange={itemValue =>{
         setSchool(itemValue)
        handleChange('ecole', itemValue._id)
      }}>
        {
          schools.map((shool)=>{
             return(
              
                <Select.Item label={shool.nomEcole} value={shool} />
            
            )
          } 
         
          )
        }
         
        </Select>
      </View>
      <TextInput
        label="Nom et prénom(s)"
        onChangeText={text => handleChange('nom', text)}
        style={styles.input}
      />
      <TextInput
        label="email"
        onChangeText={text => handleChange('email', text)}
        style={styles.input}
      />
      <TextInput
        label="Classe de l'enfant"
        onChangeText={text => handleChange('class', text)}
        style={styles.input}
      />
      <TextInput
        label="Date de naissance"
        onChangeText={text => handleChange('dateNaissance', text)}
        style={styles.input}
      />
      <TextInput
        label="Heures de sortie"
        onChangeText={text => handleChange('heureSortie', text)}
        style={styles.input}
      />
       <TextInput
        label="Heures de départ"
        onChangeText={text => handleChange('heureDepart', text)}
        style={styles.input}
      />
       
      <TouchableOpacity mode="contained" onPress={()=>{
        handleChoosePhoto()
       }} style={[styles.button, {height:40, justifyContent:'center'}]}>
          {
             child?.photo!=="" ?  <Text style={{ color: 'white', textAlign:'center' , textTransform: 'none' }}>          Ajouter  une photo
        </Text>: <ActivityIndicator color='white'  style={{ color: 'white', textAlign:'center' , textTransform: 'none' }} size={20}/>
          }
      </TouchableOpacity>
     
        <TouchableOpacity  onPress={()=>{handleNext()}} style={[styles.button, {height:40, justifyContent:'center'}]} >
          <Text style={{ color: 'white', textAlign:'center' , textTransform: 'none' }}>
            Suivant
          </Text>
        </TouchableOpacity>
      

    </ScrollView>): <View style={{flex: 1 , justifyContent: 'center' , alignItems: 'center'}}>
        <ActivityIndicator color={colors.primary} size={50}/>
    </View>
     }
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop:20
  },
  selected: {
    marginVertical: 10,
    borderColor: 'gray',
    borderRadius: 2,
    borderBottomWidth: 1
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    backgroundColor: colors.primary,
    color: 'white',
    marginBottom:50
  },
});

export default ChildForm;
