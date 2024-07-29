import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import StackAppBarr from '../../../components/sections/User/Appbars/StackAppBar';
import { colors } from '../../../assets/styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native-paper';

const API_KEY = 'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA';

const ConfigResults = ({ user }) => {
  const route = useRoute();
  const [origin, setOrigin] = useState(null);
  const navigation = useNavigation();
  const [localisation , setLocaalisaion] = useState('')
  const { child } = route.params;
  const destination = {
    longitude: child?.ecole?.data?.longitude,
    latitude: child?.ecole?.data?.latitude
  };

  const [loading , setLoading ]= useState(false)

  const handleSearch = async () => {
    if (!origin) {
      alert("Veuillez sélectionner un lieu de départ.");
      return;
    }

        setLoading(true)

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin,
          destination: `${destination.latitude},${destination.longitude}`,
          key: API_KEY
        }
      });

      if (response.data.status === 'OK') {
        const routes = response.data.routes[0];
        const legs = routes.legs[0];
                setLoading(false)
       navigation.navigate('ite-config-map', { child, destination, origin: legs.start_location  , originName: origin , localisation  });
       console.log({child: child, destination, origin: legs.start_location })
      } else {
        console.error('Erreur dans la réponse de l\'API:', response.data.status);
        setLoading(false)
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/images/bg.png')} style={styles.backgroundImage}>
      <View style={styles.overlay} />

      <StackAppBarr title={"Calcul de l’itinéraire"} goBack={navigation.goBack}/>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder='Lieu de ramassage'
          onPress={(data, details = null) => {
            setOrigin(data.description);
            setLocaalisaion(data.description)
            console.log(data.description)
          }}
          query={{
            key: API_KEY,
            language: 'fr',
          }}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            predefinedPlacesDescription: styles.predefinedPlacesDescription,
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
           {
            loading ? <ActivityIndicator size={20} color='white'/> :  <Text style={styles.buttonText}>
            Continuer
          </Text>
           }
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('screen');

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
  searchContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 48,
    color: '#5d5d5d',
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ConfigResults;
