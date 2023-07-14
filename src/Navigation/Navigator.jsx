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
                    initialRouteName='Home'
                    screenOptions={
                        ({route}) => (
                            {
                                header: () => {
                                    return <Header/>
                                }
                            }
                        )
                    }            
                >
                    <Stack.Screen 
                        name='Home'
                        component={Home}
                    />
                    <Stack.Screen
                        name='ItemListCategory'
                        component={ItemListCategory}
                    />
                    <Stack.Screen
                        name='Detail'
                        component={ItemDetail}
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