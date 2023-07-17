import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../Components/Header';
import Home from '../Screens/Home';
import ItemDetail from '../Screens/ItemDetail';
import ItemListCategory from '../Screens/ItemListCategory';
import { colors } from '../Global/Colors';

const Stack = createNativeStackNavigator();

const Navigator = () => {

    return (
        <SafeAreaView style = {styles.container}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='SB Entrenamientos'
                    screenOptions={
                        ({route, navigation}) => (
                            {
                                header: () => {
                                    return <Header route={route} navigation={navigation} />
                                }
                            }
                        )
                    }   
                >
                    <Stack.Screen 
                        name='SB Entrenamientos'
                        component={Home}
                        options={{ contentStyle:{backgroundColor: colors.primary} }}
                    />
                    <Stack.Screen
                        name='ItemListCategory'
                        component={ItemListCategory}
                        options={{ contentStyle:{backgroundColor: colors.primary} }}
                    />
                    <Stack.Screen
                        name='Detail'
                        component={ItemDetail}
                        options={{ contentStyle:{backgroundColor: colors.primary} }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
    </SafeAreaView>
  )
}

export default Navigator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
})