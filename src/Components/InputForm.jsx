import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Global/Colors';
import { Foundation } from '@expo/vector-icons'; 


const InputForm = ({
    label, 
    onChange, 
    isSecure = false,
    icon
}) => {
    const [input, setInput] = useState("");
    const onChangeText = (text) => {
        setInput(text)
        onChange(text)
    }
  return (
    <View style={styles.inputContainer}>
      <View style={styles.icons}>
        <Foundation name={icon} size={24} color={colors.secondary} />
      </View>
      <TextInput
        style ={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholder={label}
        placeholderTextColor={'rgba(255,255,255,0.6)'}
      />
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%'
    },
    subtitle: {
        width: '90%',
        fontSize: 18,
        fontFamily: 'SofiaBold',
        marginLeft: 20,
        paddingBottom: 5,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: 'grey',
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        //outlineStyle: 'none',
        width: '100%',
        height: 50,
        paddingLeft: 60,
        fontFamily: 'Sofia',
        letterSpacing: 0.5,
        fontSize: 20,
        borderRadius: 50,
        position: 'relative',
        color: 'rgba(255,255,255,0.75)',
    },
    icons: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        height: 40,
        width: 40,
        borderRadius: '50%',
        padding: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 5,
        top: 5
    }
})