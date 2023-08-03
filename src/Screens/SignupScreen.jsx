import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InputForm from "../Components/InputForm";
import SubmitButton from "../Components/SubmitButton";
import { colors } from "../Global/Colors";
import { useSignUpMutation } from "../Services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../Features/User/userSlice";
import { isAtLeastSixCharacters, isValidEmail } from "../Validations/auth";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [errorSignUp, setSignUp] = useState("");

    const [triggerSignUp, result] = useSignUpMutation();
    const dispatch = useDispatch();

    useEffect(()=> {
        if (result.isSuccess) {
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken
                })
            )
        }
        if(result.isError) {
           setSignUp(result.error.data.error.message)
        }
    }, [result])

    const onSubmit = () => {
        try {
            const isValidVariableEmail = isValidEmail(email)
            const isCorrectPassword = isAtLeastSixCharacters(password)
            const isRepeatedPasswordCorrect = password === confirmPassword

            if (isValidVariableEmail && isCorrectPassword && isRepeatedPasswordCorrect) {
                const request = {
                    email,
                    password,
                    returnSecureToken: true
                }
                triggerSignUp(request)
            }

            if (!isValidVariableEmail) setErrorMail ('Email is not correct')
            else setErrorMail('')
            if (!isCorrectPassword) setErrorPassword ('Password must be at least 6 characters')
            else setErrorPassword('')
            if (!isRepeatedPasswordCorrect) setErrorConfirmPassword ('Passwords must match')
            else setErrorConfirmPassword('')

        } catch (err) {
            console.log("Catch error");
            console.log(err.message);
        }
    };

    return (
        <View style={styles.main}>
            <ImageBackground source={require('../Assets/img/fondo-login.jpg')} style={styles.mainImage}>
            <View style={styles.container}>
                <Image source={require('../Assets/img/logoSB.png')} style={styles.logo}/>
                <InputForm label={"Email"} onChange={setEmail} /* error={errorMail} */ icon={'mail'}/>
                <InputForm
                    label={"Password"}
                    onChange={setPassword}
                    /* error={errorPassword} */
                    isSecure={true}
                    icon={'lock'}
                />
                <InputForm
                    label={"Confirm Password"}
                    onChange={setconfirmPassword}
                    /* error={errorConfirmPassword} */
                    isSecure={true}
                    icon={'lock'}
                />
                <View style={styles.containerError}>
                    <Text style={styles.error}>{errorMail}</Text>
                    <Text style={styles.error}>{errorPassword}</Text>
                    <Text style={styles.error}>{errorConfirmPassword}</Text>
                    <Text style={styles.error}>{errorSignUp}</Text>
                </View>
                <SubmitButton onPress={onSubmit} title="Signup" />
                <View style={styles.pie}>
                    <Text style={styles.sub}>Already have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.subLink}>Login</Text>
                    </Pressable>
                </View>
            </View>
            </ImageBackground>
        </View>
    );
};

export default SignupScreen;

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
    pie: {
        flexDirection: 'row'
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
    containerError: {
        height: 35,
        flexDirection: 'column'
    },
    error: {
        fontSize: 16,
        color: colors.orange,
        fontFamily: 'SofiaBold',
        fontStyle: 'italic',
        textTransform: 'uppercase',
    },
});
