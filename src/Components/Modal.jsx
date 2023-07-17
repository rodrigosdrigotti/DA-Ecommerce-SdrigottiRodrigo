import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../Global/Colors';

const ModalAlert = ({ modalVisible, setModalVisible, mensaje }) => {
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
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{mensaje}</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonDone]}
                            onPress={() => setModalVisible(!modalVisible)}
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
    modalView: {
        margin: 20,
        backgroundColor: "#EBEBEB",
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
    buttonDone: {
        backgroundColor: colors.secondary,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold"
    },
    backModal: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        height: '100%',
    }
})