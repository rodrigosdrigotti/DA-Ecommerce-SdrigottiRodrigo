import React, { useEffect, useRef } from "react";
import { StyleSheet, StatusBar, Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../Global/Colors";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import OrderStack from "./OrderStack";
import AuthStack from "./AuthStack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const TabsArray = [
    { route: 'Shop', label: 'Shop', activeIcon: 'grid', inactiveIcon: 'grid-outline', size: 24, component: ShopStack },
    { route: 'Cart', label: 'Cart', activeIcon: 'cart', inactiveIcon: 'cart-outline', size: 30, component: CartStack },
    { route: 'Order', label: 'Order', activeIcon: 'ios-list-circle', inactiveIcon: 'ios-list-circle-outline', size: 30, component: OrderStack }
]

const Tab = createBottomTabNavigator();

const TabButton = ( props ) => {

    const {item , onPress, accessibilityState} = props
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
      if(focused) {
        viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1:{scale: 1.5, rotate: '360deg'}})
      }
      else {
        viewRef.current.animate({0: {scale: 1.5, rotate: '360deg'}, 1:{scale: 1, rotate: '0deg'}})
      }
    }, [focused])
    
    return (
        <View style={styles.demo}>
            <TouchableOpacity 
                onPress={onPress}
                activeOpacity={1}
            >
                <Animatable.View
                    ref={viewRef}
                    duration={1000}
                >
                    <Ionicons name={focused ? item.activeIcon : item.inactiveIcon} size={item.size} color={focused ? colors.white : 'grey'} />
                </Animatable.View>
            </TouchableOpacity>
        </View>
    )
}

const Navigator = () => {

    const { email } = useSelector(state => state.userReducer.value)

    return (
        <SafeAreaProvider style={styles.container}>
            <NavigationContainer>
            {
                email ?
                <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabNavigator
                }}
                >
                {TabsArray.map((item, index) => {   
                    return(
                        <Tab.Screen 
                        key={index}
                        name={item.route} 
                        component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarLabel: item.label,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                        />
                        )
                    })}
                </Tab.Navigator>
                : <AuthStack />
            } 
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Navigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  tabNavigator: {
    height: 90,
    width: '100%',
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
},
demo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
}
});
