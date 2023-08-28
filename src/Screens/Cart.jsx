import { StyleSheet, FlatList, View, Text, Pressable, useWindowDimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../Global/Colors";
import CartItem from "../Components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { usePostCartMutation } from "../Services/shopServices";
import { clearCart } from "../Features/Cart/cartSlice";
import AddButton from "../Components/AddButton";
import { addOrderItem } from "../Features/Order/orderSlice";

const Cart = ({ navigation }) => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */

  const { width } = useWindowDimensions();
  const { items: allCart, total, updatedAt, user, orderId }= useSelector(state => state.cartReducer.value);
  const { localId } = useSelector(state => state.userReducer.value)
  const [ triggerPostCart, result ] = usePostCartMutation();
  const dispatch = useDispatch();

  const onConfirm = () => {
    triggerPostCart({allCart, total, user: localId, updatedAt, orderId});
    dispatch(addOrderItem({allCart, total, updatedAt, isCheckout: true}));
    dispatch(clearCart());
    navigation.navigate('Order');
  }
  
  const onClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <>
    { allCart.length !== 0 ? (
    <View style={styles.container}>
      <FlatList
        data={allCart}
        keyExtractor={(cartItem) => cartItem.id}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
        showsVerticalScrollIndicator={false}
      />
      <Pressable style={themeMode === 'light' ? styles.buttonCancelLight : styles.buttonCancelDark} onPress={() => onClearCart()}>
        <Text style={styles.buttonCartText}>Clear</Text>
      </Pressable>
      <View style={themeMode === 'light' ? styles.totalContainerLight : styles.totalContainerDark}>
        <View style={styles.bloqueTexto}>
          <Text style={themeMode === 'light' ? styles.textoLight : styles.textoDark}>Selected Items</Text>
          <Text style={styles.price}>${total}</Text>
        </View>
        <View style={styles.bloqueTexto}>
          <Text style={themeMode === 'light' ? styles.textoLight : styles.textoDark}>Shipping Fee</Text>
          <Text style={styles.price}>$0</Text>
        </View>
        <View style={styles.line}/>
        <View style={styles.bloqueTexto}>
          <Text style={themeMode === 'light' ? styles.textoSubtotalLight : styles.textoSubtotalDark}>Subtotal</Text>
          <Text style={styles.priceSubtotal}>${total}</Text>
        </View>
        <View style={styles.buttonCartContainer}>
          <Pressable style={(width > 350 ? styles.buttonCartLight : styles.buttonCartSMLight)
                            && (themeMode === 'light' ? styles.buttonCartLight : styles.buttonCartDark)
                            || (themeMode === 'light' ? styles.buttonCartSMLight : styles.buttonCartSMDark)
                            } onPress={(onConfirm)}>
            <Text style={styles.buttonCartText}>Checkout</Text>
          </Pressable>
        </View>
      </View>
    </View>
    ) : 
    <View style={styles.container}>
      <Image style={styles.image} source={require("../Assets/img/EmptyCart.png")}/>
      <Text style={themeMode === 'light' ? styles.titleLight : styles.titleDark}>Your Cart Is Empty</Text> 
      <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>Looks like you haven´t added anything to your cart yet.</Text>
      <AddButton
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View> 
    }
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
  image: {
    marginTop: 80,
    width: 400,
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
    width: 250,
    textAlign: 'center',
    color: colors.secondary,
  },
  textDark: {
    fontSize: 20,
    fontFamily: 'SofiaBold',
    color: 'grey',
    letterSpacing: 0.5,
    marginBottom: 30,
    width: 250,
    textAlign: 'center',
    color: colors.white,
  },
  totalContainerLight: {
    backgroundColor: colors.primary,
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
  totalContainerDark: {
    backgroundColor: colors.dark,
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
  textoLight: {
    fontSize: 22,
    fontFamily: 'SofiaBold',
    color: colors.secondary,
  },
  textoDark: {
    fontSize: 22,
    fontFamily: 'SofiaBold',
    color: colors.white,
  },
  textoSubtotalLight: {
    fontSize: 26,
    fontFamily: 'SofiaExtraBold',
    color: colors.secondary,
  },
  textoSubtotalDark: {
    fontSize: 26,
    fontFamily: 'SofiaExtraBold',
    color: colors.white,
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
  buttonCartLight: {
    marginTop: 10,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCartDark: {
    marginTop: 10,
    backgroundColor: colors.orange,
    borderRadius: 40,
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCartSMLight: {
    marginTop: 30,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 50,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCartSMDark: {
    marginTop: 30,
    backgroundColor: colors.orange,
    borderRadius: 40,
    padding: 10,
    height: 50,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancelLight: {
    marginBottom: 15,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 40,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancelDark: {
    marginBottom: 15,
    backgroundColor: colors.orange,
    borderRadius: 40,
    padding: 10,
    height: 40,
    width: 150,
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