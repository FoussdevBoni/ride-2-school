import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Rating } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { driveroute, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { getDriver } from '../../utils/api';
import { colors } from '../../assets/styles/colors';
import ReviewForm from '../../components/sections/User/Avis/NewAvis';
import ReviewItem from '../../components/items/User/Avis/AvisItem';
import StackAppBarr from '../../components/sections/User/Appbars/StackAppBar';


const tags = ['ios', 'android', 'web', 'ui', 'ux'];

const CARD_WIDTH = Math.min(Dimensions.get('screen').width * 0.75, 400);

export default function DriverProfile() {
  const route = useRoute()
  const {child} = route.params
  const [driver , setDriver ] = useState(null)
  const [reviews, setReviews] = useState([]);

  async function getDriverData() {
    const driverId = child?.chauffeur || '662f7219e0c118cc16276a3f'
    try {
      const response = await axios.get(getDriver+'/'+driverId)
      const data = response.data
      setDriver(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getDriverData()
  }, [])

  const getStatusColor = (status) => {
    if (status <= 0.3) {
      return 'red';
    } else if (status > 0.3 && status < 0.5) {
      return 'orange';
    } else {
      return 'green';
    }
  };

  const handleReviewSubmit = (reviewData) => {
    // Mock API call to submit review
    const newReview = {
      userName: 'Utilisateur Test',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      ...reviewData,
    };
    setReviews([newReview, ...reviews]);
  };

  const stats = [
    { label: 'Ville', value: driver?.ville },
    { label: 'Quartier', value: driver?.quartier },
    { label: 'Experience', value: '6 years' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StackAppBarr title={driver?.nom}/>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.profile}>
              <View style={styles.profileTop}>
                <View style={styles.avatar}>
                  <Image
                    alt=""
                    source={{
                      uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                    }}
                    style={styles.avatarImg}
                  />

                  <View style={styles.avatarNotification} />
                </View>

                <View style={styles.profileBody}>
                  <Text style={styles.profileTitle}>{driver?.nom}</Text>

                  <Text style={styles.profileSubtitle}>
                    chauffeur
                    {' · '}
                    <Text style={{ color: '#266EF1' }}>{driver?.email}</Text>
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
                onPress={() => {
                }}
                style={{ flex: 1, paddingHorizontal: 6 }}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>
                    Contacter
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={{ flex: 1, paddingHorizontal: 6 }}
              >
                <View style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>
                    Signaler
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}></Text>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              ></TouchableOpacity>
            </View>
          </View>

         

          <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>
                Que pensez-vous de ce chauffeur ?
              </Text>
            </View>

            <ReviewForm onSubmit={handleReviewSubmit} />
            
             <View style={styles.listHeader}>
              <Text style={styles.listTitle}>
                Autres commentaires
              </Text>
            </View>
            <View style={styles.reviews}>
              {reviews.map((review, index) => (
                <ReviewItem key={index} review={review} />
              ))}
              {reviews.length === 0 && (
                <Text style={styles.noReviewsText}>
                  Aucun avis pour le moment.
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  profile: {
    marginBottom: 16,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 16,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarNotification: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#266EF1',
  },
  profileBody: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingTop: 16,
    paddingBottom: 16,
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  statsItemText: {
    fontSize: 12,
    color: '#888',
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  contentActions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  btn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  btnText: {
    fontSize: 16,
    color: '#666',
  },
  btnPrimary: {
    backgroundColor: '#266EF1',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  btnPrimaryText: {
    fontSize: 16,
    color: '#fff',
  },
  list: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    marginVertical: 8,
  },
  statItemLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  statItemValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  reviews: {
    marginTop: 16,
  },
  noReviewsText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 16,
  },
});

