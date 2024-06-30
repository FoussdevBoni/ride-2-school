import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'

import { colors } from '../../assets/styles/colors'
import axios from 'axios'
const UpdateProfile = () => {
    const currentUser = useSelector(state => state.currentUser.user)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        token: '',
        infoUser: []
    })
    const [updateUser, setUpdateUser] = useState({})
    useEffect(() => {
        setUser({
            token: currentUser.token,
            infoUser: currentUser.user
        })
    }, [currentUser.token])
    console.log(currentUser);
    const handleChange = (key, value) => {
        setUpdateUser({
            ...updateUser, [key]: value
        })
    }
    const validationError = () => {
        if (!updateUser.nom || !updateUser.prenom || !updateUser.telephone || !updateUser.date_naissance || !updateUser.lieu_residence || !updateUser.piece_identification || !updateUser.num_piece_identification) {
            return false
        }
        return true
    }
    const handleUpdate = async () => {
        setIsLoading(true)
        const validate = validationError()
        if (!validate) {
            setError('Veiller remplier tous les champs')
            setIsLoading(false)
            return
        }
        try {
            const { data } = await axios.patch(`${updateUser}/${user.infoUser.id}`, updateUser)
            setIsLoading(false)
            console.log(data);
        } catch (err) {
            setIsLoading(false)
            console.log(err);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Mettre à jour vos informations</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text>{error}</Text>
                <TextInput
                    label="email"
                    value={user.infoUser.email}
                    onFocus={false}
                    style={styles.input}
                />
                <TextInput
                    label="Nom"
                    onChangeText={(text) => handleChange('nom', text)}
                    style={styles.input}
                />
                <TextInput
                    label="prenom"
                    onChangeText={(text) => handleChange('prenom', text)}
                    style={styles.input}
                />
                <TextInput
                    label="téléphone"
                    onChangeText={(text) => handleChange('telephone', text)}
                    style={styles.input}
                />
                <TextInput
                    label="date de naissance (dd/mm/aa) "
                    onChangeText={(text) => handleChange('date_naissance', text)}
                    style={styles.input}
                />
                <TextInput
                    label="lieu de résidence "
                    onChangeText={(text) => handleChange('lieu_residence', text)}
                    style={styles.input}
                />
                <TextInput
                    label="numéro de piece d'identification "
                    onChangeText={(text) => handleChange('num_piece_identification', text)}
                    style={styles.input}
                />
                <TextInput
                    label="piece d'identification "
                    onChangeText={(text) => handleChange('piece_identification', text)}
                    style={styles.input}
                />
            </View>
            <View style={styles.containerBtn}>
                <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
                    {
                        isLoading ? <ActivityIndicator size="large" color="white" /> :
                            <Text style={styles.textBtn}>
                                Update
                            </Text>
                    }

                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        alignItems: 'center',
        marginTop: 10
    },
    textHeader: {
        fontSize: 17,
        color: colors.primary,
        fontWeight: "bold"
    },
    inputContainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginVertical: 5,
        width: '80%'
    },
    containerBtn: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    btn: {
        backgroundColor: colors.primary,
        width: '60%',
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        color: 'white'
    }
})
export default UpdateProfile