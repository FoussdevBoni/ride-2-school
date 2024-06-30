import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../assets/styles/colors';

const Navbar = ({title, navigation}) => {
    return (
        <View style={styles.navBar}>
           {title !=='Mes Enfants' && <TouchableOpacity style={styles.navbarGoBack} onPress={() => navigation.goBack()}>
                <FAIcon
                    style={{ fontSize: hp("4%") }}
                    color={"white"}
                    name={'angle-left'} />
            </TouchableOpacity>}
            <Text style={styles.navBarTest}>{title}</Text>
            <TouchableOpacity
                onPress={() => { navigation.openDrawer() }}
                style={{ height: hp("3%"), width: hp("3%") }}>

                <FAIcon
                    style={{ color: "white", fontSize: hp("3%") }}
                    name={"bars"} />

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarGoBack: {
        marginTop: 10,
        marginLeft: 20
    },
    navbarGoBackText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    navBarTest: {
        color: 'white',
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        // marginRight: 95

    },
    navBar: {
        zIndex: 999,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        backgroundColor: colors.primary,
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default Navbar