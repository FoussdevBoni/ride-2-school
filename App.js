import  React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from './redurcer/store';
import Visitor from './navigation/Visitor'
import User from './navigation/User'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {colors} from './assets/styles/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import sendRandomPushNotification from './functions/getnotifications';
import PushNotifications from './components/PushNotif/PushNotif';
import { NativeBaseProvider, Text, Box } from "native-base";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
     surface: 'white' // Modifiez cette couleur pour votre couleur préférée
  },
};


const Navigation = ()=>{
   const currentUser = useSelector((state)=> state.currentUser)
   console.log(currentUser.conected);
     if(!currentUser.conected){
        return (
          <Visitor />
        )
     }else{
        return (
       <User />
     )
     }
}
export default function App() {


  return (
<NativeBaseProvider>
 <PaperProvider theme={theme}>
 <GestureHandlerRootView style={{ flex: 1 ,backgroundColor: '#ECF0F1' }}>
   <Provider store={store}>
        <StatusBar style="light" backgroundColor={''}/>
        <PushNotifications />
       <Navigation />
   </Provider>
   </GestureHandlerRootView>
  </PaperProvider>
    </NativeBaseProvider>

  );
}


