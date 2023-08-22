import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";

const OrderHistoryItem = ({ item }) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textCategory}>Order: {item.orderId}</Text>
                <Text style={styles.textCategory}>Fecha: {(item.updatedAt).split(',')[0]}</Text>
            </View>
            {item.allCart.map((ord, i) => (
                <>
                <View style={styles.infoContainer}>
                    <Text style={styles.textPrice}>{ord.title}</Text>
                    <Text style={styles.textPrice}>Cant. {ord.quantity}</Text>
                    <Text style={styles.textPrice}>Total: {item.total}</Text>
                </View>
                </>
            ))}
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
    marginTop: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
  },
  textCategory: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: colors.secondary,
  },
  textPrice: {
    fontSize: 22,
    fontFamily: "Sofia",
    color: colors.orange,
  },
});
