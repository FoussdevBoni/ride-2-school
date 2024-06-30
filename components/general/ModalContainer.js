import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

const ModalContainer = ({ children }) => {
    return (
        <View style={styles.container} >
            <View style={styles.modalContainer} >
                <View style={styles.modalontent} >
                    <ScrollView horizontal={false}>
                        {children}
                    </ScrollView>
                </View>

            </View>
        </View>
    )
}

export default ModalContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    modalContainer:{
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    modalontent:{
        backgroundColor:'white',
        padding:10,
        borderRadius: 0,
        flex: 1,
    }
})