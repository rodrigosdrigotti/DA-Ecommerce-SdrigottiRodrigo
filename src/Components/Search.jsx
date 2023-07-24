import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Global/Colors';

const Search = ({
    onSearch,
    error = "",
    }) => {
    
    const { width } = useWindowDimensions();

    const [keyword, setKeyword] = useState("")

    const Busqueda = (text) => {
        setKeyword(text)
        onSearch(text)
    }
    
    return (
        <>
        <View style ={  width > 350 ? styles.container : styles.containerSM }>
            <TextInput style ={ width > 350 ? styles.input : styles.inputSM } 
                placeholder='Search...'
                value={keyword}
                onChangeText={(text) => Busqueda(text)}        
            />
            <Pressable onPress={()=>onSearch(keyword)}>
                <FontAwesome style={ width > 350 ? styles.searchIcon : styles.searchIconSM}  name="search" size={24} color={colors.secondary} />
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
        marginVertical: 10,
    },
    containerSM: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5%',
        gap: 18,
        marginVertical: 5,
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
    inputSM: {
        width: 225,
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
    },
    searchIconSM: {
        position: 'absolute',
        left: -230,
        top: -14
    }
})