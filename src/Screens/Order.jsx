import { StyleSheet, View, Dimensions, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import OrderItem from "../Components/OrderItem";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../Components/AddButton";
import { colors } from "../Global/Colors";
import { clearOrder } from "../Features/Order/orderSlice";

const {width} = Dimensions.get('window');
const SCREEN_WIDTH = width;

const Order = ({navigation}) => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */

  const { items: allCart, total, updatedAt, isCheckout } = useSelector(state => state.orderReducer.value);
  
  return (
    <>
    { isCheckout ? (
      <View style={styles.container}>
        <OrderItem order={allCart} total={total} updatedAt={updatedAt} />
      </View>
    ) : 
    <View style={styles.container}>
      <Image style={styles.image} source={require("../Assets/img/EmptyOrder.png")}/>
      <Text style={themeMode === 'light' ? styles.titleLight : styles.titleDark}>No Orders Yet</Text> 
      <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>Looks like you haven´t made your order yet.</Text>
      <AddButton
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View> 
    }
    </>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent:'center',
  },
  image: {
    marginTop: 80,
    width: SCREEN_WIDTH,
    height: 250,
    resizeMode: 'cover',
    marginBottom: 40,
  },
  titleLight: {
    fontSize: 36,
    fontFamily: 'SofiaExtraBold',
    letterSpacing: 1,
    color: colors.secondary,
  },
  titleDark: {
    fontSize: 36,
    fontFamily: 'SofiaExtraBold',
    letterSpacing: 1,
    color: colors.white,
  },
  textLight: {
    fontSize: 20,
    fontFamily: 'SofiaBold',
    color: 'grey',
    letterSpacing: 0.5,
    marginBottom: 30,
    color: colors.secondary,
  },
  textDark: {
    fontSize: 20,
    fontFamily: 'SofiaBold',
    color: 'grey',
    letterSpacing: 0.5,
    marginBottom: 30,
    color: colors.white,
  },
});
