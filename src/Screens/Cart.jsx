import { StyleSheet, FlatList, View, Text, Pressable, useWindowDimensions } from "react-native";
import React from "react";
import allCart from "../Data/cart.json";
import { colors } from "../Global/Colors";
import CartItem from "../Components/CartItem";

const Cart = ({ navigation }) => {

  const total = allCart.reduce((acumulador, currentItem) => acumulador += currentItem.price * currentItem.quantity, 0);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <FlatList
        data={allCart}
        keyExtractor={(cartItem) => cartItem.id}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.totalContainer}>
        <View style={styles.bloqueTexto}>
          <Text style={styles.texto}>Selected Items</Text>
          <Text style={styles.price}>${total}</Text>
        </View>
        <View style={styles.bloqueTexto}>
          <Text style={styles.texto}>Shipping Fee</Text>
          <Text style={styles.price}>${total}</Text>
        </View>
        <View style={styles.line}/>
        <View style={styles.bloqueTexto}>
          <Text style={styles.textoSubtotal}>Subtotal</Text>
          <Text style={styles.priceSubtotal}>${total}</Text>
        </View>
        <View style={styles.buttonCartContainer}>
          <Pressable style={width > 350 ? styles.buttonCart : styles.buttonCartSM} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.buttonCartText}>Checkout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  totalContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 40,
    width: '100%',
    gap: 10,
    shadowColor: "#000",
    shadowOffset:{
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  bloqueTexto: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  line: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 2,
    marginTop: 10,
    marginBottom: 25,
  },
  texto: {
    fontSize: 22,
    fontFamily: 'SofiaBold',
    color: colors.secondary,
  },
  textoSubtotal: {
    fontSize: 26,
    fontFamily: 'SofiaExtraBold',
    color: colors.secondary,
  },
  price: {
    fontSize: 22,
    fontFamily: 'Sofia',
    color: colors.orange,
  },
  priceSubtotal: {
    fontSize: 26,
    fontFamily: 'SofiaExtraBold',
    color: colors.orange,
  },
  buttonCartContainer: {
    alignSelf: 'center',
    width: '100%'
  },
  buttonCart: {
    marginTop: 10,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  buttonCartText: {
    fontFamily: 'SofiaBold',
    letterSpacing: 1,
    fontSize: 20,
    color: colors.white
  }
});
