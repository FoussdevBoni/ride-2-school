// App.js
import React, { useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/User/HomeScreen';
import R2SScreen from '../screens/User/R2SScreen';
import ChildrenScreen from '../screens/User/ChildrenScreen';
import ContratScreen from '../screens/User/ContratScreen';
import TabAppBar from '../components/sections/User/Appbars/TabAppBar';
import { items } from '../data/routes';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { colors } from '../assets/styles/colors';
import NotificationsScreen from '../screens/User/NotificationsScreen';
import ProfileScreen from '../screens/User/ProfileScreeen';
import FlottesScreen from '../screens/User/FlottesScreen';
import FlotteScreen from '../screens/User/FlotteScreen';
import CarsListScreen from '../screens/User/CarsListScreen';
import { useSelector } from 'react-redux';
import ChildForm from '../screens/User/AddChild/ChildForm';
import ChoixPreferenceForm from '../screens/User/AddChild/ChoixPreferenceForm';
import ConfigResults from '../screens/User/AddChild/IteConfig';
import MapRoutes from '../screens/User/AddChild/IteConfigMap';
import Menu from '../screens/User/Menu';
import MealsList from '../screens/Cantine/Menu';
import ReservationForm from '../screens/Cantine/Reservation';
import ChildProfile from '../screens/User/ChildProfile';
import SuscriptionsOptions from '../screens/User/AddChild/SuscriptionsOptions';
import PayementForm from '../screens/User/AddChild/PaiementForm';
import DriverProfile from '../screens/User/DriverScreen';





const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({user}) => {
  ;

  const components = [
    <HomeScreen user={user}/>,
    <R2SScreen user={user}/>,
    <ChildrenScreen user={user} />,
    <ContratScreen user={user} />,
    <Menu user={user}/>

  ]



  console.log('utilisateur',user)
  return (
  <Tab.Navigator  screenOptions={{
        header: ({ route, navigation }) => (
          <TabAppBar route={route} navigation={navigation} user={user}/>
        )
      }}>
    {
          items.map((item , index)=>{
            return(
                 <Tab.Screen
           name={item.route}
           initialParams={{user: user}}
           options={{
              tabBarLabel: item.name,
            tabBarIcon: ({ color }) => {
             if (index===0) {
                return (
              <MaterialIcons name={item.icon}  size={26} color={color}/>
            )
             }else{
                return (
              <Ionicons name={item.icon}  size={26} color={color}/>
            )
             }
            },
             headerTitleStyle: { // Style du titre dans l'en-tête
             color: 'white', // Couleur du texte dans l'en-tête
             textAlign: 'center', // Alignement du texte au centre
             flex: 0, // Permet au texte de s'étendre pour être centré
            },
       
           headerStyle: { // Style de l'en-tête
           backgroundColor: colors.primary, // Couleur de fond de l'en-tête
      },
    }}
>
         {props =>components[index]}

      </Tab.Screen>
            )
          })
        }
  </Tab.Navigator>
);
}


const getGestureDirection = (route, navigation) => {
  if (route?.params?.previousRoute) {
    return 'horizontal';
  }
  return 'vertical';
};


const User = () => {
    const navigationRef = useRef(null);
  const user = useSelector(state => state.currentUser.user)

  return (
 <View style={{flex: 1}}>
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator   screenOptions={({ route, navigation }) => ({
          gestureDirection: getGestureDirection(route, navigation),
          ...TransitionPresets.SlideFromRightIOS,
        })}>

       <Stack.Screen name="parent" options={{ headerShown: false }}>
              {props=><TabNavigator {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="profil" options={{ headerShown: false }}>
              {props=><ProfileScreen {...props} user={user} />}
        </Stack.Screen>
         <Stack.Screen name="notifications" options={{ headerShown: false }}>
              {props=><NotificationsScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="flottes" options={{ headerShown: false }}>
              {props=><FlottesScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="flotte-details" options={{ headerShown: false }}>
              {props=><FlotteScreen {...props} user={user} />}
        </Stack.Screen>
         <Stack.Screen name="all-cars" options={{ headerShown: false }}>
              {props=><CarsListScreen {...props} user={user} />}
        </Stack.Screen>
         <Stack.Screen name="add-child" options={{ headerShown: false }}>
              {props=><ChildForm {...props} user={user} />}
        </Stack.Screen>
         <Stack.Screen name="choix-preferences" options={{ headerShown: false }}>
              {props=><ChoixPreferenceForm {...props} user={user} />}
        </Stack.Screen>
          <Stack.Screen name="itineraire-config" options={{ headerShown: false }}>
              {props=><ConfigResults {...props} user={user} />}
        </Stack.Screen>
          <Stack.Screen name="ite-config-map" options={{ headerShown: false }}>
              {props=><MapRoutes {...props} user={user} />}
        </Stack.Screen>
         <Stack.Screen name="repas-cantine" options={{ headerShown: false }}>
              {props=><MealsList {...props} user={user} />}
        </Stack.Screen>
           <Stack.Screen name="reservation-form" options={{ headerShown: false }}>
              {props=><ReservationForm {...props} user={user} />}
        </Stack.Screen>
         <Stack.Screen name="child-profile" options={{ headerShown: false }}>
              {props=><ChildProfile {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="suscriptions-options" options={{ headerShown: false }}>
              {props=><SuscriptionsOptions {...props} user={user} />}
        </Stack.Screen>
         <Stack.Screen name="payement-form" options={{ headerShown: false }}>
              {props=><PayementForm {...props} user={user} />}
        </Stack.Screen>

         <Stack.Screen name="driver-profile" options={{ headerShown: false }}>
              {props=><DriverProfile {...props} user={user} />}
        </Stack.Screen>

   </Stack.Navigator>
    </NavigationContainer>
 </View>
);
}



export default User;
