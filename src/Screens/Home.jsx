import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import CategoryItem from '../Components/CategoryItem';
import { useGetCategoriesQuery } from '../Services/shopServices';
import { colors } from '../Global/Colors';

const Home = ({ navigation }) => {
  
  //Dark Mode Theme
  const theme = useSelector(state => state.themeReducer.mode);
  const [themeMode, setThemeMode] = useState(theme);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme])
  /*  */

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={themeMode === 'light' ? styles.titleLight : styles.titleDark}>Categorias</Text>
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
    titleLight: {
      fontSize: 26,
      fontFamily: 'SofiaBold',
      color: colors.secondary,
    },
    titleDark: {
      fontSize: 26,
      fontFamily: 'SofiaBold',
      color: colors.white,
    },
    flat: {
      paddingTop: 20,
      height: '100%',
      paddingHorizontal: 10
    }
  })