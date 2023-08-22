import { StyleSheet, View, Dimensions, Text, Image } from "react-native";
import React from "react";
import OrderItem from "../Components/OrderItem";
import { useSelector } from "react-redux";
import AddButton from "../Components/AddButton";

const {width} = Dimensions.get('window');
const SCREEN_WIDTH = width;

const Order = ({navigation}) => {

  const { items: allCart, total, updatedAt, isCheckout }= useSelector(state => state.cartReducer.value);

  return (
    <>
    { isCheckout ? (
      <View style={styles.container}>
        <OrderItem order={allCart} total={total} updatedAt={updatedAt} />
      </View>
    ) : 
    <View style={styles.container}>
      <Image style={styles.image} source={require("../Assets/img/EmptyOrder.png")}/>
      <Text style={styles.title}>No Orders Yet</Text> 
      <Text style={styles.text}>Looks like you haven´t made your order yet.</Text>
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
  title: {
    fontSize: 36,
    fontFamily: 'SofiaExtraBold',
    letterSpacing: 1
  },
  text: {
    fontSize: 20,
    fontFamily: 'SofiaBold',
    color: 'grey',
    letterSpacing: 0.5,
    marginBottom: 30,
  },
});
