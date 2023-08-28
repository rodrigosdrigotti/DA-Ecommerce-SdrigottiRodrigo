import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AddButton from "../Components/AddButton";
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
      <Image style={styles.image} source={themeMode === 'light' ? require("../Assets/img/State404.png") : require("../Assets/img/State404Dark.png")}/>
      <Text style={themeMode === 'light' ? styles.titleLight : styles.titleDark}>Under Maintenance</Text>
      <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>This service is not available yet. Plase try later again</Text>
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
    height: 300,
    resizeMode: "cover",
    marginBottom: 40,
  },
  titleLight: {
    fontSize: 36,
    fontFamily: "SofiaExtraBold",
    letterSpacing: 1,
  },
  textLight: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: "grey",
    letterSpacing: 0.5,
    marginBottom: 30,
    width: 230,
    textAlign: 'center',
  },
  titleDark: {
    fontSize: 36,
    fontFamily: "SofiaExtraBold",
    letterSpacing: 1,
    color: colors.white,
  },
  textDark: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: colors.white,
    letterSpacing: 0.5,
    marginBottom: 30,
    width: 230,
    textAlign: 'center',
  },
});
