import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../assets/styles/colors';

const data = [
  " Simplifiez la vie scolaire de vos enfants",
  "Protégez le déplacement de vos enfants",
  "Suivez en temps réel   le  déplacement de vos enfants"
];

export default function AppScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/951045208/fr/photo/jeune-femme-africaine-debout-%C3%A0-lext%C3%A9rieur-avec-les-bras-lev%C3%A9s-et-rire.jpg?s=612x612&w=0&k=20&c=ZnxO0vKf59xKVg2xNhpejQiFeG3sa0AzuLFTwgO7WCY=' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Ride 2 school</Text>
          <Text style={styles.subtitle}>Bienvenue dans l'application Ride 2 school. Avec  Ride 2 school  :</Text>
          
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <MaterialIcons name="check" size={24} color="white" />
                <Text style={styles.listText}>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('connexion')
            }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>
                Commencer
              </Text>
            </View>
          </TouchableOpacity>

         
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  content: {
    height: '60%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'start',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'start',
    fontWeight: '700',
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%'
  },
  listText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
      flexWrap: 'wrap',
    flex: 1,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: colors.primary,
  },
  btnSecondaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.primary,
  },
});

