import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const SubmitButton = ({ onPress, title }) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default SubmitButton;

const styles = StyleSheet.create({
    button: {
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 1.5,
        borderRadius: 40,
        padding: 10,
        height: 50,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'SofiaBold',
        letterSpacing: 1,
        fontSize: 22,
        color: 'rgba(255,255,255,0.5)',
    },
});
