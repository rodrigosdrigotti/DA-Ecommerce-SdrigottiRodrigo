import { StyleSheet, Text, View, Pressable, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../Global/Colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouseUser, faBarsStaggered, faArrowLeft, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import ModalAlert from '../Components/Modal';

const Header = ({route, navigation}) => {

  const { width } = useWindowDimensions();
  const ruta = route.name;
  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const onPressCart = (product) => {
    setModalVisible(!modalVisible); 
    setMensaje('El carrito aun no funciona');
  }

  return (
    <View>
      { ruta === 'SB Entrenamientos' ? 
        <View style={styles.containerHeader}>
          <FontAwesomeIcon icon={faBarsStaggered} size={ width > 350 ? 26 : 22 } color={ colors.secondary }/>
          <Text style ={width > 350 ? styles.text : styles.textSM}>{route.name}</Text>
          <FontAwesomeIcon icon={faHouseUser} size={ width > 350 ? 32 : 28} color={ colors.secondary }/>
        </View>
      :
        <View style={styles.containerHeader}>
          <Pressable onPress={()=>navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} size={ width > 350 ? 26 : 22 } color={ colors.secondary } />
          </Pressable>
          <Text style ={width > 350 ? styles.text : styles.textSM}>{route.name}</Text>
          <Pressable onPress={() => onPressCart()}>
            <FontAwesomeIcon icon={faCartShopping} size={ width > 350 ? 26 : 22 } color={ colors.secondary } />
          </Pressable>
        </View>
      }
        <ModalAlert
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          mensaje={mensaje}
        />    
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
      paddingVertical: 30,
      backgroundColor: colors.primary,
    },
    text: {
        fontSize: 30,
        fontFamily: 'SofiaBold',
        color: colors.secondary,
        textTransform: 'uppercase',
    },
    textSM: {
      fontSize: 24,
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