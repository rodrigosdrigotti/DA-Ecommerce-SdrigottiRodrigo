import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouseUser, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';


const Header = () => {
  return (
    <View style={styles.containerHeader}>
      <FontAwesomeIcon icon={faBarsStaggered} size={ 26 } color={ colors.secondary }/>
      <Text style ={styles.text}>SB Entrenamientos</Text>
      <FontAwesomeIcon icon={faHouseUser} size={ 32 } color={ colors.secondary }/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    containerHeader: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: 40,
    },
    text: {
        fontSize: 30,
        fontFamily: 'SofiaBold',
        color: colors.secondary,
        textTransform: 'uppercase',
    },
    imageLogo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    }
})