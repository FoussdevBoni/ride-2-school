import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TouchableOpacity } from 'react-native';
import StackAppBarr from '../../../components/sections/User/Appbars/StackAppBar';

const ConfigResults = ({user}) => {
    const route = useRoute()
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [directions, setDirections] = useState([]);
    const [heureDebut, setHeureDebut] = useState('');
   const [heureFin, setHeureFin] = useState('');
    const handleSearch = () => {
    if (!origin || !destination) {
      alert("Veuillez sélectionner un lieu de départ et un lieu d'arrivée.");
      return;
    }

    const API_KEY = 'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA';
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`;

    axios
      .get(url)
      .then(response => {
        const routes = response.data.routes;
        if (routes && routes.length > 0) {
          const route = routes[0];
          const { legs } = route;
          if (legs && legs.length > 0) {
            const steps = legs[0].steps;
            if (steps && steps.length > 0) {
              const coordinates = steps.map(step => ({
                latitude: step.start_location.lat,
                longitude: step.start_location.lng,
              }));
              coordinates.push({
                latitude: steps[steps.length - 1].end_location.lat,
                longitude: steps[steps.length - 1].end_location.lng,
              });
              setDirections(coordinates);
            }
          }
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'itinéraire:", error);
      });
  };

  return (
    <View style={styles.container}>
      <StackAppBarr title={"Calcul de l’itinéraire"} />
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Lieu de départ"
          onPress={(data, details = null) => {
            setOrigin(data.description);
          }}
          query={{
            key: 'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA',
            language: 'fr',
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Lieu d'arrivée"
          onPress={(data, details = null) => {
            setDestination(data.description);
          }}
          query={{
            key: 'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA',
            language: 'fr',
          }}
        />
          <TouchableOpacity  onPress={()=>handleSearch()} style={[styles.button, {height:40, justifyContent:'center'}]} >
          <Text style={{ color: 'white', textAlign:'center' }}>
            Suivant
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map}>
          {origin && (
            <Marker
              coordinate={{
                latitude: origin.details.geometry.location.lat,
                longitude: origin.details.geometry.location.lng,
              }}
              title="Départ"
            />
          )}
          {destination && (
            <Marker
              coordinate={{
                latitude: destination.details.geometry.location.lat,
                longitude: destination.details.geometry.location.lng,
              }}
              title="Arrivée"
            />
          )}
          {directions && directions.length > 0 && (
            <Polyline
              coordinates={directions}
              strokeColor="#3498db"
              strokeWidth={4}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
    flex: 0.5
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
        color: 'white'

  },
});

export default ConfigResults;
