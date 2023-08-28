import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

import { colors } from '../Global/Colors';

const {width} = Dimensions.get('window');
const SCREEN_WIDTH = width;

const CardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.addCard}>
        <Text style={styles.addCardText}>Saved Cards</Text>
        <Pressable style={styles.addButton}>
            <Entypo name="plus" size={24} color={colors.orange} />
            <Text style={styles.addCardText}>Add New</Text>
        </Pressable>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardVisa}>
          <View style={styles.userCardInfo}>
            <Image style={styles.imageChip} source={require('../Assets/img/chip.png')}/>
            <Image style={styles.image} source={require('../Assets/img/logoVisa.png')}/>
          </View>
          <Text style={styles.textCard}>4212 - 2345- 5768 - 9599</Text>
          <View style={styles.userCardInfo}>
            <View>
              <Text style={styles.userCardInfoTitle}>NAME</Text>
              <Text style={styles.userCardInfoSubtitle}>LIONEL ANDRES MESSI</Text>
            </View>
            <View>
              <Text style={styles.userCardInfoTitle}>EXPIRE DATE</Text>
              <Text style={styles.userCardInfoSubtitle}>10/2028</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardMastercard}>
          <View style={styles.userCardInfo}>
            <Image style={styles.imageChip} source={require('../Assets/img/chip.png')}/>
            <Image style={styles.imageMastercard} source={require('../Assets/img/logoMastercard.png')}/>
          </View>
          <Text style={styles.textCard}>2455 - 6556- 2243 - 8765</Text>
          <View style={styles.userCardInfo}>
            <View>
              <Text style={styles.userCardInfoTitle}>NAME</Text>
              <Text style={styles.userCardInfoSubtitle}>LIONEL ANDRES MESSI</Text>
            </View>
            <View>
              <Text style={styles.userCardInfoTitle}>EXPIRE DATE</Text>
              <Text style={styles.userCardInfoSubtitle}>07/2025</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CardScreen

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  addCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  addCardText: {
    fontFamily: 'SofiaBold',
    fontSize: 20,
    color: 'grey',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardVisa: {
    borderRadius: 10,
    width: SCREEN_WIDTH * .9,
    height: 225,
    backgroundColor: 'red',
    padding: 20,
    marginBottom: 20,
  },
  cardMastercard: {
    borderRadius: 10,
    width: SCREEN_WIDTH * .9,
    height: 225,
    backgroundColor: 'darkslategrey',
    padding: 20,
    marginBottom: 20,
  },
  image: {
    marginTop: 15,
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  imageMastercard: {
    marginTop: 15,
    width: 80,
    height: 50,
    resizeMode: 'cover',
  },
  imageChip: {
    marginTop: 15,
    width: 55,
    height: 50,
    resizeMode: 'contain',
  },
  textCard: {
    marginVertical: 16,
    fontFamily: 'SofiaBold',
    color: colors.white,
    fontSize: 30,
    letterSpacing: 1,
    paddingHorizontal: 10,
  },
  userCardInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  userCardInfoTitle: {
    fontFamily: 'Sofia',
    color: colors.white,
    fontSize: 18,
    letterSpacing: 1,
  },
  userCardInfoSubtitle: {
    fontFamily: 'SofiaBold',
    color: colors.white,
    fontSize: 22,
    letterSpacing: 0.5,
  },
})
