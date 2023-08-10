import { StyleSheet, View, FlatList, useWindowDimensions, Text } from "react-native";
import React from "react";
import OrderItem from "../Components/OrderItem";
import OrderData from "../Data/orders.json";
/* import { useGetOrdersQuery } from "../Services/shopServices";
import { useSelector } from "react-redux"; */

const Order = () => {

  /* const { localId } = useSelector(state => state.userReducer.value);
  const { data: userSelected, isLoading, isError } = useGetOrdersQuery(localId); */
    
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={userSelected}
        renderItem={({ item, index }) => {
          if(userSelected.length){
            const isEnd = index === userSelected.length - 1;

            return (
              <View>
                <Text>
                  {isEnd ? item.total : null}
                </Text>
              </View>
            );
          }
        }}
        keyExtractor={(item) => item.orderId}
      /> */}
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
