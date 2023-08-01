import { StyleSheet, Text, View, Image, useWindowDimensions, Pressable } from 'react-native'
import React from 'react';
import Card from './Card';
import { colors } from '../Global/Colors';
import { Feather, Ionicons } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from '../Features/Cart/cartSlice';
import { useEffect, useState } from 'react';

const CartItem = ({ cartItem }) => {

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const productIdSelected = useSelector((state) => state.shopReducer.value.productIdSelected);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(productIdSelected);
  }, [productIdSelected]);

  const onRemoveProductCart = () => {
    dispatch(removeCartItem({
      ...product
    }))
  }

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
              <Text style={styles.textPrice}>- Cant: {cartItem.quantity}</Text>
              <Pressable onPress={() => onRemoveProductCart()}>
                <Ionicons style={styles.masMenosIcon} name="trash" size={22} color={colors.secondary} />
              </Pressable>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 30,
  },
})