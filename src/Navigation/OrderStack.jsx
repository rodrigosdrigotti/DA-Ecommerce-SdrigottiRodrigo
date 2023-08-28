import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";

import Header from '../Components/Header';
import Order from '../Screens/Order';
import { colors } from '../Global/Colors';

const Stack = createNativeStackNavigator();

const OrderStack = () => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */

  return (
    <Stack.Navigator
      initialRouteName="Order"
      screenOptions={({ route, navigation }) => ({
        header: () => {
          return <Header route={route} navigation={navigation} />;
        },
      })}
    >
      <Stack.Screen
        name="Checkout"
        component={Order}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark } }}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
