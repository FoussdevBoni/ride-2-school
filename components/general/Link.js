import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

import UrgenceScreen from '../../screens/UrgenceScreen'
import { FlatList, Modal, TouchableOpacity, View, StyleSheet } from 'react-native'
import { colors } from '../../assets/styles/colors'
import AppBar from './AppBar'
import ModalContainer from './ModalContainer'



const links = [
  {
    name: 'Contact Betacar',
    icon: 'call'
  },
  {
    name: 'Contacter un chauffeur',
    icon: 'call-outline'
  },
  {
    name: 'Envoyer une urgence',
    icone: 'warning',
    render: <UrgenceScreen />
  },
  {
    name: 'Historique de déplacement',
    icon: 'bus'
  },
  {
    name: 'La Résa',
    icon: 'person'
  },
  {
    name: 'Noter Chauffeur',
    icon: 'start'
  }
]

function Link() {

  const [value, setValue] = useState({
    render: null,
    title: '',
    isMOdalVisible: false
  })

  const GridElement = ({ title, icon, render }) => {
    <TouchableOpacity style={StyleSheet.gridItem} onPress={() => {
      if (value.render !== undefined) {
        setValue({
          render: render,
          title: title,
          isMOdalVisible: true
        })
      }
    }} >
      <Ionicons name={icon} size={30} color={colors.primary} />
      <Text style={styles.gridItemText} > {title} </Text>
    </TouchableOpacity>
  }

  return (
    <View>
      <FlatList
        data={links}
        renderItem={({ item }) => (
          <GridElement title={item.name} icon={item.icon} render={item.render} />
        )}
        keyExtractor={(item) => item.name.toString()}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={value.isMOdalVisible}
        onRequestClose={() => {
          setValue({ ...value, isMOdalVisible: false });
        }}
      >
        <AppBar title={title} goback={() => setValue({ ...value, isMOdalVisible: false })} />
        <ModalContainer children={render}/>
      </Modal>
    </View>
  )
}

export default Link

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 10
  },
  gridItemText:{
    marginTop:10,
    fontSize:16,
    fontWeight: 'bold',
    textAlign:'center'
  }
})