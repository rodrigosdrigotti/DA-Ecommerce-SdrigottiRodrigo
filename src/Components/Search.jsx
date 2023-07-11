import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';
import { AntDesign } from '@expo/vector-icons';

const Search = ({
    onSearch,
    error = "",
    goBack
    }) => {
    const [keyword, setKeyword] = useState("")

    const Busqueda = (text) => {
        setKeyword(text)
        onSearch(text)
    }
    return (
        <>
        <View style ={styles.container}>
            <TextInput style ={styles.input} 
                placeholder='Search...'
                value={keyword}
                onChangeText={(text) => Busqueda(text)}        
            />
            <Pressable onPress={()=>onSearch(keyword)}>
                <FontAwesome style={styles.searchIcon} name="search" size={24} color={colors.secondary} />
            </Pressable>
            <Pressable onPress={goBack}>
                <AntDesign name="back" size={24} color={colors.secondary} />
            </Pressable>
        </View>
        { error ?
            <Text>
                {error}
            </Text>
            : null}
        </>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        gap: 18,
    },
    input: {
        width: 275,
        padding: 8,
        fontSize: 18,
        fontFamily: 'Sofia',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingLeft: 45,
        position: 'relative'
    },
    searchIcon: {
        position: 'absolute',
        left: -280,
        top: -14
    }
})