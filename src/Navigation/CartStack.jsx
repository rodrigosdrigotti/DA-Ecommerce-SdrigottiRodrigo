import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";

import Header from '../Components/Header';
import Cart from '../Screens/Cart';
import { colors } from '../Global/Colors';

const Stack = createNativeStackNavigator();

const CartStack = () => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */

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
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark } }}
      />
    </Stack.Navigator>
  );
};

export default CartStack;

