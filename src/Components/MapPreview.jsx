import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { colors } from "../Global/Colors";
import { google_maps_api_key } from "../Database/firebaseConfig";

const MapPreview = ({ location }) => {
  //Dark Mode Theme
  const theme = useSelector((state) => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme]);
  /*  */

  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${google_maps_api_key}`;

  return (
    <View
      style={
        themeMode === "light" ? styles.mapPreviewLight : styles.mapPreviewDark
      }
    >
      <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreviewLight: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.secondary,
    marginTop: 20,
  },
  mapPreviewDark: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.orange,
    marginTop: 20,
  },
  mapImage: {
    width: 300,
    height: 300,
  },
});
