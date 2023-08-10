import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductItem from '../Components/ProductItem'
import Search from '../Components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery, useGetProductsQuery } from '../Services/shopServices'
import { colors } from '../Global/Colors'
import { setAllProducts } from '../Features/Shop/shopSlice'

const ItemListCategory = ({
  navigation
}) => {

  const dispatch = useDispatch(); 
  const { data: allProducts } = useGetProductsQuery();

  const categorySelected = useSelector(state => state.shopReducer.value.categorySelected)
  const { data: productsSelected, isLoading, isError } = useGetProductsByCategoryQuery(categorySelected);

  const [products, setProducts] = useState(allProducts)
  const [keyword, setKeyword] = useState("")
  const [keywordError, setKeywordError] = useState("")

  useEffect(()=> {
    if(productsSelected) {
      const productsFiltered = productsSelected.filter(product => product.title.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()))
      setProducts(productsFiltered)
      dispatch(setAllProducts(allProducts))
    }
  }, [productsSelected, keyword, isLoading])

  const onSearch = (input) => {
    
      const expression = /^[a-zA-Z0-9\ ]*$/
      const evaluation = expression.test(input)

      if (evaluation) {
        setKeyword(input)
        setKeywordError("")
      } else {
        setKeywordError("Solo letras y números")
      }
  } 

  return (
    <View style={styles.container}>
        <Search
          onSearch={onSearch}
          error={keywordError}
          goBack={()=> navigation.goBack()}
        />
        {!isLoading ?
        <FlatList
            style={styles.flat}
            data = {products}
            keyExtractor={product => product.id}
            renderItem={({item}) => <ProductItem item={item} navigation={navigation}/>}
            showsVerticalScrollIndicator={false}
        />
        : 
        <ActivityIndicator animating={true} style={styles.loader} size="large" color={colors.secondary} />
        }
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
    container: {
      height: '100%',
      alignItems: 'center',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    flat: {
      paddingTop: 10,
      paddingHorizontal: 5
    }
})