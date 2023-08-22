import { StyleSheet, FlatList, View, Text, Pressable, useWindowDimensions, Image } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";
import CartItem from "../Components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { usePostCartMutation } from "../Services/shopServices";
import { clearCart, setIsCheckout } from "../Features/Cart/cartSlice";
import AddButton from "../Components/AddButton";

const Cart = ({ navigation }) => {

  const { width } = useWindowDimensions();
  const { items: allCart, total, updatedAt, user, orderId }= useSelector(state => state.cartReducer.value);
  const { localId } = useSelector(state => state.userReducer.value)
  const [ triggerPostCart, result ] = usePostCartMutation();
  const dispatch = useDispatch();

  const onConfirm = () => {
    triggerPostCart({allCart, total, user: localId, updatedAt, orderId});
    dispatch(setIsCheckout(true));
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
      <Pressable style={styles.buttonCancel} onPress={() => onClearCart()}>
        <Text style={styles.buttonCartText}>Clear</Text>
      </Pressable>
      <View style={styles.totalContainer}>
        <View style={styles.bloqueTexto}>
          <Text style={styles.texto}>Selected Items</Text>
          <Text style={styles.price}>${total}</Text>
        </View>
        <View style={styles.bloqueTexto}>
          <Text style={styles.texto}>Shipping Fee</Text>
          <Text style={styles.price}>$0</Text>
        </View>
        <View style={styles.line}/>
        <View style={styles.bloqueTexto}>
          <Text style={styles.textoSubtotal}>Subtotal</Text>
          <Text style={styles.priceSubtotal}>$0</Text>
        </View>
        <View style={styles.buttonCartContainer}>
          <Pressable style={width > 350 ? styles.buttonCart : styles.buttonCartSM} onPress={(onConfirm)}>
            <Text style={styles.buttonCartText}>Checkout</Text>
          </Pressable>
        </View>
      </View>
    </View>
    ) : 
    <View style={styles.container}>
      <Image style={styles.image} source={require("../Assets/img/EmptyCart.png")}/>
      <Text style={styles.title}>Your Cart Is Empty</Text> 
      <Text style={styles.text}>Looks like you haven´t added anything to your cart yet.</Text>
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
    width: 250,
    textAlign: 'center'
  },
  totalContainer: {
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
  buttonCancel: {
    marginBottom: 15,
    backgroundColor: colors.secondary,
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