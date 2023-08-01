import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputForm from '../Components/InputForm'
import SubmitButton from '../Components/SubmitButton'
import { colors } from '../Global/Colors'
import { useLoginMutation } from '../Services/authServices'
import { useDispatch } from 'react-redux';
import { isAtLeastSixCharacters, isValidEmail } from "../Validations/auth";
import { useState, useEffect } from 'react';
import { setUser } from '../Features/User/userSlice'


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorSignIn, setSignIn] = useState("");

    const [triggerSignIn, resultSignIn] = useLoginMutation();
    const dispatch = useDispatch();

    const onSubmit = () => {
        const isValidVariableEmail = isValidEmail(email)
        const isCorrectPassword = isAtLeastSixCharacters(password)

        if (isValidVariableEmail && isCorrectPassword) {
            triggerSignIn({
                email,
                password,
                returnSecureToken: true,
            });
        }

        if (!isValidVariableEmail) setErrorEmail ('Email is not correct')
        else setErrorEmail('')
        if (!isCorrectPassword) setErrorPassword ('Password must be at least 6 characters')
        else setErrorPassword('')
    }
        
    useEffect(()=> {
        if(resultSignIn.isSuccess) {
            dispatch(setUser({
                email: resultSignIn.data.email,
                idToken: resultSignIn.data.idToken
            }))
        }
        if(resultSignIn.isError) {
            setSignIn(resultSignIn.error.data.error.message)
        }
    }, [resultSignIn])

    return (
        <View style={styles.main}>
            <ImageBackground source={require('../Assets/img/fondo-login.jpg')} style={styles.mainImage}>
            <View style={styles.container}>
                <Image source={require('../Assets/img/logoSB.png')} style={styles.logo}/>
                <InputForm 
                    label={"Email"}
                    onChange={(email) => setEmail(email)}
                    error={errorEmail}
                    icon={'mail'}
                />
                <InputForm 
                    label={"Password"}
                    onChange={(password)=> setPassword(password)}
                    error={errorPassword}
                    isSecure={true}
                    icon={'lock'}
                />
                <SubmitButton 
                    onPress={onSubmit}
                    title = "Login"
                />
                <Text style={styles.sub}>Not have an account?
                    <Pressable onPress={()=> navigation.navigate('Signup')}>
                        <Text style={styles.subLink}>Sign up</Text>
                    </Pressable>
                </Text>
                <Text style={styles.error}>{errorSignIn}</Text>
            </View>
            </ImageBackground>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
    },
    mainImage:{
        width: '100%', 
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        resizeMode: 'cover',
    },
    container: {
        width: "85%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    logo: {
        width: 200, 
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
        opacity: 0.5
    },
    sub: {
        fontSize: 14,
        fontFamily: 'SofiaBold',
        color: 'rgba(255,255,255,0.5)',
    },
    subLink: {
        fontSize: 14,
        fontFamily: 'SofiaBold',
        color: colors.primary,
        marginLeft: 5
    },
    error: {
        fontSize: 16,
        color: 'red',
        fontFamily: 'SofiaBold',
        fontStyle: 'italic',
    },
})