import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { colors } from '../../../assets/styles/colors';
import StackAppBar from '../../../components/sections/User/Appbars/StackAppBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const ChoixPreferenceForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const route = useRoute();
  const { souscription } = route.params;
  const navigation = useNavigation();

  const handleSave = () => {
    let updatedSouscription = { ...souscription }; // Crée une copie de l'objet souscription

    if (selectedOption === 'allerRetour') {
      updatedSouscription.prix = roundPrice(souscription.prix);
    } else if (selectedOption === 'allerUnique') {
      updatedSouscription.prix = roundPrice(souscription.prix * 0.75);
    } else if (selectedOption === 'retourUnique') {
      updatedSouscription.prix = roundPrice(souscription.prix * 0.8);
    }

    if (selectedOption) {
      navigation.navigate('payement-form', { souscription: updatedSouscription, preference: selectedOption });
    } else {
      // Gérer le cas où aucune option n'est sélectionnée
    }
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
  };

  const roundPrice = (price) => {
    return Math.round(price / 5) * 5;
  };

  return (
    <View style={{ flex: 1 }}>
      <StackAppBar title={'Choix de trajets'} goBack={navigation.goBack} />
      <ImageBackground
        source={require('../../../assets/images/bg.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.container}>
          <View style={[styles.optionContainer, selectedOption === 'allerRetour' && styles.selectedOption]}>
            <RadioButton
              value="allerRetour"
              status={selectedOption === 'allerRetour' ? 'checked' : 'unchecked'}
              onPress={() => handleOptionSelect('allerRetour')}
              color={colors.primary} // Personnalisation de la couleur du RadioButton
            />
            <Text style={styles.radioText}>Aller-Retour - {roundPrice(souscription.prix)} FCFA</Text>
          </View>

          <View style={[styles.optionContainer, selectedOption === 'allerUnique' && styles.selectedOption]}>
            <RadioButton
              value="allerUnique"
              status={selectedOption === 'allerUnique' ? 'checked' : 'unchecked'}
              onPress={() => handleOptionSelect('allerUnique')}
              color={colors.primary}
            />
            <Text style={styles.radioText}>Aller unique - {roundPrice(souscription.prix * 0.75)} FCFA</Text>
          </View>

          <View style={[styles.optionContainer, selectedOption === 'retourUnique' && styles.selectedOption]}>
            <RadioButton
              value="retourUnique"
              status={selectedOption === 'retourUnique' ? 'checked' : 'unchecked'}
              onPress={() => handleOptionSelect('retourUnique')}
              color={colors.primary}
            />
            <Text style={styles.radioText}>Retour unique - {roundPrice(souscription.prix * 0.8)} FCFA</Text>
          </View>

          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChoixPreferenceForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedOption: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  radioText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
