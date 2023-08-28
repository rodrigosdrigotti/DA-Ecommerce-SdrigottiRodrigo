import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import AddButton from "../Components/AddButton";
import AddressItem from '../Components/AddressItem'
import { useGetUserLocationQuery } from "../Services/shopServices";
import { colors } from "../Global/Colors";

const ListAddress = ({ navigation }) => {

    //Dark Mode Theme
    const theme = useSelector(state => state.themeReducer.mode);
    const [themeMode, setThemeMode] = useState(theme);

    useEffect(() => {
        setThemeMode(theme);
    }, [theme])
    /*  */

    const { location, localId } = useSelector((state) => state.userReducer.value);
    const {data: userLocationQuery, isError, isLoading} = useGetUserLocationQuery(localId);
    
    return location?.latitude || userLocationQuery ? (
        <AddressItem 
            location={location?.latitude ? location : userLocationQuery} 
            navigation={navigation} 
        />
    ) : (
        <View style = {styles.container}>
            <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>No location set</Text>
            <AddButton
                title="Set location"
                onPress={() => navigation.navigate("Location Selector")}
            />
        </View>
    );
};

export default ListAddress;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textLight: {
        paddingVertical: 20,
        fontFamily: 'SofiaBold',
        fontSize: 22,
        color: colors.secondary,
    },
    textDark: {
        paddingVertical: 20,
        fontFamily: 'SofiaBold',
        fontSize: 22,
        color: colors.white,
    }
});