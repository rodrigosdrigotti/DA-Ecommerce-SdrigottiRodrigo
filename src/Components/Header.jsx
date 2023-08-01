import { StyleSheet, Text, View, Pressable, useWindowDimensions } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouseUser, faBarsStaggered, faArrowLeft, faCartShopping, faEllipsisVertical, faHeart, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Features/User/userSlice";

const Header = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const ruta = route.name;
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.userReducer.value);

  return (
    <View>
      { email ? (
      <View>
      {
        ruta === "Signup" || ruta === "Login" ? (
        <View style={styles.containerSignup} />
        ) : ruta === "SB Entrenamientos" ? (
        <View style={styles.containerHeader}>
          <FontAwesomeIcon
            icon={faBarsStaggered}
            size={width > 350 ? 26 : 22}
            color={colors.secondary}
          />
          <Text style={width > 350 ? styles.text : styles.textSM}>{route.name}</Text>
          <Pressable onPress={() => dispatch(logOut())}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={width > 350 ? 32 : 28}
              color={colors.secondary}
            />
          </Pressable>
        </View>
        ) : ruta === "Checkout" ? (
        <View style={styles.containerHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={width > 350 ? 26 : 22}
              color={colors.secondary}
            />
          </Pressable>
          <Text style={width > 350 ? styles.text : styles.textSM}>{route.name}</Text>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            size={width > 350 ? 26 : 22}
            color={colors.secondary}
          />
        </View>
        ) : ruta === "Detail" ? (
        <View style={styles.containerHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={width > 350 ? 26 : 22}
              color={colors.secondary}
            />
          </Pressable>
          <Text style={width > 350 ? styles.text : styles.textSM}>{route.name}</Text>
          <FontAwesomeIcon
            icon={faHeart}
            size={width > 350 ? 26 : 22}
            color={colors.secondary}
          />
        </View>
        ) : (
          <View style={styles.containerHeader}>
            <Pressable onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size={width > 350 ? 26 : 22} color={colors.secondary}
              />
            </Pressable>
            <Text style={width > 350 ? styles.text : styles.textSM}>{route.name}</Text>
            <Pressable onPress={() => navigation.navigate("Cart")}>
              <FontAwesomeIcon
                icon={faCartShopping}
                size={width > 350 ? 26 : 22}
                color={colors.secondary}
              />
            </Pressable>
          </View>
          )
      }
      </View>
      ) : null }
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerSignup: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: colors.primary,
    paddingTop: 50,
  },
  text: {
    fontSize: 30,
    fontFamily: "SofiaBold",
    color: colors.secondary,
    textTransform: "uppercase",
  },
  textSM: {
    fontSize: 24,
    fontFamily: "SofiaBold",
    color: colors.secondary,
    textTransform: "uppercase",
  },
  imageLogo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
