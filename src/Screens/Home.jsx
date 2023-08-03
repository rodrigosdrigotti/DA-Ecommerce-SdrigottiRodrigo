import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import CategoryItem from '../Components/CategoryItem';
import { colors } from '../Global/Colors';
import { useGetCategoriesQuery } from '../Services/shopServices';

const Home = ({
  navigation
}) => {

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Categorias</Text>
        </View>
        { !isLoading ?
          <FlatList
            style={styles.flat}
            data = {categories}
            keyExtractor={category => category.id}
            renderItem={({item}) => <CategoryItem item={item} navigation={navigation} />}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
          />
          :
          <ActivityIndicator animating={true} style={styles.loader} size="large" color={colors.secondary} />
        }
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
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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