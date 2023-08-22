import React from "react";
import Header from '../Components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyProfile from "../Screens/MyProfile";
import ImageSelector from "../Screens/ImageSelector";
import ListAddress from "../Screens/ListAddress";
import LocationSelector from "../Screens/LocationSelector";
import { colors } from '../Global/Colors';
import CardScreen from "../Screens/CardScreen";
import OrderHistoryScreen from "../Screens/OrderHistoryScreen";
import NotificationScreen from "../Screens/NotificationScreen";
import WishlistScreen from "../Screens/WishlistScreen";

const Stack = createNativeStackNavigator();

const MyProfileStack = () => {
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
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen
        name="Image Selector"
        component={ImageSelector}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen 
        name="List Address" 
        component={ListAddress}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen 
        name="Location Selector" 
        component={LocationSelector} 
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen 
        name="Cards" 
        component={CardScreen}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen 
        name="Order History" 
        component={OrderHistoryScreen}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationScreen}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen 
        name="Wishlist" 
        component={WishlistScreen}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
    </Stack.Navigator>
  );
};

export default MyProfileStack;