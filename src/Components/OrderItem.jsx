import { StyleSheet, Text, View, Pressable, useWindowDimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Card from "./Card";
import ModalAlert from "./Modal";
import { colors } from "../Global/Colors";

const OrderItem = ({ order, total, updatedAt}) => {

  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */

  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const onPressModal = () => {
    setModalVisible(!modalVisible);
    setMensaje("Próximamente Módulo de Pago")
  }

  return (
    <Card
        additionalStyle={(width > 350 ? styles.additionalStylesCardLight : styles.additionalStylesCardSMLight)
                        && (themeMode === 'light' ? styles.additionalStylesCardLight : styles.additionalStylesCardDark)
                        || (themeMode === 'light' ? styles.additionalStylesCardSMLight : styles.additionalStylesCardSMDark)
                        }
      >   
        <View style={width > 350 ? styles.infoContainer : styles.infoContainerSM}>
            <View style={styles.bloqueTexto}>
                <Text style={themeMode === 'light' ? styles.textCategoryLight : styles.textCategoryDark}>Fecha</Text>
                <Text style={themeMode === 'light' ? styles.textCategoryLight : styles.textCategoryDark}>{updatedAt}</Text>
            </View>
            <View style={styles.bloqueTexto}>
              <FlatList
                data={order}
                keyExtractor={(cartItem) => cartItem.id}
                renderItem={({ item }) => {
                  return <Text style={themeMode === 'light' ? styles.textCategoryLight : styles.textCategoryDark}>{item.title}   {'->'}   Cant: {item.quantity}</Text>;
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View style={styles.bloqueTexto}>
                <Text style={themeMode === 'light' ? styles.textoSubtotalLight : styles.textoSubtotalDark}>Total</Text>
                <Text style={styles.priceSubtotal}>${total}</Text>
            </View>
            <View style={styles.buttonCartContainer}>
                <Pressable
                style={(width > 350 ? styles.buttonCartLight : styles.buttonCartSMLight)
                      && (themeMode === 'light' ? styles.buttonCartLight : styles.buttonCartDark)
                      || (themeMode === 'light' ? styles.buttonCartSMLight : styles.buttonCartSMDark)
                      }
                onPress={() => {onPressModal()}}
                >
                <Text style={styles.buttonCartText}>Pay Now</Text>
                </Pressable>
            </View>
            <ModalAlert 
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              mensaje={mensaje}
            />
        </View>
      </Card>
      );
};

export default OrderItem;

const styles = StyleSheet.create({
  additionalStylesCardLight: {
    borderRadius: 40,
    paddingHorizontal: 40,
    height: 500,
    width: 350,
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
    marginTop: 50,
    alignSelf: 'center'
  },
  additionalStylesCardDark: {
    borderRadius: 40,
    paddingHorizontal: 40,
    height: 500,
    width: 350,
    backgroundColor: colors.greyDark,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
    marginTop: 50,
    alignSelf: 'center'
  },
  additionalStylesCardSMLight: {
    borderRadius: 40,
    width: 275,
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
    marginTop: 50,
    alignSelf: 'center'
  },
  additionalStylesCardSMDark: {
    borderRadius: 40,
    width: 275,
    backgroundColor: colors.greyDark,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
    marginTop: 50,
    alignSelf: 'center'
  },
  infoContainer: {
    flexDirection: "column",
    width: '100%',
    gap: 20
  },
  infoContainerSM: {
    flexDirection: "column",
    textAlign: "left",
    alignSelf: "center",
    width: "35%",
  },
  textCategoryLight: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: colors.secondary,
  },
  textCategoryDark: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: colors.white,
  },
  textPrice: {
    width: 100,
    fontSize: 22,
    fontFamily: "Sofia",
    marginTop: 10,
    color: colors.orange,
  },
  iconContainer: {
    flexDirection: "row",
  },
  bloqueTexto: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  texto: {
    fontSize: 22,
    fontFamily: 'SofiaBold',
    color: colors.secondary,
  },
  textoSubtotalLight: {
    fontSize: 26,
    fontFamily: 'SofiaExtraBold',
    color: colors.secondary,
  },
  textoSubtotalDark: {
    fontSize: 26,
    fontFamily: 'SofiaExtraBold',
    color: colors.orange,
  },
  price: {
    fontSize: 22,
    fontFamily: 'Sofia',
    color: colors.orange,
  },
  priceSubtotal: {
    fontSize: 26,
    fontFamily: 'SofiaExtraBold',
    color: colors.orange,
  },
  buttonCartContainer: {
    alignSelf: 'center',
    width: '100%'
  },
  buttonCartLight: {
    marginTop: 10,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCartDark: {
    marginTop: 10,
    backgroundColor: colors.orange,
    borderRadius: 40,
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCartSMLight: {
    marginTop: 30,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 50,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCartSMDark: {
    marginTop: 30,
    backgroundColor: colors.orange,
    borderRadius: 40,
    padding: 10,
    height: 50,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCartText: {
    fontFamily: 'SofiaBold',
    letterSpacing: 1,
    fontSize: 20,
    color: colors.white
  }
});
