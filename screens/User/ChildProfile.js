import React from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { Divider, List, ProgressBar } from 'react-native-paper';

import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../../assets/styles/colors';
import StackAppBarr from '../../components/sections/User/Appbars/StackAppBar';
import { takePhoto } from './../../functions/uploadPhoto';
import Br from '../../components/widgets/br/br';
import { Rating } from 'react-native-elements';



const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

export default function ChildProfile() {
    const route = useRoute()
    const {form} = route.params
    const child = {
      ...form, 
      ecole: form?.ecole
    }
  const stats = [
  { label: 'Ecole', value: form?.ecole?.nom },
  { label: 'Classe', value:  child?.class },
  { label: 'Date de naissance', value: child?.dateNaissance },
];

const addPhoto = async ()=>{
  const date = new Date().toDateString()
  const response = await takePhoto('library' , 'profiles/enfants/'+date)
  if (response.uploadResp?.downloadUrl) {
    child.photo = response.uploadResp?.downloadUrl
    console.log(child?.photo)

  }
}
  const performance = child.performance || 0.3;
  const revenuSatus = child.revenuSatus || 0.9;

  const getStatusColor = (status) => {
    if (status <= 0.3) {
      return 'red';
    } else if (status > 0.3 && status < 0.5) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  const items = [
   
    {
      icon: 'star',
      label: 'Note globale',
      render: <Rating startingValue={5} readonly imageSize={15} />,
    },
    {
      icon: 'user',
      label: 'Niveau d\'abonnement',
      render: (
        <ProgressBar
          progress={revenuSatus}
          color={getStatusColor(revenuSatus)}
          style={{ backgroundColor: '#eff1f5', height: 10, borderRadius: 5 }}
        />
      ),
    },
  ];
  const navigation= useNavigation()
  return (
     <>
      {
        child &&   <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StackAppBarr title={child?.nom} goBack={navigation.goBack}/>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.profile}>
              <View style={styles.profileTop}>
                <View style={styles.avatar}>
                  <Image
                    alt=""
                    source={{
                      uri: child?.photo || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    }}
                    style={styles.avatarImg} />

                 
                </View>

                <View style={styles.profileBody}>
                  <Text style={styles.profileTitle}>{child?.nom}</Text>

                  <Text style={styles.profileSubtitle}>
                    <Text style={{ color: '#266EF1' }}>
                      {child?.email}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.stats}>
              {stats.map(({ label, value }, index) => (
                <View
                  key={index}
                  style={[
                    styles.statsItem,
                    index === 0 && { borderLeftWidth: 0 },
                  ]}>
                  <Text style={styles.statsItemText}>{label}</Text>

                  <Text style={styles.statsItemValue}>{value}</Text>
                </View>
              ))}
            </View>

            <View style={styles.contentActions}>
              <TouchableOpacity
               
                style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>Modifier</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                 addPhoto()
                }}
                style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>
                    Ajouter une photo
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <List.Section>
      
           {
            child.abonnement && child.chauffeur &&  <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Progression des données</Text>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              ></TouchableOpacity>
            </View>

            <View
              contentContainerStyle={styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {items.map(({ icon, label, render }, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // handle onPress
                  }}
                >
                  <View style={styles.card}>
                    <View style={styles.cardTop}>
                      <View style={styles.cardIcon}>
                        <FeatherIcon color="#000" name={icon} size={24} />
                      </View>

                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{label}</Text>
                        <Br size={10} />
                        {render}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
           }

          
        <View style={styles.list}>
            <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Informations sur l'enfants</Text>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              ></TouchableOpacity>
            </View>        
          <TouchableOpacity >
            <List.Item
              title="Nom et prénom"
            left={() => <Ionicons size={30} name="person" style={{marginLeft: 10}}/>}              description={child?.nom}
            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity >
            <List.Item
              title="Ecole"
              left={() => <Ionicons size={30} name="school" style={{marginLeft: 10}}/>}
               description={child?.ecole?.nom}

            />
          </TouchableOpacity>
          <Divider />
          {/* Ajoutez d'autres éléments de la liste ci-dessous */}
            <TouchableOpacity >
            <List.Item
              title="Classe"
              left={() => <Ionicons size={30} name="school-outline" style={{marginLeft: 10}}/>}
                            description={child?.class}

            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity >
            <List.Item
              title="Date de naissance"
              left={() => <Ionicons name="calendar" size={30} style={{marginLeft: 10}}/>}
                            description={child.dateNaissance}

            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity >
            <List.Item
              title="Heure de départ"
                            description={child.heureDepart}

              left={() => <Ionicons name="time" size={30} style={{marginLeft: 10}}/>}
            />
          </TouchableOpacity>
           <Divider />
          <TouchableOpacity onPress={() => handlePress('Confidentialité')}>
            <List.Item
              title="Heure de sortie"
              description={child.heureSortie}
              left={() =><Ionicons name="time-outline" size={30} style={{marginLeft: 10}}/>}
            />
          </TouchableOpacity>
          <Divider />
           {
            !form.abonnement ? (
              <TouchableOpacity
               onPress={()=>{
                navigation.navigate('itineraire-config' , {child})
               }}
                style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>
                    Configuer l'itinéraire
                  </Text>
                </View>
         </TouchableOpacity>
            ):  <TouchableOpacity
               onPress={()=>{
                  let  selectedEnfants = []
                  selectedEnfants.push(child)
                  navigation.navigate('Suivre mes Enfants' , {selectedEnfants})
               }}
                style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>
                    Suivre le trajet
                  </Text>
                </View>
         </TouchableOpacity>
           }
           <Br size={20}/>
           {
           child.chauffeur && (
               <TouchableOpacity
               onPress={()=>{
                   
                  navigation.navigate('driver-profile' , {child})
               }}
                style={{ flex: 1, paddingHorizontal: 6 }}>
                <View style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>
                    Voir le profile du chauffeur
                  </Text>
                </View>
            </TouchableOpacity>
            )
           }
      </View>
        </List.Section>


          </View>

          
        </ScrollView>
        
      </View>
    </SafeAreaView>
      }
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flex: 1
  },
  /** Content */
  content: {
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  contentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginHorizontal: -6,
    marginBottom: 0,
  },
  /** Profile */
  profile: {
    paddingTop: 4,
    paddingBottom: 16,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingLeft: 16,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#121a26',
    marginBottom: 6,
  },
  profileSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#778599',
  },
 


  avatar: {
    position: 'relative',
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 9999,
  },

  /** Stats */
  stats: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 1,
  },
  statsItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderLeftWidth: 1,
    borderColor: 'rgba(189, 189, 189, 0.32)',
  },
  statsItemText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#778599',
    marginBottom: 5,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#121a26',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: colors.primary,
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor:colors.primary,
    borderColor: colors.primary,
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: '#fff',
  },
  /** List */
  list: {
    marginTop: 16,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#778599',
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  /** Card */
  card: {
    width: CARD_WIDTH,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eff1f5',
  },
  cardBody: {
    paddingLeft: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 18,
    color: '#121a26',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  cardFooterText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: '#778599',
  },



});