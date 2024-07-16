import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import StackAppBarr from '../../../components/sections/User/Appbars/StackAppBar';
import { colors } from '../../../assets/styles/colors';
import { calculerTarif } from '../../../functions/tarifaction';
import { getPrice } from '../../../functions/getPrice';
import { ImageBackground } from 'react-native';



export default function SuscriptionsOptions() {
  const [value, setValue] = React.useState(0);
  const route = useRoute()
  const {suscription} = route.params
  console.log('suscription',suscription)
    console.log('bus',suscription.ecole.data.mesBus)

 const bus = suscription.ecole.data.bus
  const items = bus ? [
  {
    label: 'Le bus',
    prix:  15000,
    description: 'Le trans port avec le bus aefsb heev  fafavd gddye dkfb qvfssbsgd gdd.',
    route: 'payement-form'
  },
  {
    label: 'Mini-com',
    prix: getPrice('Minicom' , suscription.distance , 1).toFixed(0),
    description: 'Le minicom est le services nhdf affdh oedvd sfrav dgt aaafd bdddbc.',
    route: 'payement-form'
  },

   {
    label: 'Privé',
    prix: getPrice('Privé' , suscription.distance).toFixed(0),
    description: 'Le minicom est le services nhdf affdh oedvd sfrav dgt aaafd bdddbc.',
    route: 'payement-form'
  },

]: [

   {
    label: 'Mini-com',
    prix: getPrice('Minicom' , suscription.distance , 1).toFixed(0),
    description: 'Le minicom est le services nhdf affdh oedvd sfrav dgt aaafd bdddbc.',
    route: 'payement-form'
  },

   {
    label: 'Privé',
    prix: getPrice('Privé' , suscription.distance).toFixed(0),
    description: 'Le minicom est le services nhdf affdh oedvd sfrav dgt aaafd bdddbc.',
    route: 'payement-form'
  },
]
const navigation = useNavigation()
  return (
    <ImageBackground  source={require('../../../assets/images/bg.png')}
      style={styles.backgroundImage}>
              <View style={styles.overlay} />

      <StatusBar style='light'/>
      <StackAppBarr title='Choisir une option ' styles={{bgColor: colors.primary, textColor: 'white'}}/>
      <View style={styles.container}>

        {items.map(({ label, prix, description , route }, index) => {
          const isActive = value === index;
          const souscription = {
            ...suscription,
            prix: prix,
            service: label
          }
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setValue(index);
                navigation.navigate(route , {souscription})
              }}>
              <View style={[styles.radio, isActive && styles.radioActive]}>
                <View style={styles.radioTop}>
                  <Text style={[styles.radioLabel, isActive && styles.radioLabelActive]}>{label}</Text>
                  <Text style={styles.radioUsers}>
                    <Text style={{ fontWeight: '700' }}>{prix}</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Radio */
  radio: {
    position: 'relative',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  radioActive: {
    borderColor: colors.primary,
  },
  radioTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  radioLabel: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
  },
  radioLabelActive: {
    color: colors.primary,
  },
  radioUsers: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2f2f2f',
  },
  radioDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: '#848a96',
  },
});
