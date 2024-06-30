import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  FlatList,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { colors } from '../../../assets/styles/colors';
import * as ImagePicker from 'expo-image-picker';
import { getSchoolsFromAdmins } from '../../../functions/getShools';

export default function ChildForm({user}) {
  const [schools, setSchools] = useState([]);
  const navigation = useNavigation();
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    abonnement: '65fad65b5c542bf7f4a33009',
    ecole: null,
    heureDepart: '',
    heureSortie: '',
    class: '',
    nom: '',
    email: user.email,
    dateNaissance: ''
  });

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value
    });
  };

  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setFilteredSuggestions([]);
      setQuery(item.nom);
      handleChange('ecole', item);
    }}>
      <View style={styles.suggestionItem}>
        <Text>{item.nom}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    async function fetchSchools() {
      try {
        const schools = await getSchoolsFromAdmins();
        const array = schools.map((school) => ({
          id: school._id,
          nom: school.nomEcole,
          data: school
        }));
        setSchools(array);
      } catch (error) {
        console.error("Erreur lors de la récupération des écoles:", error);
      }
    }

    fetchSchools();
  }, []);

  const handleFilter = (value) => {
    setQuery(value);
    const filtered = schools.filter(suggestion =>
      suggestion.nom.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(value ? filtered : []);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/bg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <FlatList
        data={[{ key: 'form' }]}
        renderItem={() => (
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
                  Ajouter un enfant
                </Text>
              </View>
              <View style={styles.form}>
                <View style={styles.input}>
                  <Ionicons name="school-outline" size={20} color="#ffffff" style={styles.inputIcon} />
                  <TextInput
                    clearButtonMode="while-editing"
                    onChangeText={ecole => handleFilter(ecole)}
                    placeholder="L'école de l'enfant"
                    placeholderTextColor="#ffffff"
                    style={styles.inputControl}
                    value={query}
                  />
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
                  <Ionicons name="person-outline" size={20} color="#ffffff" style={styles.inputIcon} />
                  <TextInput
                    clearButtonMode="while-editing"
                    onChangeText={nom => handleChange('nom', nom)}
                    placeholder="Nom et prénom"
                    placeholderTextColor="#ffffff"
                    style={styles.inputControl}
                    value={form.nom} />
                </View>
                  <View style={styles.input}>
                  <Ionicons name="person-outline" size={20} color="#ffffff" style={styles.inputIcon} />
                  <TextInput
                    clearButtonMode="while-editing"
                    onChangeText={nom => handleChange('class', nom)}
                    placeholder="Classe de l'enfant"
                    placeholderTextColor="#ffffff"
                    style={styles.inputControl}
                    value={form.class} />
                </View>

                <View style={styles.input}>
                  <Ionicons name="mail-outline" size={20} color="#ffffff" style={styles.inputIcon} />
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    keyboardType="email-address"
                    onChangeText={email => handleChange('email', email)}
                    placeholder="Adresse email"
                    placeholderTextColor="#ffffff"
                    style={styles.inputControl}
                    value={form.email} />
                </View>
                <View style={styles.input}>
                  <Ionicons name="calendar-number-outline" size={20} color="#ffffff" style={styles.inputIcon} />
                  <TextInput
                    clearButtonMode="while-editing"
                    onChangeText={dateNaissance => handleChange('dateNaissance', dateNaissance)}
                    placeholder="Date de naissance"
                    placeholderTextColor="#ffffff"
                    style={[styles.inputControl]}
                    value={form.dateNaissance} />
                </View>
                <View style={styles.input}>
                  <Ionicons name="time" size={20} color="#ffffff" style={styles.inputIcon} />
                  <TextInput
                    clearButtonMode="while-editing"
                    onChangeText={heureDepart => handleChange('heureDepart', heureDepart)}
                    placeholder="Heure de départ"
                    placeholderTextColor="#ffffff"
                    style={[styles.inputControl]}
                    value={form.heureDepart} />
                </View>
                <View style={styles.input}>
                  <Ionicons name="time-outline" size={20} color="#ffffff" style={styles.inputIcon} />
                  <TextInput
                    clearButtonMode="while-editing"
                    onChangeText={heureSortie => handleChange('heureSortie', heureSortie)}
                    placeholder="Heure de sortie"
                    placeholderTextColor="#ffffff"
                    style={[styles.inputControl]}
                    value={form.heureSortie} />
                </View>
              
                <View style={styles.formAction}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('child-profile', { form });
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
          </View>
        )}
      />
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
    color: colors.primary,
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
