import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductItem from '../Components/ProductItem'
import Search from '../Components/Search'
import { useSelector } from 'react-redux'

const ItemListCategory = ({
  navigation
}) => {

  const productsSelected = useSelector(state => state.shopReducer.value.productsSelected)

  const [products, setProducts] = useState([])
  const [keyword, setKeyword] = useState("")
  const [keywordError, setKeywordError] = useState("")

  useEffect(()=> {
    const productsFiltered = productsSelected.filter(product => product.title.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()))
    setProducts(productsFiltered)

  }, [productsSelected, keyword])

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
        <FlatList
            style={styles.flat}
            data = {products}
            keyExtractor={product => product.id}
            renderItem={({item}) => <ProductItem item={item} navigation={navigation}/>}
            showsVerticalScrollIndicator={false}
        />
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
    container: {
      height: '100%',
      alignItems: 'center',
    },
    flat: {
      paddingTop: 10,
      paddingHorizontal: 5
    }
})