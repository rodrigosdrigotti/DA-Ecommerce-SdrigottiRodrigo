import React from "react";
import Header from '../Components/Header';
import Order from '../Screens/Order';
import { colors } from '../Global/Colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const OrderStack = () => {
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
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
