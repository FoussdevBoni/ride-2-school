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
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { colors } from '../../../assets/styles/colors';
import { RadioButton, Title } from 'react-native-paper';
import Br from '../../../components/widgets/br/br';

export default function PayementForm() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    nom: '',
    moyenDePaiement: '',
    identifiant: '', // Ajouter une clé pour l'identifiant du compte
  });
  const route = useRoute()
  const {souscription} = route.params

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value
    });
  };

  const handleSubmit = () => {
    // Validation des champs
    if (!form.nom || !form.moyenDePaiement || !form.identifiant) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    // Dispatch de l'action pour soumettre le formulaire
    dispatch(/* action to submit form */);
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
                  Effectuer le paiement
                </Text>
                
              </View>
              <View style={styles.form}>
                    <Title style={{color: 'white'}}>
                  Montant à payer  ({souscription.prix*25})
                </Title>
                </View>
                <Br size={20}/>
              <View style={styles.form}>
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

                <View style={styles.paymentMethod}>
                  <Text style={styles.methodLabel}>Choisir le moyen de paiement :</Text>
                  
                  <RadioButton.Group
                    onValueChange={newValue => handleChange('moyenDePaiement', newValue)}
                    value={form.moyenDePaiement}
                  >
                    <View style={styles.methodOption}>
                      <RadioButton value="Orange Money" color='white' />
                      <Image
                        source={{uri: 'https://seeklogo.com/images/O/orange-money-logo-8F2AED308D-seeklogo.com.png'}}
                        style={styles.methodLogo}
                      />
                      <Text style={styles.methodText}>Orange Money</Text>
                    </View>
                    <View style={styles.methodOption}>
                      <RadioButton value="MTN Money" color='white' />
                      <Image
                        source={{uri: 'https://hcmagazines.com/wp-content/uploads/2023/09/mtn-1-160x160.jpg'}}
                        style={styles.methodLogo}
                      />
                      <Text style={styles.methodText}>MTN Money</Text>
                    </View>
                    <View style={styles.methodOption}>
                      <RadioButton value="Moov Money" color='white' />
                      <Image
                        source={{uri: 'https://upload.wikimedia.org/wikipedia/fr/thumb/1/1d/Moov_Africa_logo.png/640px-Moov_Africa_logo.png'}}
                        style={styles.methodLogo}
                      />
                      <Text style={styles.methodText}>Moov Money</Text>
                    </View>
                    <View style={styles.methodOption}>
                      <RadioButton value="Carte Bancaire" color='white' />
                      <Image
                        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiCD2igi7O-wvzQsET3mHmZRhmhzuNt2LDrg&s'}}
                        style={styles.methodLogo}
                      />
                      <Text style={styles.methodText}>Carte Bancaire</Text>
                    </View>
                  </RadioButton.Group>
                </View>

                {form.moyenDePaiement && (
                  <View style={styles.input}>
                    <Ionicons
                      name={form.moyenDePaiement === 'Carte Bancaire' ? "card-outline" : "phone-portrait-outline"}
                      size={20}
                      color="#ffffff"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      clearButtonMode="while-editing"
                      onChangeText={identifiant => handleChange('identifiant', identifiant)}
                      placeholder={form.moyenDePaiement === 'Carte Bancaire' ? "Numéro de carte" : "Numéro de téléphone"}
                      placeholderTextColor="#ffffff"
                      keyboardType={form.moyenDePaiement === 'Carte Bancaire' ? "numeric" : "phone-pad"}
                      style={styles.inputControl}
                      value={form.identifiant} />
                  </View>
                )}

                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>
                        Valider
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
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 10,
    marginLeft: 8
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 14,
    paddingVertical: 10,
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
  paymentMethod: {
    marginTop: 16,
  },
  methodLabel: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 8,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  methodLogo: {
    width: 30,
    height: 30,
    marginRight: 8,
    borderRadius: 15,
  },
  methodText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
