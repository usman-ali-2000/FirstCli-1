import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl, formatNumber } from "../assets/Data";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";


export default function Wallet({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(null);


    const fetchCoin = async () => {
        const id = await AsyncStorage.getItem("id");
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/register/${id}`);
            const json = await response.json();
            console.log('json:', json.referCoin, json.coin);
            setCoins(json.referCoin + json.coin);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log('error fetching...', e);
        }
    }

    useEffect(() => {
        fetchCoin();
    }, []);

    return (
        <LinearGradient colors={[theme.colors.lightyYellow, theme.colors.midYellow, theme.colors.darkYellow,]} style={{ width: '100%', flex: 1 }}>
            <View style={{ flex: 1, width: '100%', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.white} style={{ marginTop: '10%', marginLeft: '5%' }} />
                </TouchableOpacity>
                <Image source={require('../assets/images/coins.png')} style={{ height: 100, width: 100, marginTop: '25%' }} />
                {loading ? <ActivityIndicator size={"large"} color={theme.colors.darkYellow} /> : <Text style={{ fontSize: 28, fontFamily: 'Gilroy-Bold', color: theme.colors.white, marginTop: '3%' }}>{coins && formatNumber(coins)} <Text style={{ color: theme.colors.darkYellow, fontFamily: 'Gilroy-Medium' }}>$</Text></Text>}
                <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.white, marginTop: '40%' }}>Coming Soon!</Text>
            </View>
        </LinearGradient>
    )
}