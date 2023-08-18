import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { colors } from '../Global/Colors';

const CardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.addCard}>
        <Text style={styles.addCardText}>Saved Cards</Text>
        <Pressable style={styles.addButton}>
            <Entypo name="plus" size={24} color={colors.orange} />
            <Text style={styles.addCardText}>Add New</Text>
        </Pressable>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>

        </View>
      </View>
    </View>
  )
}

export default CardScreen

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
  },
  addCardText: {
    fontFamily: 'SofiaBold',
    fontSize: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderRadius: 20,
    width: 350,
    height: 250,
    backgroundColor: 'red',
  }
})