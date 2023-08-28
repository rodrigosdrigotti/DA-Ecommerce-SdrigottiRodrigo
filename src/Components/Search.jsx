import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { colors } from '../Global/Colors';

const Search = ({
    onSearch,
    error = "",
    }) => {
    
    //Dark Mode Theme
    const theme = useSelector(state => state.themeReducer.mode);
    const [themeMode, setThemeMode] = useState(theme);

    useEffect(() => {
        setThemeMode(theme);
    }, [theme])
    /*  */

    const { width } = useWindowDimensions();
    const [keyword, setKeyword] = useState("")

    const Busqueda = (text) => {
        setKeyword(text)
        onSearch(text)
    }
    
    return (
        <>
        <View style ={  width > 350 ? styles.container : styles.containerSM }>
            <TextInput style ={ (width > 350 ? styles.inputLight : styles.inputSMLight)
                                && (themeMode === 'light' ? styles.inputLight : styles.inputDark)
                                || (themeMode === 'light' ? styles.inputSMLight : styles.inputSMDark)
                                } 
                placeholder='Search...'
                placeholderTextColor={themeMode === 'light' ? colors.grey : colors.secondary}
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
        : null }
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
    inputLight: {
        width: 275,
        padding: 8,
        fontSize: 18,
        fontFamily: 'Sofia',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingLeft: 45,
        position: 'relative'
    },
    inputDark: {
        width: 275,
        padding: 8,
        fontSize: 18,
        fontFamily: 'Sofia',
        backgroundColor: colors.grey,
        borderRadius: 10,
        paddingLeft: 45,
        position: 'relative'
    },
    inputSMLight: {
        width: 225,
        padding: 8,
        fontSize: 18,
        fontFamily: 'Sofia',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingLeft: 45,
        position: 'relative'
    },
    inputSMDark: {
        width: 225,
        padding: 8,
        fontSize: 18,
        fontFamily: 'Sofia',
        backgroundColor: colors.grey,
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