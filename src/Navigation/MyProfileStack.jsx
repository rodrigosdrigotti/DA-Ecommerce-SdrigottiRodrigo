import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";

import Header from '../Components/Header';
import MyProfile from "../Screens/MyProfile";
import ImageSelector from "../Screens/ImageSelector";
import ListAddress from "../Screens/ListAddress";
import LocationSelector from "../Screens/LocationSelector";
import CardScreen from "../Screens/CardScreen";
import OrderHistoryScreen from "../Screens/OrderHistoryScreen";
import NotificationScreen from "../Screens/NotificationScreen";
import WishlistScreen from "../Screens/WishlistScreen";
import { colors } from '../Global/Colors';

const Stack = createNativeStackNavigator();

const MyProfileStack = () => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={({ route, navigation }) => ({
        header: () => {
          return <Header route={route} navigation={navigation} />;
        },
      })}
    >
      <Stack.Screen
        name="My Profile"
        component={MyProfile}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark  } }}
      />
      <Stack.Screen
        name="Image Selector"
        component={ImageSelector}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark  } }}
      />
      <Stack.Screen 
        name="List Address" 
        component={ListAddress}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark  } }}
      />
      <Stack.Screen 
        name="Location Selector" 
        component={LocationSelector} 
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark  } }}
      />
      <Stack.Screen 
        name="Cards" 
        component={CardScreen}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark  } }}
      />
      <Stack.Screen 
        name="Order History" 
        component={OrderHistoryScreen}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark  } }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationScreen}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark  } }}
      />
      <Stack.Screen 
        name="Wishlist" 
        component={WishlistScreen}
        options={{ contentStyle: { backgroundColor: themeMode === 'light' ? colors.primary : colors.dark  } }}
      />
    </Stack.Navigator>
  );
};

export default MyProfileStack;