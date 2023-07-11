import { FlatList, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import categories from '../Data/categories.json';
import CategoryItem from '../Components/CategoryItem';
import { colors } from '../Global/Colors';

const Home = ({
  setCategorySelected
}) => {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Categorias</Text>
        </View>
        <FlatList
          data = {categories}
          keyExtractor={category => category.id}
          renderItem={({item}) => CategoryItem({item, setCategorySelected})}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      height: '85%',
    },
    titleContainer: {
      width: '100%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginBottom: 15,
    },  
    title: {
      fontSize: 26,
      fontFamily: 'SofiaBold',
      color: colors.secondary,
    },
  })