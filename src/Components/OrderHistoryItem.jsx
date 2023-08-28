import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { colors } from "../Global/Colors";

const OrderHistoryItem = ({ item }) => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={themeMode === 'light' ? styles.textCategoryLight : styles.textCategoryDark}>Order: {item.orderId}</Text>
                <Text style={themeMode === 'light' ? styles.textCategoryLight : styles.textCategoryDark}>Fecha: {(item.updatedAt).split(',')[0]}</Text>
            </View>
            {item.allCart.map((ord) => {
                return (
                    <View key={ord.id} style={styles.infoContainer}>
                        <Text style={themeMode === 'light' ? styles.textPriceLight : styles.textPriceDark}>{ord.title}</Text>
                        <Text style={themeMode === 'light' ? styles.textPriceLight : styles.textPriceDark}>Cant. {ord.quantity}</Text>
                        <Text style={themeMode === 'light' ? styles.textPriceLight : styles.textPriceDark}>Price: {ord.price}</Text>
                    </View>
                )
            })}
            <View style={themeMode === 'light' ? styles.boxTotalLight : styles.boxTotalDark}> 
                <Text style={styles.textTotal}>Total Purchase: {item.total}</Text>
            </View>
        </View>
    );
};

export default OrderHistoryItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    width: 400,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
  },
  textCategoryLight: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: colors.secondary,
    marginTop: 30,
  },
  textCategoryDark: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: colors.white,
    marginTop: 30,
  },
  textPriceLight: {
    fontSize: 22,
    fontFamily: "Sofia",
    color: colors.orange,
  },
  textPriceDark: {
    fontSize: 22,
    fontFamily: "Sofia",
    color: colors.grey,
  },
  boxTotalLight: {
    marginTop: 15,
    padding: 10,
    width: 200,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    alignItems: 'center'
  },
  boxTotalDark: {
    marginTop: 15,
    padding: 10,
    width: 200,
    backgroundColor: colors.orange,
    borderRadius: 15,
    alignItems: 'center'
  },
  textTotal: {
    fontSize: 22,
    fontFamily: "Sofia",
    color: colors.white,
  },
});
