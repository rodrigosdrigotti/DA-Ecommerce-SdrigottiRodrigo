import { Pressable, StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';
import Card from './Card';

const CategoryItem = ({
  item,
  setCategorySelected
}) => {
  return (
    <Pressable
      onPress={()=>setCategorySelected(item.category)}
    >
      <Card additionalStyle={styles.additionalStylesCard}>
        <View style={styles.imageContainer}>
          <Image 
            resizeMode='cover'
            style = {styles.image}
            source={{uri: item.images}}
          />
        </View>
        <Text style={styles.textCategory}>{item.category}</Text>
      </Card>
    </Pressable>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  additionalStylesCard: {
    justifyContent: 'flex-start',
    borderRadius: 25,
    paddingTop: 20
  },
    textCategory: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontFamily: "SofiaBold",
        marginTop: 10,
        textAlign: 'center',
        width: '100%',
    },
    imageContainer: {
      alignSelf: 'center',
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset:{
        width: 2,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 10,
    },
    image: {
      height: 110,
      width: 110,
      resizeMode: 'cover',
      borderRadius: 15,
      overflow: 'hidden',
    },
  
})