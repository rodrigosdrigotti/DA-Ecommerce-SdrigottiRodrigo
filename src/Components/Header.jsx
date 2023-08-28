import { StyleSheet, Text, View, Pressable, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBarsStaggered, faArrowLeft, faCartShopping, faEllipsisVertical, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { colors } from "../Global/Colors";
import { logOut } from "../Features/User/userSlice";
import { deleteSession } from "../SQLite";

const Header = ({ route, navigation }) => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */

  const { width } = useWindowDimensions();
  const ruta = route.name;
  const dispatch = useDispatch();
  const { email, localId } = useSelector((state) => state.userReducer.value);
  const { totalQuantity} = useSelector(state => state.cartReducer.value);

  const onSignout = async () => {
    try {
        const response = await deleteSession(localId)
        dispatch(logOut())
    } catch (error) {
        console.log('Error while sign out:')
        //console.log(error.message);
    }
  }

  return (
    <View>
      { email ? (
      <View>
      {
        ruta === "Signup" || ruta === "Login" ? (
        <View style={styles.containerSignup} />
        ) : ruta === "SB Entrenamientos" ? (
        <View style={themeMode === 'light' ? styles.containerHeaderLight : styles.containerHeaderDark}>
          <FontAwesomeIcon
            icon={faBarsStaggered}
            size={width > 350 ? 26 : 22}
            color={themeMode === 'light' ? colors.secondary : colors.white}
          />
          <Text style={(width > 350 ? styles.textLight : styles.textSMLight) 
            && (themeMode === 'light' ? styles.textLight : styles.textDark) 
            || (themeMode === 'light' ? styles.textSMLight : styles.textSMDark)}>{route.name}</Text>
          <Pressable onPress={onSignout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={width > 350 ? 32 : 28}
              color={themeMode === 'light' ? colors.secondary : colors.white}
            />
          </Pressable>
        </View>
        ) : ruta === "Checkout" || ruta === "My Profile" || ruta === "Image Selector" 
        || ruta === "List Address" || ruta === "Location Selector" ? (
        <View style={themeMode === 'light' ? styles.containerHeaderLight : styles.containerHeaderDark}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={width > 350 ? 26 : 22}
              color={themeMode === 'light' ? colors.secondary : colors.white}
            />
          </Pressable>
          <Text style={(width > 350 ? styles.textLight : styles.textSMLight) 
            && (themeMode === 'light' ? styles.textLight : styles.textDark) 
            || (themeMode === 'light' ? styles.textSMLight : styles.textSMDark)}>{route.name}</Text>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            size={width > 350 ? 26 : 22}
            color={themeMode === 'light' ? colors.secondary : colors.white}
          />
        </View>
        ) : (
          <View style={themeMode === 'light' ? styles.containerHeaderLight : styles.containerHeaderDark}>
            <Pressable onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size={width > 350 ? 26 : 22} color={themeMode === 'light' ? colors.secondary : colors.white}
              />
            </Pressable>
            <Text style={(width > 350 ? styles.textLight : styles.textSMLight) 
            && (themeMode === 'light' ? styles.textLight : styles.textDark) 
            || (themeMode === 'light' ? styles.textSMLight : styles.textSMDark)}>{route.name}</Text>
            <Pressable onPress={() => navigation.navigate("Cart")}>
              <FontAwesomeIcon
                style={styles.carritoIcon}
                icon={faCartShopping}
                size={width > 350 ? 26 : 22}
                color={themeMode === 'light' ? colors.secondary : colors.white}
              />
              { totalQuantity !== null ?
                <View style={styles.containerNumeroCarrito}>
                  <Text style={styles.numeroCarrito}>{totalQuantity}</Text>
                </View>
                : null
              }
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
  containerHeaderLight: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: colors.primary,
    paddingTop: 50,
  },
  containerHeaderDark: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: colors.dark,
    paddingTop: 50,
  },
  textLight: {
    fontSize: 30,
    fontFamily: "SofiaBold",
    color: colors.secondary,
    textTransform: "uppercase",
  },
  textDark: {
    fontSize: 30,
    fontFamily: "SofiaBold",
    color: colors.white,
    textTransform: "uppercase",
  },
  textSMLight: {
    fontSize: 24,
    fontFamily: "SofiaBold",
    color: colors.secondary,
    textTransform: "uppercase",
  },
  textSMDark: {
    fontSize: 24,
    fontFamily: "SofiaBold",
    color: colors.white,
    textTransform: "uppercase",
  },
  imageLogo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  carritoIcon: {
    position: 'relative'
  },
  containerNumeroCarrito: {
    backgroundColor: colors.orange,
    borderRadius: '50%',
    width: 7.5,
    height: 7.5,
    padding: 10,
    position: 'absolute',
    right: -10,
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  numeroCarrito: {
    color: colors.white,
    fontSize: 12,
    fontFamily: 'SofiaExtraBold',
    position: 'absolute',
    zIndex: 1,
  }
});
