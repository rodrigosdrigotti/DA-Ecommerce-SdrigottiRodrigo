import { StyleSheet, Text, View, TextInput, Image, Pressable, Dimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from '@expo/vector-icons'; 
import { colors } from "../Global/Colors";
import { addCartItem } from "../Features/Cart/cartSlice";
import Toast, { BaseToast } from 'react-native-toast-message';
import { increment, decrement } from "../Features/Counter/counterSlice";

const {width} = Dimensions.get('window');

const SPACING = 5;
const ITEM_HEIGHT = 350; 
const BORDER_RADIUS = 30;

const ItemDetail = () => {
  
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
    if(count <= productIdSelected.stock){
      dispatch(addCartItem({
        ...product,
        quantity: inputToAdd
      }))
    } 
    else{
        console.log('No hay Stock')
    }
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
        </View>
      ) : null}
    </>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  productContainer: {
    alignContent: 'center',
    justifyContent: 'center'
  },
  imageContent: {
    marginHorizontal: SPACING * 5,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  image: {
    width: 380,
    height: ITEM_HEIGHT,
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
    paddingTop: 10,
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
