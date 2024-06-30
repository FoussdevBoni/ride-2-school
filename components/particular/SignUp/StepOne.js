import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'
import { useState, } from 'react';
import { colors } from '../../../assets/styles/colors';
const StepOne = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState({})
  const [error, setError] = useState('')
  const handleChange = (key, value) => {
    setUser({
      ...user, [key]: value
    })
  }

  const handleNext =  () => {
   if (user.nom===undefined||user.nom==="") {
   setError('Veillez renseigner votre nom et prénom')
   }else if (user.phone===undefined||user.phone==="") {
         setError('Veillez renseigner votre numéro de téléphone')

   }else if (user.cni===undefined||user.cni==="") {
     setError('Veillez renseigner votre numéro de CNI')
   }else {
      navigation.navigate('step2' , user)
   }
      
  };

  return (
    <View style={styles.space}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navbarGoBack} onPress={() => navigation.goBack()}>
          <FAIcon
            style={{ fontSize: hp("4%") }}
            color={"white"}
            name={'angle-left'} />
        </TouchableOpacity>
        <Text style={styles.navBarTest}>Créer un compte(1/2)</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textError} >{error}</Text>
        <TextInput
          label="Votre nom et prénom"
          onChangeText={(text) => handleChange('nom', text)}
          style={styles.input}
        />
        <TextInput
          label="le numéro de la  CNI"
          onChangeText={(text) => handleChange('cni', text)}
          style={styles.input}
        />
        <TextInput
          label="Votre  numéro de téléphone"
          onChangeText={(text) => handleChange('phone', text)}
          style={styles.input}
        />
      
        <TouchableOpacity mode="contained" onPress={handleNext} style={styles.button}>
         
            <Text style={{ color: 'white' }}>
              suivant
            </Text>
          
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  space: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  navbarGoBack: {
    marginTop: 10,
    marginLeft: 20
  },
  navbarGoBackText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navBarTest: {
    color: 'white',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 95
  },
  navBar: {
    zIndex: 999,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textError: {
    color: 'red',
    textAlign: 'center',
    fontSize: 15
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: colors.primary

  },
});

export default StepOne;