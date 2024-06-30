import React, { useState } from 'react';
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
import { Divider, List } from 'react-native-paper';

import { useNavigation, useRoute } from '@react-navigation/native';
import { takePhoto } from '../../functions/uploadPhoto';
import StackAppBarr from '../../components/sections/User/Appbars/StackAppBar';
import { colors } from '../../assets/styles/colors';
import { useDispatch } from 'react-redux';
import { logout } from '../../redurcer/userSlice';

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

export default function UserProfile({user}) {
  const [photo , setPhoto] = useState('')

const addPhoto = async ()=>{
  const date = new Date().toDateString()
  const response = await takePhoto('library' , 'profiles/enfants/'+date)
  if (response.uploadResp?.downloadUrl) {
    user.photo = response.uploadResp?.downloadUrl
    console.log(user.photo)
    setPhoto(response.uploadResp?.downloadUrl)
  }
}
const dispatch =useDispatch()

const loGout = ()=>{
  dispatch(logout())
}
 
  const navigation= useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StackAppBarr title={'Mon profile'} goBack={navigation.goBack}/>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.profile}>
              <View style={styles.profileTop}>
                <View style={styles.avatar}>
                  <Image
                    alt=""
                    source={{
                      uri: photo || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                    }}
                    style={styles.avatarImg} />

                 
                </View>

                <View style={styles.profileBody}>
                  <Text style={styles.profileTitle}>{user?.nom}</Text>

                  <Text style={styles.profileSubtitle}>
                    <Text style={{ color: '#266EF1' }}>
                      {user?.email}
                    </Text>
                  </Text>
                </View>
              </View>
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
          <TouchableOpacity onPress={() => handlePress('Sécurité')}>
            <List.Item
              title="Sécurité"
              left={() => <List.Icon icon="lock" />}
            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => handlePress('Langue')}>
            <List.Item
              title="Langue"
              left={() => <List.Icon icon="earth" />}
            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => handlePress('Mes contrats')}>
            <List.Item
              title="Mes contrats"
              left={() => <List.Icon icon="bus" />}
            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => handlePress('Mes factures')}>
            <List.Item
              title="Mes factures"
              left={() => <List.Icon icon="file-document" />}
            />
          </TouchableOpacity>
          <Divider />
          {/* Ajoutez d'autres éléments de la liste ci-dessous */}
          <TouchableOpacity onPress={() => handlePress('CGV/CGU')}>
            <List.Item
              title="CGV/CGU"
              left={() => <List.Icon icon="bookmark" />}
            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => handlePress('Confidentialité')}>
            <List.Item
              title="Confidentialité"
              left={() => <List.Icon icon="lock" />}
            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => handlePress('Archivage')}>
            <List.Item
              title="Archivage"
              left={() => <List.Icon icon="archive" />}
            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity  onPress={() => {
            loGout()
          }}>
            <List.Item
              title="Se déconnecter"
              left={() => <List.Icon icon="logout" />}
            />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => handlePress('Supprimer mon compte')}>
            <List.Item
              title="Supprimer mon compte"
              left={() => <List.Icon icon="delete" />}
            />
          </TouchableOpacity>
        </List.Section>
          </View>

          
        </ScrollView>
        
      </View>
    </SafeAreaView>
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