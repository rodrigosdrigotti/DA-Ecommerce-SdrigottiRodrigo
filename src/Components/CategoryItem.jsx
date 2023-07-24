import { Pressable, StyleSheet, Text, Image, View, useWindowDimensions } from 'react-native';
import React from 'react';
import Card from './Card';
import { useDispatch } from 'react-redux';
import { setCategorySelected  } from '../Features/Shop/shopSlice';

const CategoryItem = ({
  item,
  navigation
}) => {

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  const onSelectCategory = () => {
    dispatch(setCategorySelected(item.category))
    navigation.navigate('ItemListCategory', {category: item.category})
  }

  return (
    <Pressable
      onPress={onSelectCategory}
    >
      <Card additionalStyle={styles.additionalStylesCard}>
        <View style={styles.imageContainer}>
          <Image 
            resizeMode='cover'
            style = {width > 350 ? styles.image : styles.imageSM}
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
    imageSM: {
      height: 110,
      width: 90,
      resizeMode: 'cover',
      borderRadius: 15,
      overflow: 'hidden',
    },
})