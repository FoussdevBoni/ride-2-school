import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, Dimensions, ImageBackground } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TouchableOpacity } from 'react-native';
import StackAppBarr from '../../../components/sections/User/Appbars/StackAppBar';
import SearchMap from '../../../components/sections/User/IteConfig/Map';
import { ScrollView } from 'react-native-gesture-handler';
        const API_KEY = 'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA';

const ConfigResults = ({ user }) => {
    const route = useRoute();
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [originLocation, setOriginLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const navigation  = useNavigation()
    const {child}= route.params
      console.log(child)
    const handleSearch = async () => {
        if (!origin || !destination) {
            alert("Veuillez sélectionner un lieu de départ et un lieu d'arrivée.");
            return;
        }1
try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin,
          destination,
          key: API_KEY
        }
      });

      if (response.data.status === 'OK') {
        const routes = response.data.routes[0];
        const legs = routes.legs[0];
        setOriginLocation(legs.start_location);
        setDestinationLocation(legs.end_location);
        navigation.navigate('ite-config-map' , {child: child, destination: legs.end_location  , origin: legs.start_location})
        console.log(legs.start_location)
      } else {
        console.error('Erreur dans la réponse de l\'API:', response.data.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  

    return (
        <ImageBackground  source={require('../../../assets/images/bg.png')} 
      style={styles.backgroundImage}>
              <View style={styles.overlay} />

            <StackAppBarr title={"Calcul de l’itinéraire"} />
            <View style={styles.searchContainer}>
                <View style={styles.searchInputs}>
                    <View style={{ flex: 1, width: '40%' }}>
                        <GooglePlacesAutocomplete
                            placeholder='Lieu de ramassage'
                            onPress={(data, details = null) => {
                                setOrigin(data.description);
                                 console.log(data.description);

                            }}
                            query={{
                                key: API_KEY,
                                language: 'fr',
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, width: '40%', marginLeft: 10 }}>
                        <GooglePlacesAutocomplete
                            placeholder="Lieu de l'école"
                            onPress={(data, details = null) => {
                                setDestination(data.description);
                                 console.log(data, details);

                            }}
                            query={{
                                key: API_KEY,
                                language: 'fr',
                            }}
                        />
                    </View>
                </View>
            </View>
          
           <View style={{padding: 17}}>
             <TouchableOpacity onPress={handleSearch} style={[styles.button, { height: 40, justifyContent: 'center' }]} >
                <Text style={{ color: 'white', textAlign: 'center' }}>
                    Rechercher
                </Text>
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
    searchInputs: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1
    },
    searchContainer: {
        padding: 10,
        height: height * 0.75
    },
    mapContainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        backgroundColor: colors.primary,
        color: 'white',
        borderRadius: 20
    },
});

export default ConfigResults;
