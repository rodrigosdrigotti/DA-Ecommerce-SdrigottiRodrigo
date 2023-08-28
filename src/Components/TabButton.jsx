import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../Global/Colors";

const TabButton = ( props ) => {

    const {item , onPress, accessibilityState} = props
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
      if(focused) {
        viewRef.current.animate({0: {scale: .5, rotate: '0deg'}, 1:{scale: 1.5, rotate: '360deg'}})
      }
      else {
        viewRef.current.animate({0: {scale: 1.5, rotate: '360deg'}, 1:{scale: 1, rotate: '0deg'}})
      }
    }, [focused])
    
    return (
        <View style={styles.demo}>
            <TouchableOpacity 
                onPress={onPress}
                activeOpacity={1}
            >
                <Animatable.View
                    ref={viewRef}
                    duration={1000}
                >
                    <Ionicons name={focused ? item.activeIcon : item.inactiveIcon} size={item.size} color={focused ? colors.white : 'grey'} />
                </Animatable.View>
            </TouchableOpacity>
        </View>
    )
}

export default TabButton;

const styles = StyleSheet.create({
    demo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 32.5,
    }
})