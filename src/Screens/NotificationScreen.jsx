import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AddButton from "../Components/AddButton";
import { useSelector } from "react-redux";
import { colors } from "../Global/Colors";

const {width} = Dimensions.get('window');
const SCREEN_WIDTH = width;

const NotificationScreen = ({navigation}) => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={themeMode === 'light' ? require("../Assets/img/EmptyNotification.png") : require("../Assets/img/EmptyNotificationDark.png") }/>
      <Text style={themeMode === 'light' ? styles.titleLight : styles.titleDark}>No Notifications</Text>
      <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>You haven´t received any notifications yet.</Text>
      <AddButton title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: 80,
    width: SCREEN_WIDTH * .8,
    height: 250,
    resizeMode: "cover",
    marginBottom: 40,
  },
  titleLight: {
    fontSize: 36,
    fontFamily: "SofiaExtraBold",
    letterSpacing: 1,
  },
  titleDark: {
    fontSize: 36,
    fontFamily: "SofiaExtraBold",
    letterSpacing: 1,
    color: colors.white,
  },
  textLight: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: "grey",
    letterSpacing: 0.5,
    marginBottom: 30,
  },
  textDark: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: colors.white,
    letterSpacing: 0.5,
    marginBottom: 30,
  },
});
