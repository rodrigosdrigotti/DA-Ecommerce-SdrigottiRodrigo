import React from "react";
import Header from '../Components/Header';
import MyProfile from "../Screens/MyProfile";
import ImageSelector from "../Screens/ImageSelector";
import { colors } from '../Global/Colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
        name="Profile"
        component={MyProfile}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
      <Stack.Screen
        name="Image Selector"
        component={ImageSelector}
        options={{ contentStyle: { backgroundColor: colors.primary } }}
      />
    </Stack.Navigator>
  );
};

export default MyProfileStack;