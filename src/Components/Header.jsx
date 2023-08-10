import { StyleSheet, Text, View, Pressable, useWindowDimensions } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBarsStaggered, faArrowLeft, faCartShopping, faEllipsisVertical, faHeart, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Features/User/userSlice";
import { deleteSession } from "../SQLite";

const Header = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const ruta = route.name;
  const dispatch = useDispatch();
  const { email, localId } = useSelector((state) => state.userReducer.value);
  const { totalQuantity} = useSelector(state => state.cartReducer.value);

  const onSignout = async () => {
    try {
        console.log("Deleting session...");
        const response = await deleteSession(localId)
        console.log("Session deleted: ")
        console.log(response)
        dispatch(logOut())
    } catch (error) {
        console.log('Error while sign out:')
        console.log(error.message);
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
        <View style={styles.containerHeader}>
          <FontAwesomeIcon
            icon={faBarsStaggered}
            size={width > 350 ? 26 : 22}
            color={colors.secondary}
          />
          <Text style={width > 350 ? styles.text : styles.textSM}>{route.name}</Text>
          <Pressable onPress={onSignout}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={width > 350 ? 32 : 28}
              color={colors.secondary}
            />
          </Pressable>
        </View>
        ) : ruta === "Checkout" || ruta === "My Profile" || ruta === "Image Selector" 
        || ruta === "List Address" || ruta === "Location Selector" ? (
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
        ) : (
          <View style={styles.containerHeader}>
            <Pressable onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size={width > 350 ? 26 : 22} color={colors.secondary}
              />
            </Pressable>
            <Text style={width > 350 ? styles.text : styles.textSM}>{route.name}</Text>
            <Pressable onPress={() => navigation.navigate("Cart")}>
              <FontAwesomeIcon
                style={styles.carritoIcon}
                icon={faCartShopping}
                size={width > 350 ? 26 : 22}
                color={colors.secondary}
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
  containerHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: colors.primary,
    paddingTop: 50,
  },
  containerHeaderTwo: {
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
