import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import React from 'react';
import Card from './Card';
import { colors } from '../Global/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const ProductItem = ({item, navigation}) => {

  const onSelect = (id) => {
    navigation.navigate('Detail', {productId: item.id})
  }
  
  return (
    <Pressable onPress={() => onSelect(item.id)}>
      <Card
        additionalStyle={styles.additionalStylesCard}
      >   
          <View style={styles.imageContainer}>
            <Image 
              resizeMode='cover'
              style = {styles.image}
              source={{uri: item.images}}
            />
          </View>
          <View style={styles.infoContainer}>
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
    shadowColor: "#000",
    shadowOffset:{
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
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
  infoContainer: {
    flexDirection: 'column',
    textAlign: 'left',
    alignSelf: 'center',
    width: '50%',
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
    marginTop: 10
  },
  iconContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 5
  }
})