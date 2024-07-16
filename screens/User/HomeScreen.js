import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import { colors } from '../../assets/styles/colors';
import Br from '../../components/widgets/br/br';
import { ScrollView } from 'react-native-gesture-handler';
import Children from '../../components/sections/User/HomeScreen/Children';
import { useNavigation } from '@react-navigation/native';
import { speak } from '../../functions/alertSound';
import { useDispatch } from 'react-redux';
import { hasSpoken } from '../../redurcer/userSlice';

function HomeScreen({user}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const isSpoken = dispatch(hasSpoken(true))
  console.log(user)
   speak('Bonjour  '+ user?.nom+'. Pour ajouter un enfant , veillez cliquer sur le bouton en blanc. Pour suivre le trajet d\'un enfant ,  selectionner ce dernier et cliquer sur le bouton "suivre le trajet"'  , isSpoken)
   

  return (
   <ImageBackground
      source={require('../../assets/images/bg.png')} 
      style={styles.backgroundImage}
    >
            <View style={styles.overlay} />

       <ScrollView style={{padding: 10}}>
       <View>
        <Title style={styles.heading}>Bienvenue sur R2S</Title>
      </View>

      <View style={styles.section1}>
        <View>
          <Text style={styles.section1Text}>
            <Text style={styles.boldText}>Facilitez les trajets de vos enfants vers l'école</Text>
            {'\n'}
            Avec Ride-2-school , simplifiez la vie scolaire de vos enfants
          </Text>
        </View>
          <Br size={25}/>
        <TouchableOpacity style={styles.section1Button} onPress={()=>{
                navigation.navigate('add-child' , {user})
        }}>
          <Text style={styles.buttonText}>
            Ajouter un enfant
          </Text>
        </TouchableOpacity>
      </View>

      <Children user={user}/>

    </ScrollView>
      
    </ImageBackground>
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
   backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    opacity: 0.8,
  },
  container: {
    padding: 15,
    backgroundColor: colors.background,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: colors.primary,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  section1: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section1Text: {
    color: 'white',
    opacity: 0.8,
  },
  section1Button: {
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'blue',
  },
  section2:{
      backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    flexDirection: 'column',
  }
});
