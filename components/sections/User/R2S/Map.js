import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../../firebase/firebaseConfig';
import { Paragraph, Title } from 'react-native-paper';
import MapViewDirections from 'react-native-maps-directions';
import { speak } from '../../../../functions/alertSound';

const CustomMarker = ({ width, height, source }) => {
  return <Image source={source} style={{ width, height }} />;
};

const Map = ({ user, enfants }) => {
  const [location, setLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const mapRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [strokeColor, setStrokeColor] = useState('red');
  const [ramassage, setRamassage] = useState();
  const [lieudepot, setLieudepot] = useState();
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    function getDriversPosition() {
      const enfant = enfants[0];
      const driverId = enfant?.chauffeur || '662f7219e0c118cc16276a3f';
      const dataRef = ref(db, 'locations/' + driverId);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setLocation(data.location);
          setSpeed(data.speed);
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: data?.location?.latitude,
              longitude: data?.location?.longitude,
              latitudeDelta: 0.005, // Zoom plus élevé
              longitudeDelta: 0.005, // Zoom plus élevé
            }, 1000); // Animation en 1 seconde
          }
        }
      });
    }
    getDriversPosition();
  }, [enfants, user, distance]);

  useEffect(() => {
    if (enfants) {
      const origine = enfants[0]?.ramassage[0];
      const destination = enfants[0]?.lieudepot[0];
      setRamassage({
        latitude: origine?.latitude,
        longitude: origine?.lontidute,
      });
      setLieudepot({
        latitude: destination?.latitude,
        longitude: destination?.lontidute,
      });
    }
  }, [enfants]);

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };

  useEffect(() => {
    if (location !== null) {
      const coords = [
        { latitude: parseFloat(location?.latitude), longitude: parseFloat(location?.longitude) },
        { latitude: parseFloat(ramassage?.latitude), longitude: parseFloat(ramassage?.longitude) },
        { latitude: parseFloat(lieudepot?.latitude), longitude: parseFloat(lieudepot?.longitude) },
      ];
      setRoute(coords);
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
      setDistance(totalDistance.toFixed(2));
      speak('Le chauffeur est à ' + totalDistance.toFixed(2) + ' km de votre enfant');

      if (totalDistance.toFixed(2)<0.1&&totalDistance.toFixed(2)>0) {

          speak("Le chauffeur est proche de votre enfant");
      }
      if (totalDistance.toFixed(2)===0) {
         speak("Le chauffeur est déjà au lieu de ramassage de votre enfant");
      }
      
    }
  }, [location, strokeColor, strokeWidth]);

  if (!location) {
    return <Text>Chargement</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.005, // Zoom plus élevé
          longitudeDelta: 0.005, // Zoom plus élevé
        }}
        region={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.005, // Zoom plus élevé
          longitudeDelta: 0.005, // Zoom plus élevé
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(location?.latitude),
            longitude: parseFloat(location?.longitude),
          }}
          title={'Le chauffeur'}
          pinColor="red"
          draggable={true}
          onDragStart={(e) => {
            console.log('Drag start', e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log('Drag end', e.nativeEvent.coordinate);
          }}
        >
          <CustomMarker source={require('../../../../assets/images/icon-car.png')} width={50} height={50} />
        </Marker>
        {enfants.map((item) => (
          <Marker
            key={item._id}
            coordinate={{
              latitude: parseFloat(item?.ramassage[0]?.latitude),
              longitude: parseFloat(item?.ramassage[0]?.lontidute),
            }}
            title={item.nom}
          >
            <CustomMarker source={{ uri: item?.photo }} width={50} height={50} />
          </Marker>
        ))}

        <MapViewDirections
          origin={{
            latitude: parseFloat(location?.latitude),
            longitude: parseFloat(location?.longitude),
          }}
          destination={{
            latitude: parseFloat(enfants[0].ramassage[0].latitude),
            longitude: parseFloat(enfants[0].ramassage[0].lontidute),
          }}
          apikey={'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA'}
          strokeWidth={5}
          strokeColor="blue"
        />
      </MapView>
      <View style={styles.infoBar}>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Title style={{ fontSize: 14 }}>Vitesse</Title>
          <Paragraph style={{ marginLeft: 0 }}>{speed} km/h</Paragraph>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Title style={{ fontSize: 14 }}>Distance restante</Title>
          <Paragraph style={{ marginLeft: 15 }}>{distance} km</Paragraph>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Title style={{ fontSize: 14 }}>Arrive dans:</Title>
          <Paragraph style={{ marginLeft: 1 }}>{10} minutes</Paragraph>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoBar: {
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
});

export default Map;
