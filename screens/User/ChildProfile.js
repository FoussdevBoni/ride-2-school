import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Alert,
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
import axios from 'axios';
import { useSelector } from 'react-redux';
import formaterDateISO8601 from '../../functions/formatDate';

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

export default function ChildProfile() {
  const route = useRoute();
  const { child } = route.params;
  const schools = useSelector((state) => state.schools);
  console.log(child)
  const [photo, setPhoto] = useState('');

  const addPhoto = async () => {
    const date = new Date().toDateString();
    const response = await takePhoto('library', 'profiles/enfants/' + date);
    if (response.uploadResp?.downloadUrl) {
      child.photo = response.uploadResp?.downloadUrl;
      setPhoto(response.uploadResp?.downloadUrl);
    }
  };

  const calculateSubscriptionLevel = () => {
    const startDate = new Date(child?.dateAbonnement);
    const endDate = new Date(child?.dateFinAbonnement);
    const today = new Date();

    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
    const remainingDays = totalDays - daysPassed;

    return Math.max(0, remainingDays / totalDays); // Ensure the level is between 0 and 1
  };

  const subscriptionLevel = calculateSubscriptionLevel();

  const stats = [
    { label: 'Ecole', value: child?.ecole?.nom || child?.ecole?.nomEcole },
    { label: 'Classe', value: child?.class },
   
  ];

  const getStatusColor = (status) => {
    if (status <= 0.3) {
      return 'red';
    } else if (status > 0.3 && status < 0.5) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  const startDate  = child.dateAbonnement ? formaterDateISO8601(child.dateAbonnement): new Date().toDateString()
  const endDate  = child.dateFinAbonnement ? formaterDateISO8601(child.dateFinAbonnement): new Date().toDateString()

  const items = [
  {
    icon: 'user',
    label: "Niveau d'abonnement",
    render: (
      <>
        <ProgressBar
          progress={subscriptionLevel}
          color={getStatusColor(subscriptionLevel)}
          style={{ backgroundColor: '#eff1f5', height: 10, borderRadius: 5 }}
        />
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Début: {startDate}</Text>
          <Text style={styles.dateText}>Fin: {endDate}</Text>
        </View>
      </>
    ),
  },
];


  const navigation = useNavigation();

  return (
    <>
      {child && (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <StackAppBarr title={child?.nom} goBack={navigation.goBack} />
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.content}>
                <View style={styles.profile}>
                  <View style={styles.profileTop}>
                    <View style={styles.avatar}>
                      <Image
                        alt=""
                        source={{
                          uri: child?.photo || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                        }}
                        style={styles.avatarImg}
                      />
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
                      ]}
                    >
                      <Text style={styles.statsItemText}>{label}</Text>
                      <Text style={styles.statsItemValue}>{value}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.contentActions}>
                  <TouchableOpacity
                    style={{ flex: 1, paddingHorizontal: 6 }}
                  >
                    <View style={styles.btnPrimary}>
                      <Text style={styles.btnPrimaryText}>Modifier</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={addPhoto}
                    style={{ flex: 1, paddingHorizontal: 6 }}
                  >
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Ajouter une photo</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <List.Section>
                  {child.abonnement && (
                    <View style={styles.list}>
                      <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>Abonnement et note</Text>
                      </View>
                      <View
                        contentContainerStyle={styles.listContent}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                      >
                        {items.map(({ icon, label, render }, index) => (
                          <TouchableOpacity
                            key={index}
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
                  )}
                  <View style={styles.list}>
                    <View style={styles.listHeader}>
                      <Text style={styles.listTitle}>Information sur l'enfant</Text>
                    </View>
                    <TouchableOpacity>
                      <List.Item
                        title="Nom et prénom"
                        left={() => <Ionicons size={30} name="person" style={{ marginLeft: 10 }} />}
                        description={child?.nom}
                      />
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity>
                      <List.Item
                        title="Ecole"
                        left={() => <Ionicons size={30} name="school" style={{ marginLeft: 10 }} />}
                        description={child?.ecole?.nom}
                      />
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity>
                      <List.Item
                        title="Classe"
                        left={() => <Ionicons size={30} name="school-outline" style={{ marginLeft: 10 }} />}
                        description={child?.class}
                      />
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity>
                      <List.Item
                        title="Date de naissance"
                        left={() => <Ionicons name="calendar" size={30} style={{ marginLeft: 10 }} />}
                        description={child?.dateNaissance}
                      />
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity>
                      <List.Item
                        title="Heure de départ"
                        description={child?.heureDepart}
                        left={() => <Ionicons name="time" size={30} style={{ marginLeft: 10 }} />}
                      />
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity>
                      <List.Item
                        title="Heure de sortie"
                        description={child?.heureSortie}
                        left={() => <Ionicons name="time-outline" size={30} style={{ marginLeft: 10 }} />}
                      />
                    </TouchableOpacity>
                    <Divider />
                    {child.distance && (
                      <TouchableOpacity>
                        <List.Item
                          title="Distance à parcourir"
                          left={() => <Ionicons name="walk" size={30} style={{ marginLeft: 10 }} />}
                          description={`${child?.distance} km`}
                        />
                      </TouchableOpacity>
                    )}

                     <Divider />
                    {child.prix && (
                      <TouchableOpacity>
                        <List.Item
                          title="Prix du transport"
                          left={() => <Ionicons name="cash" size={30} style={{ marginLeft: 10 }} />}
                          description={`${child?.prix} F CFA`}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </List.Section>
                 <Divider />
                    {!child.abonnement ? (
                      <TouchableOpacity
                        onPress={() => {
                          if (child.photo&&child.photo!=='') {
                            navigation.navigate('itineraire-config', { child });
                          }else{
                            Alert.alert('Erreur' , "Veillez ajouter d'abord une photo de votre enfant")
                          }
                        }}
                        style={{ flex: 1, paddingHorizontal: 6 }}
                      >
                        <View style={styles.btnPrimary}>
                          <Text style={styles.btnPrimaryText}>
                            Configurer l'itinéraire
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          let selectedEnfants = [];
                          selectedEnfants.push(child);
                          navigation.navigate('Suivre mes Enfants', { selectedEnfants });
                        }}
                        style={{ flex: 1, paddingHorizontal: 6 }}
                      >
                        <View style={styles.btnPrimary}>
                          <Text style={styles.btnPrimaryText}>
                            Suivre le trajet
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    <Br size={20} />
                    {child.chauffeur && (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('driver-profile', { child });
                        }}
                        style={{ flex: 1, paddingHorizontal: 6 }}
                      >
                        <View style={styles.btnPrimary}>
                          <Text style={styles.btnPrimaryText}>
                            Voir le profil du chauffeur
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  content: {
    paddingBottom: 50,
  },
  profile: {
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileBody: {
    marginLeft: 15,
  },
  profileTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#333',
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#999',
    marginTop: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  statsItem: {
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#E5E5E5',
    paddingLeft: 15,
  },
  statsItemText: {
    fontSize: 16,
    color: '#666',
  },
  statsItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  contentActions: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  btnPrimaryText: {
    color: '#FFF',
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#333',
    fontSize: 16,
  },
  list: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    elevation: 1,
    padding: 10,
  },
  listHeader: {
    paddingBottom: 10,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  listContent: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 10,
    width: CARD_WIDTH,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    padding: 15,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
    dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
});

