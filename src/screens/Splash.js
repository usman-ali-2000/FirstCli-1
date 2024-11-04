import React, { useEffect } from "react";
import { View } from "react-native";
import theme from "../Theme/GlobalTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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
        <View style={{ flex: 1, width: '100%', backgroundColor: theme.colors.black }}>
        </View>
    )
}