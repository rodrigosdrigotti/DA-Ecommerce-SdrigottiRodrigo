import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { colors } from "../Global/Colors";

const AddressItem = ({ location, navigation }) => {

    const onChangeLocation = () => {
        navigation.navigate('Location Selector')
    }

    return (
        <View style={styles.card} onPress={() => {}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {location.address}
                </Text>
            </View>
            <Pressable onPress={onChangeLocation}>
                <Entypo style={styles.changeIcon} name="location" size={30} color={colors.primary} />
                <Text style={styles.text2}>Change</Text>
            </Pressable>
        </View>
    );
};

export default AddressItem;

const styles = StyleSheet.create({
    card: {
        height: 125,
        backgroundColor: colors.secondary,
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
    text: {
        fontFamily: "SofiaBold",
        fontSize: 17,
        color: colors.white,
    },
    changeIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 5
    },
    text2: {
        fontFamily: "SofiaBold",
        fontSize: 19,
        color: colors.white,
    },
});