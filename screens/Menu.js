import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar } from 'react-native-paper'
import { colors } from '../assets/styles/colors'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { logout } from '../redurcer/userSlice'

const Enfants = [
    {
        id: 1,
        name: 'enfant1',
        image: require('../assets/images/Alain-Mabankou.jpg')
    },
    {
        id: 2,
        name: 'enfant2',
        image: require('../assets/images/Alain-Mabankou.jpg')
    },
    {
        id: 3,
        name: 'enfant3',
        image: require('../assets/images/Alain-Mabankou.jpg')
    },
    {
        id: 4,
        name: 'enfant4',
        image: require('../assets/images/Alain-Mabankou.jpg')
    },
    {
        id: 5,
        name: 'enfant5',
        image: require('../assets/images/Alain-Mabankou.jpg')
    }
]

{/* <Drawer.Screen name="Mes Enfants" component={ChildScreen} />
<Drawer.Screen name="Enrégistrer votre enfant" component={AddChildScreen} />
<Drawer.Screen name="Notifications" component={NotificationsScreen} />
<Drawer.Screen name="Signaler une urgence" component={UrgenceScreen} />
<Drawer.Screen name="Mon profile" component={ProfileScreen} />
<Drawer.Screen name="Mes historiques" component={HistoMenu} />
<Drawer.Screen name="Gas" component={ContratScreen} />
<Drawer.Screen name="Historique des transactions" component={HistoTrans} />
<Drawer.Screen name="Historique des déplacements" component={HistoRide} />
<Drawer.Screen name="Mes conducteurs" component={DriverScreen} />
<Drawer.Screen name="R2S" component={R2SScreen} /> */}
const Services = [
    {
        name: 'mes enfants',
        icon: 'person-outline',
        route: 'myChildren',
        color: colors.primary
    },
    {
        name: 'Enregistrer un enfant',
        icon: 'person-add',
        route: 'savedChild',
        color: colors.primary,
    },
    {
        name: 'Mon profil',
        icon: 'person',
        route: 'profile',
        color: colors.primary
    },
    {
        name: 'Historique',
        icon: 'time',
        route: 'historiques',
        color: 'green',
    },
    {
        name: 'Conducteurs',
        icon: 'car',
        route: 'conducteurs',
        color: 'pink'
    },
    {
        name: 'Signaler un probleme',
        icon: 'warning',
        route: 'urgence',
        color: 'red'
    },
]

const Menu = ({ navigation }) => {
    // const navigation = useNavigation()
    // console.log(navigation);
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser.user)
    const MyChildrens = ({ name, image }) => {
        return (
            <TouchableOpacity style={profileStyle.myhild}>
                <Avatar.Image
                    source={image}
                    size={50}

                />
                <Text style={{}} >{name}</Text>
            </TouchableOpacity>
        )
    }

    const singout = () => {
        dispatch(logout())
    }

    const MyService = ({ name, route, icon, color }) => {
        const handlePress = (value) => {
            console.log(value);
        }
        return (
            <TouchableOpacity style={profileStyle.services} onPress={() => navigation.navigate(route)} >
                <View>
                    <Ionicons name={icon} size={24} color={color} style={{ marginLeft: 20 }} />
                </View>
                <View>
                    <Text style={{ marginTop: 10, marginLeft: 20 }}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={profileStyle.container}>
                <TouchableOpacity style={profileStyle.header}>
                    <View style={profileStyle.avatarContainer} >
                        <Avatar.Image
                            source={require('../assets/images/Alain-Mabankou.jpg')}
                            size={40}
                        />
                    </View>
                    <View style={profileStyle.nameContainer}>
                        <Text style={profileStyle.nameText}>{currentUser.nom}</Text>
                    </View>
                    <View style={profileStyle.themeIcon}>
                        <Ionicons name='settings' size={25} color={colors.primary} />
                    </View>


                </TouchableOpacity>

                <View style={profileStyle.textEnfants}>
                    <Text style={profileStyle.textItem}>Vos enfants </Text>
                </View>
                <FlatList
                    data={Enfants}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <MyChildrens name={item.name} image={item.image} />
                    )}

                />

                <View style={profileStyle.textEnfants}>
                    <Text style={profileStyle.textItem}>Vos Services </Text>
                </View>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginBottom: 50, justifyContent: 'space-between' }} >
                    {
                        Services.map((item, index) => {
                            return (
                                <MyService name={item.name} route={item.route} icon={item.icon} color={item.color} key={item.name} />
                            )
                        })
                    }
                </View>
                <TouchableOpacity style={profileStyle.decconected} onPress={singout}>
                    <Text style={{ color: colors.primary, fontWeight: 'bold' }} >Deconnecter</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Menu

const profileStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: '#fff',
        // marginTop: 5
    },
    header: {
        marginTop: 5,
        flexDirection: 'row',
        marginLeft: 10,
        height: 80,
        shadowOffset: {
            width: 1,
            height: 5,
        },
        borderRadius: 10,
        shadowOpacity: 0.6,
        shadowColor: colors.primary,
        shadowRadius: 4,
        elevation: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    avatarContainer: {
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10
        // marginBottom: 16,
    },
    themeIcon: {
        // marginLeft:180
        flex: 1,
        // justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        marginRight: 10
        // backgroundColor:'red'

    },
    textEnfants: {
        margin: 20
    },
    textItem: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.primary
    },
    myhild: {
        margin: 20
    },
    services: {
        width: '47%',
        marginTop: 5,
        marginRight: 10,
        height: 120,
        justifyContent: 'center',
        shadowOffset: {
            width: 1,
            height: 5,
        },
        borderRadius: 10,
        shadowOpacity: 0.6,
        shadowColor: colors.primary,
        shadowRadius: 4,
        elevation: 10,
        backgroundColor: 'white'
    },
    nameContainer: {
        alignItems: 'center',
        // marginBottom: 16,
        marginLeft: 10
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    contactContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    phoneNumber: {
        flex: 1,
        marginRight: 8,

    },
    editButton: {
        flex: 1,
        backgroundColor: colors.primary,
        width: 200,
        marginTop: 15
    },
    appBar: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 6
    },
    appBarTitle: {
        textAlign: 'center',

    },
    decconected: {
        marginBottom: 50,
        // flexDirection: 'row',
        marginLeft: 10,
        height: 50,
        shadowOffset: {
            width: 1,
            height: 5,
        },
        borderRadius: 10,
        shadowOpacity: 0.6,
        shadowColor: colors.primary,
        shadowRadius: 4,
        elevation: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});