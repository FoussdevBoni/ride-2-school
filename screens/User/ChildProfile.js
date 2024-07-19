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

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

export default function ChildProfile() {
  const route = useRoute();
  const { child } = route.params;


  const stats = [
    { label: 'Ecole', value: child?.ecole?.nom },
    { label: 'Classe', value: child?.class },
    { label: 'Date de naissance', value: child?.dateNaissance },
  ];

  const [photo, setPhoto] = useState('');

  const addPhoto = async () => {
    const date = new Date().toDateString();
    const response = await takePhoto('library', 'profiles/enfants/' + date);
    if (response.uploadResp?.downloadUrl) {
      child.photo = response.uploadResp?.downloadUrl;
      setPhoto(response.uploadResp?.downloadUrl);
      console.log(child?.photo);
    }
  };

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

  const navigation = useNavigation();

  return (
    <>
      {child && (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <StackAppBarr title={child?.nom} goBack={navigation.goBack} />
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
                    onPress={() => {
                      addPhoto();
                    }}
                    style={{ flex: 1, paddingHorizontal: 6 }}
                  >
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>
                        Ajouter une photo
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <List.Section>
                  {child.abonnement && child.chauffeur && (
                    <View style={styles.list}>
                      <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>Progression des données</Text>
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
                </List.Section>
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
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  profile: {
    width: '100%',
    padding: 12,
  },
  profileTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileBody: {
    justifyContent: 'center',
    flexShrink: 1,
    paddingLeft: 20,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f1f1f',
    marginBottom: 8,
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#1f1f1f',
  },
  avatar: {
    width: 90,
    height: 90,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 99,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#F0F2F4',
    borderRadius: 5,
    padding: 8,
  },
  statsItem: {
    flex: 1,
    paddingHorizontal: 12,
    borderLeftColor: '#E5E5E5',
    borderLeftWidth: 1,
  },
  statsItemText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#A8ADB7',
    marginBottom: 6,
  },
  statsItemValue: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentActions: {
    marginTop: 16,
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#F0F2F4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  btnPrimaryText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  list: {
    marginTop: 10,
    paddingHorizontal: 8,
    backgroundColor: '#F0F2F4',
    borderRadius: 5,
  },
  listHeader: {
    paddingHorizontal: 12,
    paddingTop: 15,
    paddingBottom: 15,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  listContent: {
    paddingVertical: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    borderColor: '#F0F2F4',
    borderWidth: 1,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.41,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
  },
  cardIcon: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#F0F2F4',
    marginRight: 12,
  },
  cardBody: {
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
