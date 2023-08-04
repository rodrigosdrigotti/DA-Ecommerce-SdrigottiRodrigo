import { Image, StyleSheet, View } from "react-native";
import React from "react";
import AddButton from "../Components/AddButton";
import { useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../Services/shopServices";
import { colors } from "../Global/Colors";

const MyProfile = ({navigation}) => {

    const {localId, profileImage} = useSelector(state => state.userReducer.value)

    const {data: image} = useGetProfileImageQuery(localId)

    const cameraImage = image?.image

    const launchCamera = async () => {
        navigation.navigate('Image Selector')
    };

    const launchLocation = async () => {
        navigation.navigate('List Address')
    }

    console.log(profileImage);

    return (
        <View style={styles.container}>
            { profileImage || cameraImage  ? (
                <View style={styles.containerImage}>
                    <Image
                        source={{uri: profileImage || cameraImage}}
                        style={styles.image}
                        resizeMode="cover"
                    />
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
            <AddButton onPress={launchCamera} title="Add profile picture" />
            <AddButton onPress={launchLocation} title="My address" />
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
});