import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';

const Card = ({children, additionalStyle = []}) => {
    return (
        <View style = {styles.cardContainer}>
            <View style={[styles.card, additionalStyle]}>
                {children}
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        margin: 10
    },
    card: {
        height: 200,
        width: 150,
        padding: 10,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    }
})