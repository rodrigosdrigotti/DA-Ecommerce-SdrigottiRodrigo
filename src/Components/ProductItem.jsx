import React from 'react';
import { useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Image, StyleSheet, View, Text, Pressable, useWindowDimensions } from 'react-native';

import Card from './Card';
import { colors } from '../Global/Colors';
import { setIdSelected  } from '../Features/Shop/shopSlice';

const ProductItem = ({ item, navigation }) => {

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  const onSelect = (id) => {
    dispatch(setIdSelected(item.id))
    navigation.navigate('Detail', {productId: item.id})
  }
  
  return (
    <Pressable onPress={() => onSelect(item.id)}>
      <Card
        additionalStyle={width > 350 ? styles.additionalStylesCard : styles.additionalStylesCardSM}
      >   
          <View style={styles.imageContainer}>
            <Image 
              resizeMode='cover'
              style = {styles.image}
              source={{uri: item.images[0]}}
            />
          </View>
          <View style={width > 350 ? styles.infoContainer : styles.infoContainerSM}>
            <Text style={styles.textCategory}>{item.title}</Text>
            <Text style={styles.textPrice}>${item.price}</Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="arrow-right-bold-box" size={35} color={colors.secondary} />
          </View>
      </Card>
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  image: {
    height: 85,
    width: 85,
    resizeMode: 'cover',
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset:{
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  additionalStylesCard: {
    flexDirection: 'row',
    height: 120,
    width: 350,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    borderRadius: 25,
  },
  additionalStylesCardSM: {
    flexDirection: 'row',
    height: 120,
    width: 275,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    borderRadius: 25,
  },
  infoContainer: {
    flexDirection: 'column',
    textAlign: 'left',
    alignSelf: 'center',
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
    fontSize: 20,
    fontFamily: 'Sofia',
    marginTop: 10,
    color: colors.orange,
  },
  iconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 5
  }
})