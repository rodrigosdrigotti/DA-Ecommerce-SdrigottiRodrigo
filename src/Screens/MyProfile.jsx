import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import React from "react";
import { useGetProfileImageQuery } from "../Services/shopServices";
import { colors } from "../Global/Colors";

const MyProfile = ({navigation}) => {

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
        <View style={styles.container}>
            { profileImage || cameraImage  ? (
                <View style={styles.containerImage}>
                    <Image
                        source={{uri: profileImage || cameraImage}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View>
                        <Text>
                            {email}
                        </Text>
                    </View>
                </View>
            ) : (
                <View style={styles.containerImage}>
                    <Image
                        source={require("../Assets/img/defaultProfile.png")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
            )}
            <View style={styles.userBox}>
                <View style={styles.user}>
                    <Text style={styles.textUser}>{email}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Pressable style={styles.infoList} onPress={launchLocation}>
                        <MaterialIcons name="location-on" size={24} color={colors.secondary} />
                        <Text style={styles.infoListText}>Shipping Address</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
                    </Pressable>
                    <Pressable style={styles.infoList} onPress={launchCamera}>
                        <MaterialIcons name="photo-camera" size={24} color={colors.secondary} />
                        <Text style={styles.infoListText}>Add Profile Picture</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
                    </Pressable>
                    <Pressable style={styles.infoList} onPress={launchWishlist}>
                        <FontAwesome name="user" size={24} color={colors.secondary} />
                        <Text style={styles.infoListText}>WishList</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
                    </Pressable>
                    <Pressable style={styles.infoList} onPress={launchHistory}>
                        <FontAwesome5 name="clipboard-list" size={24} color={colors.secondary} />
                        <Text style={styles.infoListText}>Order History</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
                    </Pressable>
                    <Pressable style={styles.infoList} onPress={launchNotifications}>
                        <MaterialIcons name="notifications" size={24} color={colors.secondary} />
                        <Text style={styles.infoListText}>Notifications</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
                    </Pressable>
                    <Pressable style={styles.infoList} onPress={launchEdit}>
                        <MaterialIcons name="payment" size={24} color={colors.secondary} />
                        <Text style={styles.infoListText}>Cards</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
                    </Pressable>
                </View>
            </View>
            {/* <AddButton onPress={launchCamera} title="Add profile picture" />
            <AddButton onPress={launchLocation} title="My address" /> */}
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    containerImage: {
        height: 150,
        width: 150,
        borderRadius: 100,
        borderWidth: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.secondary
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
    textUser: {
        fontFamily: 'SofiaBold',
        fontSize: 22,
        textTransform: 'uppercase'
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
    infoListText: {
        fontFamily: 'SofiaBold',
        fontSize: 20,
        color: 'gray',
    }
});