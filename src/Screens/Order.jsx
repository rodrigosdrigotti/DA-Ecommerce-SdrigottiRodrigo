import { StyleSheet, View, FlatList, useWindowDimensions } from "react-native";
import React from "react";
import OrderItem from "../Components/OrderItem";
import OrderData from "../Data/orders.json";

const Order = () => {

  return (
    <View style={styles.container}>
      <FlatList
        data={OrderData}
        keyExtractor={(orderItem) => orderItem.id}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },
});
