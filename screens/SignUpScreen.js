import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import { colors } from '../assets/styles/colors';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import CountrySelector from '../components/sections/CountrySelector';
import { CountryButton, CountryPicker } from 'react-native-country-codes-picker';
import Br from '../components/widgets/br/br';
function ListHeaderComponent({countries, lang, onPress}) {
    return (
        <View
            style={{
                paddingBottom: 20,
            }}
        >
            
            {countries?.map((country, index) => {
                return (
                    <CountryButton key={index} item={country} name={country?.name?.[lang || 'fr']} onPress={() => onPress(country)} />
                )
            })}
        </View>
    )
}
export default function Register() {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [form, setForm] = useState({
    nom: '',
    email: '',
    password: '',
    country: '',
    city: '',
    idType: '',
    phoneNumber: '',
  });

  function loginScreen() {
    navigation.navigate('connexion');
  }

  

  return (
    <ImageBackground 
      source={require('../assets/images/bg.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <ScrollView style={{ flex: 1 }}>
        <StatusBar style="light" />

        <View style={styles.container}>
           <View style={styles.header}>
            <TouchableOpacity onPress={navigation.goBack} style={styles.headerBack}>
              <Ionicons
                color={'white'}
                name="chevron-back-outline"
                size={30} />
            </TouchableOpacity>

            <Text style={styles.title}>
                S'inscrire
            </Text>

            
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Ionicons name="person-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={nom => setForm({ ...form, nom })}
                placeholder="Nom"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                value={form.nom} />
            </View>
            <View style={styles.input}>
              <Ionicons name="person" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={nom => setForm({ ...form, nom })}
                placeholder="Prénom"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                value={form.nom} />
            </View>


            <View style={styles.input}>
              <Ionicons name="mail-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="Adresse email"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                value={form.email} />
            </View>

          

            <View style={styles.input}>
              <Ionicons name="globe-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={country => setForm({ ...form, country })}
                placeholder="Pays"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                value={form.country}
                 onFocus={()=>{
                  setShow(true)
                 }}
                 />
              
            </View>
              <CountryPicker
        show={show}
         lang='fr'
        pickerButtonOnPress={(item) => {
          console.log(item)
          setForm((states)=>({
            ...states,
            country: item.name.fr
          }))
          setCountryCode(item.dial_code);
          setShow(false);
        }}
        ListHeaderComponent={ListHeaderComponent}
        popularCountries={['en', 'ua', 'pl']}
      />
            <View style={styles.input}>
              <Ionicons name="location-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={city => setForm({ ...form, city })}
                placeholder="Ville"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                value={form.city} />
            </View>
            <View style={styles.input}>
              <Ionicons name="call-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <Text style={{color:'white',}}>
                {countryCode||'+237'}
              </Text>
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={phoneNumber => setForm({ ...form, phoneNumber })}
                placeholder="Numéro de téléphone"
                placeholderTextColor="#ffffff"
                style={[styles.inputControl]}
                keyboardType="phone-pad"
                value={form.phoneNumber} />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={()=>{
                navigation.navigate('inscription2')
              }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>
                    Suivant
                  </Text>
                </View>
              </TouchableOpacity>
                 
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#3498db',
    opacity: 0.8,
  },
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 8,
    marginLeft: 8
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row'
  },
  headerBack: {
    padding: 8,
    paddingTop: 15,
    position: 'relative',
    marginLeft: -16,
    marginBottom: 6,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputControl: {
    flex: 1,
    height: 50,
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0)', 
    marginLeft: 5
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color:colors.primary,
  },
    secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  secondaryBtnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color:'white',
  },
});

