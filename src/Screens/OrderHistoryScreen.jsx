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

const OrderHistoryScreen = ({navigation}) => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */

  const dispatch = useDispatch();
  const { data: allOrders } = useGetOrdersQuery();

  const { localId } = useSelector((state) => state.userReducer.value);
  const { data: ordersSelected, isLoading, isError } = useGetOrdersByUserQuery(localId);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(ordersSelected);
    dispatch(setAllOrders(allOrders));
  }, [allOrders, ordersSelected, isLoading] );


  return (
    <View style={styles.container}>
      { !isLoading ? 
        orders && orders.length !== 0 ?
        <FlatList
          style={{width: SCREEN_WIDTH}}
          data={orders}
          keyExtractor={(order) => order.orderId}
          renderItem={({ item }) => {
            return ( <OrderHistoryItem  item={item} /> )
          }}
          showsVerticalScrollIndicator={false}
        />
       :
      <View style={styles.container}>
        <Image style={styles.image} source={themeMode === 'light' ? require("../Assets/img/EmptyNotification.png") : require("../Assets/img/EmptyNotificationDark.png") }/>
        <Text style={themeMode === 'light' ? styles.titleLight : styles.titleDark}>No Notifications</Text>
        <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>You haven´t received any notifications yet.</Text>
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
  image: {
    marginTop: 80,
    width: SCREEN_WIDTH * .8,
    height: 250,
    resizeMode: "cover",
    marginBottom: 40,
  },
  titleLight: {
    fontSize: 36,
    fontFamily: "SofiaExtraBold",
    letterSpacing: 1,
  },
  titleDark: {
    fontSize: 36,
    fontFamily: "SofiaExtraBold",
    letterSpacing: 1,
    color: colors.white,
  },
  textLight: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: "grey",
    letterSpacing: 0.5,
    marginBottom: 30,
  },
  textDark: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: colors.white,
    letterSpacing: 0.5,
    marginBottom: 30,
  },
})