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
    const [nfuc, setNfuc] = useState(null);
    const [usdt, setUsdt] = useState(null);


    const fetchCoin = async () => {
        const id = await AsyncStorage.getItem("id");
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/register/${id}`);
            const json = await response.json();
            console.log('json:', json.referCoin, json.coin);
            setCoins(formatNumber(json.referCoin + json.coin));
            setNfuc(formatNumber(json.nfuc + json.nfucRefer));
            setUsdt(formatNumber(json.usdt));
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
        <LinearGradient colors={[theme.colors.white, theme.colors.white, theme.colors.white,]} style={{ width: '100%', flex: 1 }}>
            <View style={{ flex: 1, width: '100%', alignItems: 'center', }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: '5%', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                            <Icon name="chevron-left" size={18} color={theme.colors.black} style={{ marginTop: '10%', marginLeft: '10%' }} />
                        </TouchableOpacity>
                        <Text style={{ color: theme.colors.black, fontSize: 18, fontFamily: 'Gilroy-SemiBold', marginLeft: '5%' }}>Wallet</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('History')}>
                        <Text style={{ color: theme.colors.blue, fontSize: 14, fontFamily: 'Gilroy-SemiBold', marginLeft: '5%' }}>History</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "90%", alignItems: 'center', justifyContent: 'center', padding: '5%', backgroundColor: theme.colors.lightPink, borderRadius: 10, elevation: 2 }}>
                    <Image source={require('../assets/images/withdraw.png')} style={{ height: 100, width: 100, marginTop: '5%' }} />
                </View>
                {/* {loading ? <ActivityIndicator size={"large"} color={theme.colors.purple} /> : <Text style={{ fontSize: 28, fontFamily: 'Gilroy-Bold', color: theme.colors.black, marginTop: '3%' }}>{coins} <Text style={{ color: theme.colors.darkYellow, fontFamily: 'Gilroy-Medium' }}>$</Text></Text>} */}
                <View style={{ width: "90%", alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: "10%", }}>
                    <View style={{ marginRight: '5%', backgroundColor: theme.colors.purple, padding: 5, borderRadius: 5, width: '30%', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image source={require('../assets/images/crown.png')} style={{ height: 10, width: 10 }} />
                            <Text style={{ color: theme.colors.white, fontFamily: 'Gilroy-SemiBold', fontSize: 12, marginLeft: '5%' }}>Nfuc</Text>
                        </View>
                        <Text style={{ color: theme.colors.white, fontFamily: 'Gilroy-Bold', fontSize: 16, textAlign: 'center', width: '100%' }}>{nfuc}</Text>
                    </View>
                    <View style={{ marginRight: '5%', backgroundColor: theme.colors.purple, padding: 5, borderRadius: 5, width: '30%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image source={require('../assets/images/crown.png')} style={{ height: 10, width: 10 }} />
                            <Text style={{ color: theme.colors.white, fontFamily: 'Gilroy-SemiBold', fontSize: 12, marginLeft: '5%' }}>Wx</Text>
                        </View>
                        <Text style={{ color: theme.colors.white, fontFamily: 'Gilroy-Bold', fontSize: 16, textAlign: 'center', width: '100%' }}>{coins}</Text>
                    </View>
                    <View style={{ marginRight: '5%', backgroundColor: theme.colors.purple, padding: 5, borderRadius: 5, width: '30%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image source={require('../assets/images/crown.png')} style={{ height: 10, width: 10 }} />
                            <Text style={{ color: theme.colors.white, fontFamily: 'Gilroy-SemiBold', fontSize: 12, marginLeft: '5%' }}>USDT</Text>
                        </View>
                        <Text style={{ color: theme.colors.white, fontFamily: 'Gilroy-Bold', fontSize: 16, textAlign: 'center', width: '100%' }}>{usdt}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, marginTop: '40%' }}>Coming Soon!</Text>
            </View>
        </LinearGradient>
    )
}