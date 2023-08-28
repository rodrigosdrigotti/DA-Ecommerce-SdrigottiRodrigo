import { StyleSheet, View, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { colors } from "../Global/Colors";

const Card = ({ children, additionalStyle = [] }) => {
  //Dark Mode Theme
  const theme = useSelector((state) => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme]);
  /*  */

  const { width } = useWindowDimensions();

  return (
    <View style={styles.cardContainer}>
      <View
        style={
          (width > 350
            ? [styles.cardLight, additionalStyle]
            : [styles.cardSM, additionalStyle]) &&
          (themeMode === "light"
            ? [styles.cardLight, additionalStyle]
            : [styles.cardDark, additionalStyle])
        }
      >
        {children}
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    margin: 10,
  },
  cardLight: {
    height: 200,
    width: 150,
    padding: 10,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  cardDark: {
    height: 200,
    width: 150,
    padding: 10,
    backgroundColor: colors.grey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  cardSM: {
    height: 200,
    width: 125,
    padding: 10,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
