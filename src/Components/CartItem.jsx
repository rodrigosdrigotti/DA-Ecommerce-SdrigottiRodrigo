import { StyleSheet, Text, View, Image, useWindowDimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feather, Ionicons } from "@expo/vector-icons";

import Card from "./Card";
import { colors } from "../Global/Colors";
import { removeCartItem } from "../Features/Cart/cartSlice";

const CartItem = ({ cartItem }) => {
  //Dark Mode Theme
  const theme = useSelector((state) => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme]);
  /*  */

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  const onRemoveProductCart = (cartItem) => {
    dispatch(removeCartItem(cartItem));
  };

  return (
    <Card
      additionalStyle={
        ((width > 350
          ? styles.additionalStylesCardLight
          : styles.additionalStylesCardSMLight) &&
          (themeMode === "light"
            ? styles.additionalStylesCardLight
            : styles.additionalStylesCardDark)) ||
        (themeMode === "light"
          ? styles.additionalStylesCardSMLight
          : styles.additionalStylesCardSMDark)
      }
    >
      <View>
        <Feather
          name="check-square"
          size={20}
          color={themeMode === "light" ? colors.orange : colors.secondary}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: cartItem.images[0] }}
        />
      </View>
      <View style={width > 350 ? styles.infoContainer : styles.infoContainerSM}>
        <Text style={themeMode === "light" ? styles.textCategoryLight : styles.textCategoryDark} >
          {cartItem.title}
        </Text>
        <View style={styles.iconContainer}>
          <Text style={themeMode === "light" ? styles.textPriceLight : styles.textPriceDark} >
            ${cartItem.price}
          </Text>
          <Text style={themeMode === "light" ? styles.textPriceLight : styles.textPriceDark} >
            Cant: {cartItem.quantity}
          </Text>
          <Pressable onPress={() => onRemoveProductCart(cartItem.id)}>
            <Ionicons
              style={styles.masMenosIcon}
              name="trash"
              size={22}
              color={themeMode === "light" ? colors.secondary : colors.secondary}
            />
          </Pressable>
        </View>
      </View>
    </Card>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  image: {
    height: 85,
    width: 85,
    marginHorizontal: 15,
    resizeMode: "cover",
    borderRadius: 15,
    overflow: "hidden",
  },
  imageContainer: {
    alignSelf: "center",
    borderRadius: 15,
  },
  additionalStylesCardLight: {
    flexDirection: "row",
    height: 120,
    width: 350,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "none",
    shadowColor: "transparent",
  },
  additionalStylesCardDark: {
    flexDirection: "row",
    height: 120,
    width: 350,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "none",
    shadowColor: "transparent",
    backgroundColor: colors.grey,
  },
  additionalStylesCardSMLight: {
    flexDirection: "row",
    height: 120,
    width: 275,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "none",
    shadowColor: "transparent",
  },
  additionalStylesCardSMDark: {
    flexDirection: "row",
    height: 120,
    width: 275,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "none",
    shadowColor: "transparent",
    backgroundColor: colors.grey,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: 180,
    paddingHorizontal: 10,
  },
  infoContainerSM: {
    flexDirection: "column",
    textAlign: "left",
    alignSelf: "center",
    width: "35%",
  },
  textCategoryLight: {
    width: "100%",
    fontSize: 20,
    alignSelf: "flex-start",
    fontFamily: "SofiaBold",
    color: colors.secondary,
  },
  textCategoryDark: {
    width: "100%",
    fontSize: 20,
    alignSelf: "flex-start",
    fontFamily: "SofiaBold",
    color: colors.secondary,
  },
  textPriceLight: {
    width: 100,
    fontSize: 22,
    fontFamily: "Sofia",
    marginTop: 10,
    color: colors.orange,
  },
  textPriceDark: {
    width: 100,
    fontSize: 22,
    fontFamily: "Sofia",
    marginTop: 10,
    color: colors.orange,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  masMenosIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
