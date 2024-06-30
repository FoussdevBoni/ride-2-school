import React, { useRef, useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StartScreen from '../screens/StartScreen';
import SignInScreen from '../screens/SignInSreen';
import HomeScreen from '../screens/Visitor/HomeScreen';
import StepTwo from '../components/particular/SignUp/StepTwo';
import Register from '../screens/SignUpScreen';
import Login from '../screens/SignInSreen';
import Register2 from '../screens/SignUpscreen2';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const getGestureDirection = (route, navigation) => {
  if (route?.params?.previousRoute) {
    return 'horizontal'
  }
  return 'vertical';
};

const Visitor = () => {
  const navigationRef = useRef(null);
  const [connected, setConnected] = useState();

  useEffect(() => {}, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
          gestureDirection: getGestureDirection(route, navigation),
          ...TransitionPresets.SlideFromRightIOS, // ou toute autre transition que vous souhaitez utiliser
        })}
      >
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="inscription" component={Register} options={{
           headerShown: false,  
           }} />
           <Stack.Screen name="inscription2" component={Register2} options={{
           headerShown: false,  
           }} />
        {/* <Stack.Screen name="Créer un compte/Etape2" component={SignUpScreen2} options={{ headerShown: false }} /> */}
        <Stack.Screen name="connexion" component={Login} options={{ headerShown: false }} />
         
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Visitor;
