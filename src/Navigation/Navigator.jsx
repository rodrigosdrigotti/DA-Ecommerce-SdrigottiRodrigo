import React, { useEffect, useState } from "react";
import { StyleSheet, StatusBar, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { getSession } from "../SQLite";
import { colors } from "../Global/Colors";
import { setUser } from "../Features/User/userSlice";
import MyProfileStack from "./MyProfileStack";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import OrderStack from "./OrderStack";
import AuthStack from "./AuthStack";
import TabButton from "../Components/TabButton";

const TabsArray = [
    { route: 'Shop', label: 'Shop', activeIcon: 'grid', inactiveIcon: 'grid-outline', size: 24, component: ShopStack },
    { route: 'Cart', label: 'Cart', activeIcon: 'cart', inactiveIcon: 'cart-outline', size: 30, component: CartStack },
    { route: 'Order', label: 'Order', activeIcon: 'ios-list-circle', inactiveIcon: 'ios-list-circle-outline', size: 30, component: OrderStack },
    { route: 'Profile', label: 'Profile', activeIcon: 'person-circle', inactiveIcon: 'person-circle-outline', size: 30, component: MyProfileStack }
]

const Tab = createBottomTabNavigator();

const Navigator = () => {
    
    //Dark Mode Theme
    const theme = useSelector(state => state.themeReducer.mode);
    const [themeMode, setThemeMode] = useState(theme);

    useEffect(() => {
        setThemeMode(theme);
    }, [theme])
    /* */

    const { email } = useSelector(state => state.userReducer.value);
    const dispatch = useDispatch();

    //Get stored sessions
    useEffect(()=> {
        (async ()=> {
            try {
                const session = await getSession()
                if (session?.rows.length) {
                    const user = session.rows._array[0]
                    dispatch(setUser(user))
                }
            } catch (error) {
                //console.log('Error getting session');
                //console.log(error.message);
            }
        })()
    }, [])


    return (
        <SafeAreaProvider style={styles.container}>
            <NavigationContainer>
            {
                email ?
                <Tab.Navigator
                    screenOptions={{
                    headerShown: false,
                    tabBarStyle: themeMode === 'light' ? styles.tabNavigatorLight : styles.tabNavigatorDark 
                }}
                >
                {   TabsArray.map((item, index) => {   
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
    tabNavigatorLight: {
        height: 90,
        width: '100%',
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabNavigatorDark: {
        height: 90,
        width: '100%',
        backgroundColor: colors.dark,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
