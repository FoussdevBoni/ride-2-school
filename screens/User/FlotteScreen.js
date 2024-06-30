import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../../assets/styles/colors';
import StackAppBarr from '../../components/sections/User/Appbars/StackAppBar';
import Banner from '../../components/sections/User/FlotteScreen/Banner';
import FlotteDetails from '../../components/sections/User/FlotteScreen/FlotteDetails';

function FlotteScreen({user}) {
    const navigation =  useNavigation()
    const route = useRoute()
    const { flotte } = route.params

    const scrollViewRef = useRef(null);
    const flotteDetailsRef = useRef(null);
    const [isFlotteDetailsAtTop, setIsFlotteDetailsAtTop] = useState(false);

    const handleScroll = (event) => {
        const scrollViewY = event.nativeEvent.contentOffset.y;

        console.log(scrollViewY)
        if (scrollViewY>254) {
            setIsFlotteDetailsAtTop(true)
        }else{
          setIsFlotteDetailsAtTop(false)
        }
    };

    useEffect(()=>{
           const flotteDetailsY = flotteDetailsRef.current

        console.log(flotteDetailsY._children._children)
    },[])
  console.log(isFlotteDetailsAtTop)
    return (
        <View style={styles.container}>
            <StackAppBarr title={'School Drive Service'} goBack={navigation.goBack}/>
             {
                 isFlotteDetailsAtTop &&( <View >
                 <FlotteDetails />
                
            </View>)
              }
            <ScrollView 
                ref={scrollViewRef} 
                onScroll={handleScroll} 
                style={styles.scrollView}
                scrollEventThrottle={16}
            >
                <Banner />
                <View ref={flotteDetailsRef}>
                  {
                    !isFlotteDetailsAtTop &&(  <FlotteDetails />)
                  }

                </View>

              
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    scrollView: {
        flex: 1,
    }
});

export default FlotteScreen;
