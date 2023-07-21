import React from "react";
import Header from '../Components/Header';
import Home from '../Screens/Home';
import ItemDetail from '../Screens/ItemDetail';
import ItemListCategory from '../Screens/ItemListCategory';
import { colors } from '../Global/Colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SB Entrenamientos"
      screenOptions={({ route, navigation }) => ({
        header: () => {
          return <Header route={route} navigation={navigation} />;
        },
      })}
    >
      <Stack.Screen
        name="SB Entrenamientos"
        component={Home}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen
        name="ItemListCategory"
        component={ItemListCategory}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen
        name="Detail"
        component={ItemDetail}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
    </Stack.Navigator>
  );
};

export default ShopStack;

