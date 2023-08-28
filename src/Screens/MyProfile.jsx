import { Image, StyleSheet, View, Text, Pressable, Switch, ScrollView } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useGetProfileImageQuery } from "../Services/shopServices";
import { colors } from "../Global/Colors";
import { setMode } from "../Features/Theme/themeSlice";

const MyProfile = ({navigation}) => {

    //Dark Mode Theme
    const theme = useSelector(state => state.themeReducer.mode);
    const [themeMode, setThemeMode] = useState(theme);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    
    //Button Switch to set Theme Mode
    const toggleSwitch = () => {
        setChecked(!checked);
        if(theme === 'light') {
            dispatch(setMode('dark'));
        } 
        else {
            dispatch(setMode('light'));
        }
    };
    
    useEffect(() => {
        setThemeMode(theme);
    }, [theme])
    /* */

    const {email, localId, profileImage} = useSelector(state => state.userReducer.value)

    const {data: image} = useGetProfileImageQuery(localId)

    const cameraImage = image?.image

    const launchCamera = async () => {
        navigation.navigate('Image Selector')
    };

    const launchLocation = async () => {
        navigation.navigate('List Address')
    }
    const launchEdit = async () => {
        navigation.navigate('Cards')
    }

    const launchHistory = async () => {
        navigation.navigate('Order History')
    }

    const launchNotifications = async () => {
        navigation.navigate('Notifications')
    }

    const launchWishlist = async () => {
        navigation.navigate('Wishlist')
    }

    return (
        <ScrollView>
            <View style={themeMode === 'light' ? styles.containerLight : styles.containerDark}>
                { profileImage || cameraImage  ? (
                    <View style={themeMode === 'light' ? styles.containerImageLight : styles.containerImageDark}>
                        <Image
                            source={{uri: profileImage || cameraImage}}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                ) : (
                    <View style={themeMode === 'light' ? styles.containerImageLight : styles.containerImageDark}>
                        <Image
                            source={require("../Assets/img/defaultProfile.png")}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                )}
                <View style={styles.userBox}>
                    <View style={styles.user}>
                        <Text style={themeMode === 'light' ? styles.textUserLight : styles.textUserDark}>{email}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Pressable style={styles.infoList} onPress={launchLocation}>
                            <MaterialIcons name="location-on" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                            <Text style={themeMode === 'light' ? styles.infoListTextLight : styles.infoListTextDark}>Shipping Address</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color= { themeMode === 'light' ? "grey" : colors.orange }/>
                        </Pressable>
                        <Pressable style={styles.infoList} onPress={launchCamera}>
                            <MaterialIcons name="photo-camera" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                            <Text style={themeMode === 'light' ? styles.infoListTextLight : styles.infoListTextDark}>Add Profile Picture</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                        </Pressable>
                        <Pressable style={styles.infoList} onPress={launchWishlist}>
                            <FontAwesome name="user" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                            <Text style={themeMode === 'light' ? styles.infoListTextLight : styles.infoListTextDark}>WishList</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                        </Pressable>
                        <Pressable style={styles.infoList} onPress={launchHistory}>
                            <FontAwesome5 name="clipboard-list" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                            <Text style={themeMode === 'light' ? styles.infoListTextLight : styles.infoListTextDark}>Order History</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                        </Pressable>
                        <Pressable style={styles.infoList} onPress={launchNotifications}>
                            <MaterialIcons name="notifications" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                            <Text style={themeMode === 'light' ? styles.infoListTextLight : styles.infoListTextDark}>Notifications</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                        </Pressable>
                        <Pressable style={styles.infoList} onPress={launchEdit}>
                            <MaterialIcons name="payment" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                            <Text style={themeMode === 'light' ? styles.infoListTextLight : styles.infoListTextDark}>Cards</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                        </Pressable>
                        <View style={styles.infoList}>
                            <MaterialCommunityIcons name="lightbulb-multiple-outline" size={24} color={themeMode === 'light' ? "grey" : colors.orange} />
                            <Text style={themeMode === 'light' ? styles.infoListTextLight : styles.infoListTextDark}>Dark Mode</Text>
                            <Switch
                                value={checked}
                                onValueChange={toggleSwitch}
                                trackColor={{true: colors.orange, false: colors.grey}}
                                ios_backgroundColor= {colors.grey}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    containerLight: {
        padding: 10,
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    containerDark: {
        padding: 10,
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    containerImageLight: {
        height: 150,
        width: 150,
        borderRadius: 100,
        borderWidth: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.secondary
    },
    containerImageDark: {
        height: 150,
        width: 150,
        borderRadius: 100,
        borderWidth: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.orange
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
    userBox: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    user: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textUserLight: {
        fontFamily: 'SofiaBold',
        fontSize: 22,
        textTransform: 'uppercase'
    },
    textUserDark: {
        fontFamily: 'SofiaBold',
        fontSize: 22,
        textTransform: 'uppercase',
        color: colors.white,
    },
    infoContainer: {
        paddingHorizontal: 30,
        paddingTop: 100,
        width: '100%',
        gap: 30,
    },
    infoList: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoListTextLight: {
        fontFamily: 'SofiaBold',
        fontSize: 20,
        color: 'gray',
    },
    infoListTextDark: {
        fontFamily: 'SofiaBold',
        fontSize: 20,
        color: colors.white,
    }
});