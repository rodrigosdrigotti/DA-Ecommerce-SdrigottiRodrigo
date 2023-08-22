import React from "react";
import Header from '../Components/Header';
import Cart from '../Screens/Cart';
import { colors } from '../Global/Colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Order from "../Screens/Order";

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={({ route, navigation }) => ({
        header: () => {
          return <Header route={route} navigation={navigation} />;
        },
      })}
    >
      <Stack.Screen
        name="Carrito"
        component={Cart}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
    </Stack.Navigator>
  );
};

export default CartStack;

