import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '../Global/Colors';
import { clearOrder } from '../Features/Order/orderSlice';

const ModalAlert = ({ modalVisible, setModalVisible, mensaje }) => {

    //Dark Mode Theme
    const theme = useSelector(state => state.themeReducer.mode);
    const [themeMode, setThemeMode] = useState(theme);

    useEffect(() => {
        setThemeMode(theme);
    }, [theme])
    /*  */
    
    const dispatch = useDispatch();
    
    return (
 
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
    >
        <View style={styles.backModal}>
            <View style={styles.centeredView}>
                <View style={themeMode === 'light' ? styles.modalViewLight : styles.modalViewDark}>
                    <Text style={themeMode === 'light' ? styles.modalTextLight : styles.modalTextDark}>{mensaje}</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, themeMode === 'light' ? styles.buttonDoneLight : styles.buttonDoneDark]}
                            onPress={() => {dispatch(clearOrder())}}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    </Modal>
);
};

export default ModalAlert

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalViewLight: {
        margin: 20,
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalViewDark: {
        margin: 20,
        backgroundColor: colors.greyDark,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    button: {
        width: 100,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonDoneLight: {
        backgroundColor: colors.secondary,
    },
    buttonDoneDark: {
        backgroundColor: colors.orange,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalTextLight: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: colors.secondary,
    },
    modalTextDark: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: colors.white,
    },
    backModal: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        height: '100%',
    }
})