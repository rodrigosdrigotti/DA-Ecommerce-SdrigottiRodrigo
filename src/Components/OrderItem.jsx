import { StyleSheet, Text, View, Pressable, useWindowDimensions } from "react-native";
import React from "react";
import Card from "./Card";
import { colors } from "../Global/Colors";

const OrderItem = ({ order }) => {
  const total = order.items.reduce(
    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
    0
  );

  const { width } = useWindowDimensions();

  return (
      <Card
        additionalStyle={
          width > 350
            ? styles.additionalStylesCard
            : styles.additionalStylesCardSM
        }
      >
        <View
          style={width > 350 ? styles.infoContainer : styles.infoContainerSM}
        >
            <View style={styles.bloqueTexto}>
                <Text style={styles.textCategory}>Fecha</Text>
                <Text style={styles.textCategory}>{new Date(order.createdAt).toLocaleString()}</Text>
            </View>
            <View style={styles.bloqueTexto}>
                <Text style={styles.textoSubtotal}>Total</Text>
                <Text style={styles.priceSubtotal}>${total}</Text>
            </View>
            <View style={styles.buttonCartContainer}>
                <Pressable
                style={width > 350 ? styles.buttonCart : styles.buttonCartSM}
                onPress={() => {}}
                >
                <Text style={styles.buttonCartText}>Pay Now</Text>
                </Pressable>
            </View>
        </View>
      </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  additionalStylesCard: {
    flexDirection: "row",
    borderRadius: 40,
    paddingHorizontal: 40,
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
  },
  additionalStylesCardSM: {
    flexDirection: "row",
    borderRadius: 40,
    width: 275,
    backgroundColor: "none",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
    marginTop: 50,
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
  textCategory: {
    fontSize: 20,
    fontFamily: "SofiaBold",
    color: colors.secondary,
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
  textoSubtotal: {
    fontSize: 26,
    fontFamily: 'SofiaExtraBold',
    color: colors.secondary,
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
  buttonCart: {
    marginTop: 10,
    backgroundColor: colors.secondary,
    borderRadius: 40,
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCartSM: {
    marginTop: 30,
    backgroundColor: colors.secondary,
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
