import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { colors } from "../Global/Colors";

const AddressItem = ({ location, navigation }) => {

    //Dark Mode Theme
    const theme = useSelector(state => state.themeReducer.mode);
    const [themeMode, setThemeMode] = useState(theme);

    useEffect(() => {
        setThemeMode(theme);
    }, [theme])
    /*  */

    const onChangeLocation = () => {
        navigation.navigate('Location Selector')
    }

    return (
        <View style={themeMode === 'light' ? styles.cardLight : styles.cardDark} onPress={() => {}}>
            <View style={styles.textContainer}>
                <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>
                    {location.address}
                </Text>
            </View>
            <Pressable onPress={onChangeLocation}>
                <Entypo style={styles.changeIcon} name="location" size={30} color={themeMode === 'light' ? colors.primary : colors.dark} />
                <Text style={themeMode === 'light' ? styles.text2Light : styles.text2Dark}>Change</Text>
            </Pressable>
        </View>
    );
};

export default AddressItem;

const styles = StyleSheet.create({
    cardLight: {
        height: 125,
        backgroundColor: colors.secondary,
        padding: 17.5,
        margin: 40,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardDark: {
        height: 125,
        backgroundColor: colors.orange,
        padding: 17.5,
        margin: 40,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    textLight: {
        fontFamily: "SofiaBold",
        fontSize: 20,
        color: colors.white,
    },
    textDark: {
        fontFamily: "SofiaBold",
        fontSize: 20,
        color: colors.dark,
    },
    changeIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 5
    },
    text2Light: {
        fontFamily: "SofiaBold",
        fontSize: 19,
        color: colors.white,
    },
    text2Dark: {
        fontFamily: "SofiaBold",
        fontSize: 19,
        color: colors.dark,
    },
});