import { StyleSheet, Text, View, ImageBackground, Pressable, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import allProducts from '../Data/products.json';
import { colors } from '../Global/Colors';
import ModalAlert from '../Components/Modal';

const ItemDetail = ({ route }) => {

  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');
  
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productSelected = allProducts.find(
        (product) => product.id === productId
        );
    setProduct(productSelected);
  }, [productId]);

  const onPressCart = (product) => {
    setModalVisible(!modalVisible); 
    setMensaje(product.title+'\n\n'+'ha sido agregado al carrito');
  }

  return (
    <>
      { product ?
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <ImageBackground 
            resizeMode='cover'
            style = {styles.image}
            source={{uri: product.images}}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={ width > 350 ? styles.productPrice : styles.productPriceSM }>${product.price}</Text>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productTitleDescription}>Descripción:</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
        <View style={styles.buttonCartContainer}>
          <Pressable style={width > 350 ? styles.buttonCart : styles.buttonCartSM} onPress={() => onPressCart(product)}>
            <Text style={styles.buttonCartText}>+ Add to Cart</Text>
          </Pressable>
        </View>
        <ModalAlert
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                product={product}
                mensaje={mensaje}
        />

      </View>
      : null }
    </>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  productContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'flex-end',
  },
  backIcon: {
    paddingHorizontal: 40,
  },
  imageContainer: {
    height: 300,
    width: '80%',
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 30,
    overflow: 'hidden',
  },
  infoContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  productPrice:{
    color: colors.orange,
    fontFamily: 'SofiaExtraBold',
    fontSize: 32,
  }, 
  productPriceSM:{
    color: colors.orange,
    fontFamily: 'SofiaExtraBold',
    fontSize: 28,
  }, 
  productTitle: {
    fontFamily: 'SofiaBold',
    color: colors.secondary,
    fontSize: 24,
    marginBottom: 20,
  },
  productTitleDescription: {
    fontFamily: 'SofiaBold',
    color: colors.secondary,
    fontSize: 18,
    marginBottom: 5,
  },
  productDescription: {
    fontFamily: 'Sofia',
    fontSize: 18,
    letterSpacing: 0.5,
    color: 'grey'
  }, 
  buttonCartContainer: {
    alignSelf: 'center',
  },
  buttonCart: {
    marginTop: 30,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 60,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset:{
      width: 1,
      height: 3,
    },
      shadowOpacity: 0.4,
      shadowRadius: 9,
      elevation: 7,
  },
  buttonCartSM: {
    marginTop: 30,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 50,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset:{
      width: 1,
      height: 3,
    },
      shadowOpacity: 0.4,
      shadowRadius: 9,
      elevation: 7,
  },
  buttonCartText: {
    fontFamily: 'SofiaBold',
    letterSpacing: 1,
    fontSize: 20,
    color: colors.white
  }
})