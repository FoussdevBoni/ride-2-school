import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ActivityIndicator, List, Title } from 'react-native-paper';
import { getPrice } from '../../../functions/getPrice';
import { addChild } from '../../../utils/api';
import { colors } from '../../../assets/styles/colors';
import axios from 'axios';


const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };
   const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };

const MapRoutes = ({user}) => {
  const [route, setRoute] = useState([]);
  const [isLoading , setIsLoading] = useState(false)
  const navigation = useNavigation()
  const navRoutes  = useRoute()
  const { origin, destination , child , localisation } = navRoutes.params

  const [distance , setDistance] = useState(0)
  const originLocation = { latitude: origin?.lat ?? 0, longitude: origin?.lng ?? 0 };
  const destinationLocation = { latitude: parseFloat(destination?.latitude) ?? 0, longitude: parseFloat(destination?.longitude) ?? 0 };
  const mapRef = useRef(null)

  useEffect(() => {
    if (originLocation && destinationLocation) {
      setRoute([originLocation, destinationLocation]);
      const coords = [originLocation, destinationLocation]
      console.log('originLocation', originLocation);
      console.log('destinationLocation', destinationLocation);


 let totalDistance = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      const distance = haversineDistance(
        coords[i].latitude,
        coords[i].longitude,
        coords[i + 1].latitude,
        coords[i + 1].longitude
      );
      totalDistance += distance;
    }

    console.log('Distance totale entre les marqueurs:', totalDistance.toFixed(2), 'km');
    setDistance(totalDistance.toFixed(2))
      
    }
  }, [origin, destination]);

  const mapRegion = {
    latitude: originLocation.latitude,
    longitude: originLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const suscribe =async ()=>{
      const suscription = {
        ...child,
        distance: parseFloat(distance),
        localisation,
        ramassage:{lontidute: +""+originLocation.longitude+"" , latitude: +""+originLocation.latitude+"" } ,
        lieudepot:{lontidute: +""+destinationLocation.longitude+"" , latitude: +""+destinationLocation.latitude+"" }
      }
         setIsLoading(true)
         navigation.navigate('suscriptions-options' , {suscription})

  }

return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={mapRegion}
      ref={mapRef}
      
          // onRegionChange={(region)=>console.log(region)}
      >
        <Marker
          coordinate={{
            latitude: originLocation.latitude,
            longitude: originLocation.longitude,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421
            
          }}
           
          pinColor="blue"
          icon={()=><Ionicons name='home'  size={50} color={'red'}/>}
          title='Point de ramassage'
         image={require('../../../assets/images/icon-car.png')}        />
        
          <Marker
          coordinate={{
            latitude: destinationLocation.latitude,
            longitude: destinationLocation.longitude,
          }}
         title='Ecole de Douala'
          pinColor="blue"
          image={require('../../../assets/images/icon-school.png')}

         />

        <MapViewDirections
            origin={originLocation}
            destination={destinationLocation}
            apikey={'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA'}
            strokeWidth={10}
            strokeColor="blue"
          />
      
      </MapView>

      <View  style={styles.dataContainer}>
      <List.Section>
        <Title style={{textAlign: 'center'}}>
            Résultats
        </Title>
        <List.Item   title={'Distance'} left={()=>(
            <Ionicons name='car' size={30}/>
        )} description={distance+'  km'}/>
      </List.Section>
        <View style={{paddingHorizontal: 20 , marginTop: 20}}>
           <TouchableOpacity  onPress={()=>{suscribe()}} style={[styles.button, {height:40, justifyContent:'center'}]} >
           {!isLoading ?  <Text style={{ color: 'white', textAlign:'center' , textTransform: 'none' }}>
            Souscrire 
          </Text>: <ActivityIndicator color='white' size={30}/>}
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const { height , width} = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: height*0.6
  },
  
  markerImage: {
    width: 10, // spécifiez la largeur désirée de l'image
    height: 10, 
    display: "none"
    // spécifiez la hauteur désirée de l'image
  },
  dataContainer:{
    height: height,
    width: width,
  },
   button: {
    marginVertical: 10,
    backgroundColor: colors.primary,
    color: 'white',
    marginBottom:50,
    borderRadius: 100
  },
});







export default MapRoutes











