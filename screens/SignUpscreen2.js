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
  Dimensions,
} from 'react-native';
import { colors } from '../assets/styles/colors';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import CountrySelector from '../components/sections/CountrySelector';
import { CountryButton, CountryPicker } from 'react-native-country-codes-picker';
import Br from '../components/widgets/br/br';
import { ActivityIndicator, Switch } from 'react-native-paper';
import axios from 'axios';
import { createParent } from '../utils/api';
import { useDispatch } from 'react-redux';
import { isConected, login } from '../redurcer/userSlice';
import { FlatList } from 'react-native';

export default function Register2() {
  const navigation = useNavigation();
 const [isAgreed, setIsAgreed] = useState(false);
  const [btnopacity, setBtnopacity] = useState(0.5);
  const route = useRoute()
  const {userData} = route.params
  const [form, setForm] = useState({
    password: '',
    idType: '',
    cni: '',
    ...userData
  });
  const dispatch = useDispatch()
   const [loading , setLoading ]= useState(false)
  function loginScreen() {
    navigation.navigate('connexion');
  }
    const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setFilteredSuggestions([]);
      setQuery(item);
      setForm({ ...form, idType: item })
    }}>
      <View style={styles.suggestionItem}>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSignUp = async ()=>{
    setLoading(true)
    console.log(form)
    try {
      const response = await axios.post(createParent , form)
      const data = response.data
      console.log(data)
       setLoading(false)
       dispatch(login(data))
       dispatch(isConected())
    } catch (error) {
       setLoading(false)
      console.log(error)
    }
  }

  const idTypes = ["Carte d'identité" , "Passeport" , "Autres"] 
  const handleFilter = (value) => {
    setQuery(value);
    const filtered = idTypes.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(value ? filtered : []);
  };

  return (
    <ImageBackground 
      source={require('../assets/images/bg.png')} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={{ flex: 1 }}>
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
              <Ionicons name="lock-closed-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="Mot de passe"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
            </View>
            <View style={styles.input}>
              <Ionicons name="card-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                clearButtonMode="while-editing"
               onChangeText={idType => {
                handleFilter(idType)
                setForm({ ...form, idType })
               }}
                placeholder="Type de document d'identification"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                value={query} />
                 {filteredSuggestions.length > 0 && (
                    <FlatList
                      data={filteredSuggestions}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      style={styles.autocomplete}
                    />
                  )}
            </View>
            <View style={styles.input}>
              <Ionicons name="card-outline" size={20} color="#ffffff" style={styles.inputIcon} />
              <TextInput
                clearButtonMode="while-editing"
                onChangeText={cni => setForm({ ...form, cni })}
                placeholder="Le numéro du document fourni"
                placeholderTextColor="#ffffff"
                style={styles.inputControl}
                value={form.cni} />
            </View>
            <View style={styles.switchContainer}>
      <Switch
        value={isAgreed}
        onValueChange={() => {
          setIsAgreed(!isAgreed)
         setBtnopacity(isAgreed ? 0.5 : 1);

        }}
      />
      <Text style={styles.switchText}>
        J'accepte les règles de la <Text style={{color: 'white' , fontWeight: 'bold'}}
        onPress={()=>{
          navigation.navigate("charte de la communauté Ride 2 School")
        }}
        >
          charte de la communauté Ride 2 School
        </Text>
      </Text>
    </View>
            

            <View style={styles.formAction}>
              <TouchableOpacity disabled={!isAgreed} onPress={()=>{
                handleSignUp()
              }}>
                <View style={[styles.btn , {opacity: btnopacity}]}>
                  <Text style={styles.btnText}>
                    {loading ? <ActivityIndicator color={colors.primary} /> : "Inscrivez-vous"}
                  </Text>
                </View>
              </TouchableOpacity>
                 <Br size={15}/> 
              <TouchableOpacity onPress={loginScreen}>
                <View style={styles.secondaryBtn}>
                  <Text style={{  fontSize: 18,
                  lineHeight: 26,
                  color:'white',}}>
                    Déjà inscrit ? 
                  </Text>
                  <Text style={[styles.secondaryBtnText , {marginLeft: 10}]}>
                      Se connecter
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
const {width , height} = Dimensions.get('screen')
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

     switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchText: {
    marginLeft: 0,
    fontSize: 16,
    padding: 10, 
    width: width*0.8,
    color: 'white'
  },
  
  ecoleInputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  autocomplete: {
    position: 'absolute',
    top: 50, 
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    zIndex: 9999
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
});

