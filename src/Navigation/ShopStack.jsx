import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";

import Header from '../Components/Header';
import Home from '../Screens/Home';
import ItemDetail from '../Screens/ItemDetail';
import ItemListCategory from '../Screens/ItemListCategory';
import { colors } from '../Global/Colors';

const Stack = createNativeStackNavigator();

const ShopStack = () => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */
  
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
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark } }}
      />
      <Stack.Screen
        name="ItemListCategory"
        component={ItemListCategory}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark } }}
      />
      <Stack.Screen
        name="Detail"
        component={ItemDetail}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark } }}
      />
    </Stack.Navigator>
  );
};

export default ShopStack;

