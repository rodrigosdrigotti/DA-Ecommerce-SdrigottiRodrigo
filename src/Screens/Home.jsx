import { FlatList, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import categories from '../Data/categories.json';
import CategoryItem from '../Components/CategoryItem';
import { colors } from '../Global/Colors';

const Home = ({
  navigation
}) => {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Categorias</Text>
        </View>
        <FlatList
          style={styles.flat}
          data = {categories}
          keyExtractor={category => category.id}
          renderItem={({item}) => <CategoryItem item={item} navigation={navigation} />}
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
      height: '100%',
      width: '100%',
      alignItems: 'center',
    },
    titleContainer: {
      paddingLeft: 40,
      alignSelf: 'flex-start',
    },  
    title: {
      fontSize: 26,
      fontFamily: 'SofiaBold',
      color: colors.secondary,
    },
    flat: {
      paddingTop: 20,
      height: '100%',
      paddingHorizontal: 10
    }
  })