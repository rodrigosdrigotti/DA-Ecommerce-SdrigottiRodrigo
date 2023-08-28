import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import AddButton from "../Components/AddButton";
import { usePostUserLocationMutation } from "../Services/shopServices";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../Features/User/userSlice";
import { colors } from "../Global/Colors";
import MapPreview from "../Components/MapPreview";
import { google_maps_api_key } from "../Database/firebaseConfig";

const LocationSelector = ({ navigation }) => {

    //Dark Mode Theme
    const theme = useSelector(state => state.themeReducer.mode);
    const [themeMode, setThemeMode] = useState(theme);

    useEffect(() => {
        setThemeMode(theme);
    }, [theme])
    /*  */

    const [location, setLocation] = useState({ latitude: "", longitude: "" });
    const [error, setError] = useState("");

    const [address, setAddress] = useState("");

    const [triggerPostUserLocation, resultPostUserLocation] = usePostUserLocationMutation()
    const {localId} = useSelector(state => state.userReducer.value)
    const dispatch = useDispatch()

    const onConfirmAddress = () => {

        const locationFormatted = {
            latitude: location.latitude,
            longitude: location.longitude,
            address
        }

        dispatch(setUserLocation(
            locationFormatted
        ))

        triggerPostUserLocation({
            location: locationFormatted,
            localId
        })

        navigation.goBack();
    }
    
    //Location requested on mount
    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setError("Permission to access location was denied");
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            } catch (error) {
                console.log(error.message);
                setError(error.message)
            }
        })()
    }, [])

    //Reverse geocoding
    useEffect(() => {
        (async () => {
            try {
                if (location.latitude) {
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${google_maps_api_key}`;
                    const response = await fetch(url_reverse_geocode);
                    const data = await response.json();
                    console.dir(data);
                    setAddress(data.results[0].formatted_address);
                }
            } catch (error) {
                setError(error.message);
            }
        })();
    }, [location]);

    return (
        <View style={styles.container}>
            <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>My Address</Text>
            {/* Flatlist con las directions */}
            { location ? (
                <>
                    <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>
                        Lat: {location.latitude}, Long: {location.longitude}.
                    </Text>
                    <MapPreview location={location} />
                    <Text style={themeMode === 'light' ? styles.textLight : styles.textDark}>Address</Text>
                    <Text style={themeMode === 'light' ? styles.addressLight : styles.addressDark}>{address}</Text>
                    <AddButton
                        onPress={onConfirmAddress}
                        title="Confirm address"
                    />
                </>
            ) : (
                <>
                    <View style={styles.noLocationContainer}>
                        <Text>{error}</Text>
                    </View>
                </>
            )}
        </View>
    );
};

export default LocationSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    textLight: {
        paddingTop: 20,
        fontFamily: 'SofiaBold',
        fontSize: 18,
        color: colors.secondary,
    },
    textDark: {
        paddingTop: 20,
        fontFamily: 'SofiaBold',
        fontSize: 18,
        color: colors.white,
    },
    noLocationContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.secondary,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    addressLight: {
        paddingHorizontal: 40,
        fontFamily: "SofiaExtraBold",
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 10,
        color: colors.secondary,
    },
    addressDark: {
        paddingHorizontal: 40,
        fontFamily: "SofiaExtraBold",
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 10,
        color: colors.white,
    },
});