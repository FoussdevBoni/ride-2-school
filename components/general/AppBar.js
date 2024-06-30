
import React from 'react'
import { Appbar } from 'react-native-paper'


const AppBar = ({title, goback}) => {
  return (
    <Appbar.Header>
        <Appbar.BackAction onpress = {goback} color = 'white'/>
        <Appbar.Content title = {title} titleStyle = {{color: 'white'}}/>
    </Appbar.Header>
  )
}
// import { Appbar } from 'react-native-paper'


export default AppBar