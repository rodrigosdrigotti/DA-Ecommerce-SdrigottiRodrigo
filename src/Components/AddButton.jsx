import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../Global/Colors";

const AddButton = ({
    title = "",
    onPress = () => {},
    color = colors.secondary,
}) => {
    return (
        <Pressable
            style={{ ...styles.button, backgroundColor: color }}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        marginTop: 20,
        borderRadius: 40,
        padding: 10,
        height: 50,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'SofiaBold',
        letterSpacing: 1,
        fontSize: 22,
        color: colors.white,
    },
});