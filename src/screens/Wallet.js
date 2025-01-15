import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl, formatNumber } from "../assets/Data";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CircularProgress from "../components/CircularProgress";

export default function Wallet({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(null);
    const [nfuc, setNfuc] = useState(null);
    const [usdt, setUsdt] = useState(null);

    // Set target date to January 13, 2025
    const targetDate = new Date("2025-01-22T00:00:00");
    const targetDate2 = new Date("2025-02-28T00:00:00");

    const calculateRemainingTime = () => {
        const now = new Date().getTime();
        const target = targetDate.getTime();
        return target - now;
    };
    const calculateRemainingTime2 = () => {
        const now = new Date().getTime();
        const target = targetDate2.getTime();
        return target - now;
    };

    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());
    const [remainingTime2, setRemainingTime2] = useState(calculateRemainingTime2());

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
    };

    useEffect(() => {
        fetchCoin();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(calculateRemainingTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime2(calculateRemainingTime2());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Calculate days, hours, and minutes from remaining time
    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    // Calculate days, hours, and minutes from remaining time
    const days2 = Math.floor(remainingTime2 / (24 * 60 * 60 * 1000));
    const hours2 = Math.floor((remainingTime2 % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes2 = Math.floor((remainingTime2 % (60 * 60 * 1000)) / (60 * 1000));

    return (
        <LinearGradient colors={[theme.colors.white, theme.colors.white, theme.colors.white]} style={{ width: '100%', flex: 1 }}>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
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
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={{ width: "90%", alignItems: 'center', justifyContent: 'center', padding: '5%', backgroundColor: theme.colors.lightPink, borderRadius: 10, elevation: 2 }}>
                        <Image source={require('../assets/images/withdraw.png')} style={{ height: 100, width: 100, marginTop: '5%' }} />
                    </View>
                    <View style={{ width: "90%", alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: "10%" }}>
                        <View style={{ marginRight: '5%', backgroundColor: theme.colors.purple, padding: 5, borderRadius: 5, width: '30%' }}>
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
                    <View style={{ marginTop: '5%', backgroundColor: theme.colors.white, width: '90%', alignItems: 'center', elevation: 5, paddingBottom:"5%", borderRadius:5 }}>
                        {remainingTime > 0 && (<>
                            <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, marginTop: '5%', width: '90%' }}>Remaining Time!</Text>
                            <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '5%' }}>
                                <CircularProgress size={60} progress={days} totalProgress={9} color={theme.colors.purple} total={'days'} backgroundColor="#d3d3d3" strokeWidth={6} />
                                <CircularProgress size={60} progress={hours} totalProgress={24} color={theme.colors.green} total={'hrs'} backgroundColor="#d3d3d3" strokeWidth={6} />
                                <CircularProgress size={60} progress={minutes} totalProgress={60} color={theme.colors.darkYellow} total={'mins'} backgroundColor="#d3d3d3" strokeWidth={6} />
                            </View>
                        </>)}
                        <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, marginTop: '5%', width: '90%' }}>Nfuc having countdown</Text>
                        <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '5%' }}>
                            <CircularProgress size={60} progress={days2} totalProgress={45} color={theme.colors.purple} total={'days'} backgroundColor="#d3d3d3" strokeWidth={6} />
                            <CircularProgress size={60} progress={hours2} totalProgress={24} color={theme.colors.green} total={'hrs'} backgroundColor="#d3d3d3" strokeWidth={6} />
                            <CircularProgress size={60} progress={minutes2} totalProgress={60} color={theme.colors.darkYellow} total={'mins'} backgroundColor="#d3d3d3" strokeWidth={6} />
                        </View>
                    </View>
                    {remainingTime <= 0 ? <Text style={{ fontSize: 22, fontFamily: 'Gilroy-Bold', color: theme.colors.purple, marginTop: '20%' }}>You're about there...</Text> :
                        <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, marginTop: '20%' }}>Coming Soon!</Text>}
                </ScrollView>
            </View>
        </LinearGradient>
    );
}
