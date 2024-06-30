import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import StackAppBarr from '../../components/sections/User/Appbars/StackAppBar';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../assets/styles/colors';

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation()

  const handleSubmit = () => {
    // Vous pouvez implémenter ici la logique de soumission du formulaire
    console.log('Nom:', name);
    console.log('Email:', email);
    console.log('Téléphone:', phone);
    // Réinitialiser les champs après la soumission
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <View style={styles.container}>
       <StackAppBarr title={'Formulaire de Réservation'}  goBack={navigation.goBack}/>
       <View style={{padding: 10}}>
         <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Réserver</Text>
      </TouchableOpacity>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ReservationForm;
