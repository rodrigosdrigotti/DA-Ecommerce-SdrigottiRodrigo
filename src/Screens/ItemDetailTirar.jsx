import { StyleSheet, Text, View, ImageBackground, Pressable, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../Global/Colors";
import { Entypo } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../Features/Counter/counterSlice";
import { TextInput } from "react-native-gesture-handler";
import { addCartItem } from "../Features/Cart/cartSlice";
import Toast, { BaseToast } from 'react-native-toast-message';

const ItemDetail = () => {
  const { width } = useWindowDimensions();
  const [inputToAdd, setInputToAdd] = useState(0);

  const dispatch = useDispatch();
  const count = useSelector( (state) => state.counterReducer.value);

  const productIdSelected = useSelector((state) => state.shopReducer.value.productIdSelected);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(productIdSelected);
    setInputToAdd(count);
  }, [productIdSelected, count]);

  const onAddCart = () => {
    dispatch(addCartItem({
      ...product,
      quantity: inputToAdd
    }))
  }

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: colors.secondary }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
        text2Style={{
          fontSize: 13
        }}
      />
    )
  }

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: product.title,
      text2: 'Ha sido agregado al carrito'
    });
  }

  return (
    <>
      {product ? (
        <View style={styles.productContainer}>
          <View style={styles.imageContainer}>
            <ImageBackground
              resizeMode="cover"
              style={styles.image}
              source={{ uri: product.images }}
            />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.countContainer}>
              <Text style={width > 350 ? styles.productPrice : styles.productPriceSM}>
                ${product.price}
              </Text>
              <View style={styles.masMenosIcon}>
                <Pressable onPress={() => dispatch(decrement())}>
                  <Entypo name="minus" size={12} color="grey" />
                </Pressable>
                <TextInput 
                  style={styles.masMenosIconText}
                  keyboardType={'numeric'}
                  onChangeText={setInputToAdd}
                  value={String(inputToAdd)}
                />
                <Pressable onPress={() => dispatch(increment())}>
                  <Entypo name="plus" size={12} color="grey" />
                </Pressable>
              </View>
            </View>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productTitleDescription}>Descripción:</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
          <View style={styles.buttonCartContainer}>
            <Pressable
              style={width > 350 ? styles.buttonCart : styles.buttonCartSM}
              onPress={() => {onAddCart(); showToast()}} 
            >
              <Text style={styles.buttonCartText}>+ Add to Cart</Text>
            </Pressable>
          </View>
          <Toast config={toastConfig} />
        </View>
      ) : null}
    </>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  productContainer: {
    height: "100%",
    width: "100%",
    alignItems: "flex-end",
  },
  backIcon: {
    paddingHorizontal: 40,
  },
  imageContainer: {
    height: 300,
    width: "80%",
    alignSelf: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 30,
    overflow: "hidden",
  },
  infoContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  productPrice: {
    color: colors.orange,
    fontFamily: "SofiaExtraBold",
    fontSize: 32,
  },
  productPriceSM: {
    color: colors.orange,
    fontFamily: "SofiaExtraBold",
    fontSize: 28,
  },
  productTitle: {
    fontFamily: "SofiaBold",
    color: colors.secondary,
    fontSize: 24,
    marginBottom: 20,
  },
  productTitleDescription: {
    fontFamily: "SofiaBold",
    color: colors.secondary,
    fontSize: 18,
    marginBottom: 5,
  },
  productDescription: {
    fontFamily: "Sofia",
    fontSize: 18,
    letterSpacing: 0.5,
    color: "grey",
  },
  buttonCartContainer: {
    alignSelf: "center",
  },
  buttonCart: {
    marginTop: 30,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 60,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
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
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 9,
    elevation: 7,
  },
  buttonCartText: {
    fontFamily: "SofiaBold",
    letterSpacing: 1,
    fontSize: 20,
    color: colors.white,
  },
  masMenosIcon: {
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 5,
    marginLeft: 150
  },
  masMenosIconText: {
    width: 20,
    fontSize: 15,
    fontFamily: 'SofiaBold',
    color: 'grey',
    textAlign: 'center',
  },
});