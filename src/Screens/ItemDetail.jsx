import { StyleSheet, Text, View, TextInput, Image, Pressable, Dimensions, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Toast, { BaseToast } from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from '@expo/vector-icons'; 

import { colors } from "../Global/Colors";
import { addCartItem } from "../Features/Cart/cartSlice";
import { increment, decrement } from "../Features/Counter/counterSlice";

const {width} = Dimensions.get('window');
const ITEM_HEIGHT = 300; 
const BORDER_RADIUS = 30;
const SCREEN_WIDTH = width;

const ItemDetail = () => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */
  
  const [inputToAdd, setInputToAdd] = useState(0);

  const dispatch = useDispatch();
  const count = useSelector( (state) => state.counterReducer.value);

  const productIdSelected = useSelector((state) => state.shopReducer.value.productIdSelected);

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setProduct(productIdSelected);
    setInputToAdd(count);
  }, [productIdSelected, count]);

  const onAddCart = () => {
    //Check if the product is in stock
    if(count <= productIdSelected.stock) {
      dispatch(addCartItem({
        ...product,
        quantity: inputToAdd
      }));
      //Toast Pop-up Notification
      const showToast = () => {
        Toast.show({
          type: 'success',
          text1: product.title,
          text2: 'Ha sido agregado al carrito'
        });
      }
      showToast();
    } 
    else {
      //Toast Pop-up Notification
      const showToast = () => {
        Toast.show({
          type: 'error',
          text1: product.title,
          text2: 'No hay stock disponible'
        });
      }
      showToast();
    }
  }

  //Toast Pop-up Notification
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: colors.secondary, width: SCREEN_WIDTH * .9 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
        text2Style={{
          fontSize: 13
        }}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: colors.orange, width: SCREEN_WIDTH * .9 }}
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

  return (
    <ScrollView>
      { product ? (
        <View style={styles.productContainer}>
            <FlatList 
              data={product.images}
              keyExtractor={(_, index) => index.toString()}
              onScroll={ e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentIndex((x / width).toFixed(0));
              }}
              renderItem={({item, index}) => (
                <View style={styles.imageContent}>
                  <Image style={styles.image} source={{uri: item}}/>
                </View>
              )}
              horizontal
              pagingEnabled
              style={{width: SCREEN_WIDTH, height: ITEM_HEIGHT}}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.pagination}>
                {product.images.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width : currentIndex == index ? 10 : 8,
                        height: currentIndex == index ? 10 : 8,
                        borderRadius: currentIndex == index ? 5 : 4,
                        backgroundColor: currentIndex == index ? colors.orange : 'gray',
                        marginLeft: 5
                      }}
                    ></View>
                  )
                })}
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.countContainer}>
                <Text style={width > 350 ? styles.productPrice : styles.productPriceSM}>
                  ${product.price}
                </Text>
                <View style={themeMode === 'light' ? styles.masMenosIconLight : styles.masMenosIconDark}>
                  <Pressable onPress={() => dispatch(decrement())}>
                    <Entypo name="minus" size={12} color="grey" />
                  </Pressable>
                  <TextInput 
                    style={themeMode === 'light' ? styles.masMenosIconTextLight : styles.masMenosIconTextDark}
                    keyboardType={'numeric'}
                    onChangeText={setInputToAdd}
                    value={String(inputToAdd)}
                  />
                  <Pressable onPress={() => dispatch(increment())}>
                    <Entypo name="plus" size={12} color="grey" />
                  </Pressable>
                </View>
              </View>
              <Text style={themeMode === 'light' ? styles.productTitleLight : styles.productTitleDark}>{product.title}</Text>
              <Text style={themeMode === 'light' ? styles.productTitleDescriptionLight : styles.productTitleDescriptionDark}>Descripción:</Text>
              <Text style={themeMode === 'light' ? styles.productDescriptionLight : styles.productDescriptionDark}>{product.description}</Text>
            </View>
            <View style={styles.buttonCartContainer}>
              <Pressable
                style={(width > 350 ? styles.buttonCartLight : styles.buttonCartSMLight)
                      && (themeMode === 'light' ? styles.buttonCartLight : styles.buttonCartDark)
                      || (themeMode === 'light' ? styles.buttonCartSMLight : styles.buttonCartSMDark)
                      }
                onPress={() => {onAddCart()}} 
              >
              <Text style={styles.buttonCartText}>+ Add to Cart</Text>
              </Pressable>
            </View>
            <Toast config={toastConfig} />
        </View>
      ) : null }
    </ScrollView>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  productContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  imageContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  image: {
    width: SCREEN_WIDTH * .85,
    height: ITEM_HEIGHT * .95,
    borderRadius: BORDER_RADIUS,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  infoContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 40,
    paddingTop: 5,
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
  productTitleLight: {
    fontFamily: "SofiaBold",
    color: colors.secondary,
    fontSize: 24,
    marginBottom: 20,
  },
  productTitleDark: {
    fontFamily: "SofiaBold",
    color: colors.white,
    fontSize: 24,
    marginBottom: 20,
  },
  productTitleDescriptionLight: {
    fontFamily: "SofiaBold",
    color: colors.secondary,
    fontSize: 18,
    marginBottom: 5,
  },
  productTitleDescriptionDark: {
    fontFamily: "SofiaBold",
    color: colors.white,
    fontSize: 18,
    marginBottom: 5,
  },
  productDescriptionLight: {
    fontFamily: "Sofia",
    fontSize: 18,
    letterSpacing: 0.5,
    color: "grey",
  },
  productDescriptionDark: {
    fontFamily: "Sofia",
    fontSize: 18,
    letterSpacing: 0.5,
    color: colors.white,
  },
  buttonCartContainer: {
    alignSelf: "center",
  },
  buttonCartLight: {
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
  buttonCartDark: {
    marginTop: 30,
    backgroundColor: colors.orange,
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
  buttonCartSMLight: {
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
  buttonCartSMDark: {
    marginTop: 30,
    backgroundColor: colors.orange,
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
  masMenosIconLight: {
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
  masMenosIconDark: {
    flexDirection: 'row',
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 5,
    marginLeft: 150
  },
  masMenosIconTextLight: {
    width: 20,
    fontSize: 15,
    fontFamily: 'SofiaBold',
    color: 'grey',
    textAlign: 'center',
  },
  masMenosIconTextDark: {
    width: 20,
    fontSize: 15,
    fontFamily: 'SofiaBold',
    color: colors.white,
    textAlign: 'center',
  },
});
