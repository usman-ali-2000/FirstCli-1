import React, { useEffect } from "react";
import { View } from "react-native";
import theme from "../Theme/GlobalTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function Splash() {

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const id = await AsyncStorage.getItem("id");
            const generatedId = await AsyncStorage.getItem("generatedId");
            console.log('id:', generatedId);
            if (id) {
                navigation.replace('Home');
            } else {
                navigation.replace("Login");
            }
        }, 3000); // Delay in milliseconds (3000 ms = 3 seconds)

        // Clear timeout if the component unmounts to avoid memory leaks
        return () => clearTimeout(timer);
    }, []);

    return (
        <LinearGradient colors={[theme.colors.lightyYellow, theme.colors.midYellow, theme.colors.darkYellow,]} style={{ width: '100%', flex: 1, alignItems:'center', justifyContent:'center' }}>
            <Image source={require('../assets/images/appIcon.png')} style={{ height: 100, width: 100, borderRadius: 100 }} />
        </LinearGradient>
    )
}