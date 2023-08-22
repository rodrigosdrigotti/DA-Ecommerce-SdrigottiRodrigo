import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useGetOrdersByUserQuery, useGetOrdersQuery } from '../Services/shopServices';
import { setAllOrders } from '../Features/Order/orderSlice';
import { colors } from '../Global/Colors';
import AddButton from "../Components/AddButton";
import OrderHistoryItem from '../Components/OrderHistoryItem';

const {width} = Dimensions.get('window');
const SCREEN_WIDTH = width;

const OrderHistoryScreen = () => {

  const dispatch = useDispatch();
  const { data: allOrders } = useGetOrdersQuery();

  const { localId } = useSelector((state) => state.userReducer.value);
  const { data: ordersSelected, isLoading, isError } = useGetOrdersByUserQuery(localId);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(ordersSelected);
    dispatch(setAllOrders(allOrders));
  }, [allOrders, ordersSelected]);

  return (
    <View style={styles.container}>
      { !isLoading ?  
        orders ? (   
      <FlatList
        data={orders}
        keyExtractor={(order) => order.orderId}
        renderItem={({ item }) => {
            return ( <OrderHistoryItem  item={item} /> )
          }}
        showsVerticalScrollIndicator={false}
      />
      ) :
        <View style={styles.container}>
          <Image style={styles.image} source={require("../Assets/img/EmptyNotification.png")}/>
          <Text style={styles.title}>No Notifications</Text>
          <Text style={styles.text}>You haven´t received any notifications yet.</Text>
          <AddButton title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      : 
        <ActivityIndicator animating={true} style={styles.loader} size="large" color={colors.secondary} />
      }
    </View>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})