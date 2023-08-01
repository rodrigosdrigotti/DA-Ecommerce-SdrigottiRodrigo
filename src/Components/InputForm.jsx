import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../Global/Colors';
import { Foundation } from '@expo/vector-icons'; 


const InputForm = ({
    label, 
    onChange, 
    error = "",
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
      />
      {error ? 
        <Text style = {styles.error}>
            {error}
        </Text>
        :
        null
    }
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
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
    error: {
        fontSize: 16,
        color: 'red',
        fontFamily: 'SofiaBold',
        fontStyle: 'italic',
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        outlineStyle: 'none',
        shadowColor: 'black',
        shadowOffset:{
        width: 0,
        height: 0,
        },
        shadowOpacity: .15,
        shadowRadius: 30,
        elevation: 10,
        width: '90%',
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
        left: 25,
        top: 5
    }
})