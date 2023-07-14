import { StyleSheet, Text, View, Image, Button, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import allProducts from '../Data/products.json';
import { colors } from '../Global/Colors';

const ItemDetail = ({ navigation, route }) => {

  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    //Encontrar el producto por su id
    const productSelected = allProducts.find(
        (product) => product.id === productId
        );
    setProduct(productSelected);
  }, [productId]);

  return (
    <>
      <Button onPress={() => navigation.goBack()} title="Go back" />
      { product ?
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image 
            resizeMode='cover'
            style = {styles.image}
            source={{uri: product.images}}
          />
        </View>
        <Text>${product.price}</Text>
        <Text>{product.title}</Text>
        <Text>{product.description}</Text>
        <Pressable style={styles.buttonCart} onPress={() => {}}>
          <Text style={styles.buttonCartText}>+ Add to Cart</Text>
        </Pressable>
      </View>
      : null }
    </>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  productContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  imageContainer: {
    height: 350,
    width: '100%',
    justifyContent: 'flex-start',
  },
  image: {
    height: '100%',
    width: '100%',
    alignSelf: 'flex-start',
    resizeMode: 'cover',
    borderBottomLeftRadius: 60,
    overflow: 'hidden',
  },
  buttonCart: {
    marginTop: 30,
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 40,
    padding: 10,
    height: 60,
    width: 150,
    justifyContent: 'bottom',
    alignItems: 'center',
  },
  buttonCartText: {
    fontFamily: 'SofiaBold',
    letterSpacing: 1,
    fontSize: 18,
    color: colors.white
  }
})