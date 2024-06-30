import * as React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper'
import { colors } from '../../assets/styles/colors';
import Home from '../../screens/Home';
import R2SScreen from '../../screens/R2SScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';
import Menu from '../../screens/Menu';
import { createStackNavigator } from '@react-navigation/stack';
import UrgenceScreen from '../../screens/User/UrgenceScreen';
import Profile from '../../screens/ProfileScreen';
import HistoMenu from '../../screens/User/Historique';
import ContratScreen from '../../screens/ContratScreen';
import HistoTransItem from './HistoTransItem';
import DriverScreen from '../../screens/User/DriverScreen';
import EnfantForm from '../../screens/AddChildScreen';
import ChildScreen from '../../screens/EnfantsScreen';
import IteConfig from './AddChild/IteConfig';
import GerantDeCasForm from './AddChild/GerantDeCasForm';
import ChoixPreferenceForm from './AddChild/ChoixPreferenceForm';
import UpdateProfile from '../../screens/User/UpdateProfile';


// export const items = [
//   {
//     icon: 'person',
//     route: 'Mes Enfants'
//   },
//   {
//     icon: 'person-add',
//     route: 'Enrégistrer votre enfant'
//   },
//   {
//     icon: 'map',
//     route: 'R2S'
//   },
//   {
//     icon: 'person',
//     route: 'Mes conducteurs'
//   },
//   {
//     icon: 'warning',
//     route: 'Signaler une urgence'
//   },
//   {
//     icon: 'notifications',
//     route: 'Notifications'
//   },
//   {
//     icon: 'time',
//     route: 'Mes historiques'
//   },
//   {
//     icon: 'cash',
//     route: 'Gas',

//   },
//   {
//     icon: 'person',
//     route: 'Mon profile'
//   },
// ]
const Stack = createStackNavigator();

const OhterDrow = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        useLegacyImplementation
        initialRouteName="Menu"
        drawerContent={props => <DrawerMenu {...props} />}
      >
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="savedChild" component={EnfantForm} />
        <Stack.Screen name = "myChildren" component={ChildScreen}/>
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="urgence" component={UrgenceScreen} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="historiques" component={HistoMenu} />
        <Stack.Screen name="Gas" component={ContratScreen} />
        <Stack.Screen name="transactions" component={HistoTransItem} />
        {/* <Stack.Screen name="Historique des déplacements" component={HistoRide} /> */}
        <Stack.Screen name="conducteurs" component={DriverScreen} />
        <Stack.Screen name="R2S" component={R2SScreen} />
        <Stack.Screen name="Configurer l'itinéraire" component={IteConfig} screenOptions={{
          header: (props) => <CustomHeader title={"Configurer l'itinéraire"} />, headerShown: false
        }} />
        <Stack.Screen name="Enrégister le gérant de cas" component={GerantDeCasForm} />
        <Stack.Screen name="Choisir vos préférences" component={ChoixPreferenceForm} />
        <Stack.Screen name="updateProfile" component={UpdateProfile} />


        {/* Ajoutez d'autres écrans au Drawer ici */}
      </Stack.Navigator>
  )
}

export const items = [
  {
    icons:'home',
    name:'Accueil',
    route: 'Ride 2 School',
    render: <Home/>,
    headerShow: false
},
{
    icons:'map',
    name:'R2S',
    route: 'Suivre mes Enfants',
    render: <R2SScreen/>,
    headerShow: false
},
{
    icons:'notifications',
    name:'notifications',
    route: 'notifications',
    render: <NotificationsScreen/>,
    headerShow: false
},
{
    icons:'person',
    name:'Mon Profile',
    route: 'Mon Profile',
    render:<OhterDrow/>,
    headerShow: false
},
]


const DrawerMenu = ({ navigation }) => {
  return (
      <View style={{marginTop:50}}>
        {/* <Text style={styles.logo}>BetaCARD</Text> */}

        {
          items.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity onPress={() => navigation.navigate(item.route)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 20 }}>
                  <Ionicons name={item.icons} size={24} color="black" />
                  <Text style={{ marginLeft: 10, color:'white' }} >{item.route}</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>

                </View>
                <Divider />
              </View>
            )
          })
        }
      </View>
  );
};


const styles = StyleSheet.create({
  logo:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  }
})

export default DrawerMenu