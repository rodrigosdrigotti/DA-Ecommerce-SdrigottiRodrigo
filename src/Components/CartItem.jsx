import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react';
import Card from './Card';
import { colors } from '../Global/Colors';
import { Feather, Entypo } from '@expo/vector-icons'; 


const CartItem = ({ cartItem }) => {

  const { width } = useWindowDimensions();

  return (
    <Card
        additionalStyle={width > 350 ? styles.additionalStylesCard : styles.additionalStylesCardSM}
      >   
          <View>
            <Feather name="check-square" size={20} color={colors.orange} />
          </View>
          <View style={styles.imageContainer}>
            <Image 
              resizeMode='cover'
              style = {styles.image}
              source={{uri: cartItem.images}}
            />
          </View>
          <View style={width > 350 ? styles.infoContainer : styles.infoContainerSM}>
            <Text style={styles.textCategory}>{cartItem.title}</Text>
            <View style={styles.iconContainer}>
              <Text style={styles.textPrice}>${cartItem.price}</Text>
              <View style={styles.masMenosIcon}>
                <Entypo name="minus" size={12} color="grey" />
                <Text style={styles.masMenosIconText}>1</Text>
                <Entypo name="plus" size={12} color="grey" />
              </View>
            </View>
          </View>
      </Card>
  )
}

export default CartItem

const styles = StyleSheet.create({
  image: {
    height: 85,
    width: 85,
    marginHorizontal: 15,
    resizeMode: 'cover',
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 15,
  },
  additionalStylesCard: {
    flexDirection: 'row', 
    height: 120,
    width: 350,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'none',
    shadowColor: 'transparent', 
    margin: -15 
  },
  additionalStylesCardSM: {
    flexDirection: 'row',
    height: 120,
    width: 275,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'none',
    shadowColor: 'transparent',  
  },
  infoContainer: {
    flexDirection: 'column',
    width: '50%',
  },
  infoContainerSM: {
    flexDirection: 'column',
    textAlign: 'left',
    alignSelf: 'center',
    width: '35%',
  },
  textCategory: {
    width: '100%',
    fontSize: 20,
    fontFamily: 'SofiaBold',
    color: colors.secondary,
  },
  textPrice: {
    width: 100,
    fontSize: 22,
    fontFamily: 'Sofia',
    marginTop: 10,
    color: colors.orange,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  masMenosIcon: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
  },
  masMenosIconText: {
    fontSize: 15,
    fontFamily: 'SofiaBold',
    color: 'grey',
  }
})