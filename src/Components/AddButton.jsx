import { Pressable, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { colors } from "../Global/Colors";

const AddButton = ({
  title = "",
  onPress = () => {},
  color = colors.secondary,
}) => {
    
  //Dark Mode Theme
  const theme = useSelector((state) => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme]);
  /*  */

  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: themeMode === "light" ? color : colors.orange,
      }}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    marginTop: 20,
    borderRadius: 40,
    padding: 10,
    height: 50,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "SofiaBold",
    letterSpacing: 1,
    fontSize: 22,
    color: colors.white,
  },
});
