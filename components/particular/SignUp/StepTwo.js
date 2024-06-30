import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { useState, } from 'react';
import axios from 'axios';
import { createParent } from '../../../utils/api';
import { isConected, login } from '../../../redurcer/userSlice';
import { colors } from '../../../assets/styles/colors';

const StepTwo = () => {
  const navigation  = useNavigation()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})
  const [error, setError] = useState('')
  const route = useRoute()

  const {cni , phone , nom} = route.params

  const handleChange = (key, value) => {
    setUser({
      ...user, [key]: value,
      cni,
      phone,
      nom
    })
  }

  const handleLogin = async () => {
    setIsLoading(true)
 
      try {
        const {data} = await axios.post(createParent, user)
        console.log(data);
        const userData = {
          ...data,
          id: data._id
        }

        dispatch(login(userData))
        dispatch(isConected())
        setIsLoading(false)
      } catch (err) {
        alert('la créetion de compte échouée')
        console.log(err);
        setIsLoading(false)
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
        <Text style={styles.navBarTest}>Créer un compte(2/2)</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textError} >{error}</Text>  
         <TextInput
          label="Votre adresse e-mail"
          onChangeText={(text) => handleChange('email', text)}
          style={styles.input}
        />
        <TextInput
          label="Créer un mot  de passe"
          secureTextEntry
          onChangeText={(text) => handleChange('password', text)}
          style={styles.input}
        />
         <TextInput
          label="Confirmer le mot  de passe"
          secureTextEntry
          onChangeText={(text) => handleChange('password', text)}
          style={styles.input}
        />
        <TouchableOpacity mode="contained" onPress={handleLogin} style={styles.button}>
          {isLoading ? <ActivityIndicator size="large" color="white" /> :
            <Text style={{ color: 'white' }}>
              S'inscrire
            </Text>
          }

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

export default StepTwo;