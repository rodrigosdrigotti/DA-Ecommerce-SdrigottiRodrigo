import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AddButton from "../Components/AddButton";

const {width} = Dimensions.get('window');
const SCREEN_WIDTH = width;

const NotificationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../Assets/img/State404.png")}/>
      <Text style={styles.title}>Under Maintenance</Text>
      <Text style={styles.text}>This service is not available yet. Plase try later again</Text>
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
    width: SCREEN_WIDTH * .7,
    height: 300,
    resizeMode: "cover",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontFamily: "SofiaExtraBold",
    letterSpacing: 1,
  },
  text: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: "grey",
    letterSpacing: 0.5,
    marginBottom: 30,
    width: 230,
    textAlign: 'center',
  },
});
