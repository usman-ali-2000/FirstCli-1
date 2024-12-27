import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import { BaseUrl, formatNumber } from "../assets/Data";
import LinearGradient from "react-native-linear-gradient";

export default function Leadership() {

    // const topTenUsers = users
    //     .sort((a, b) => (b.coin + b.referCoin) - (a.coin + a.referCoin))
    //     .slice(0, 10);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/register`);
            const json = await response.json();
            const topUser = await json.sort((a, b) => (b.coin + b.referCoin) - (a.coin + a.referCoin)).slice(0, 50);
            console.log('json:', topUser);
            setUserData(topUser);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log('error fetching...', e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <LinearGradient colors={[theme.colors.lightyYellow, theme.colors.midYellow, theme.colors.darkYellow,]} style={{ width: '100%', flex: 1 }}>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center', paddingBottom:'5%'}}>
                    <Image source={require('../assets/images/friends.png')} style={{ height: 100, width: 100, marginTop: '20%' }} />
                    <Text style={{ colors: theme.colors.white, fontSize: 20, color: theme.colors.black, fontFamily: 'Gilroy-Bold', paddingLeft: '2%', marginTop: '5%' }}>Top Contributors</Text>
                    {loading ? <ActivityIndicator size={"large"} color={theme.colors.darkYellow} style={{ marginTop: '30%' }} /> : <View style={{ width: '100%', alignItems: 'center' }}>
                        <FlatList
                            style={{ width: '90%' }}
                            data={userData}
                            renderItem={({ item, index }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: "center", width: '70%' }}>
                                        <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', marginRight: '2%', width: '15%' }}>{index + 1}</Text>
                                        <Image source={require('../assets/images/friend.png')} style={{ height: 25, width: 25, }} />
                                        <Text style={{ colors: theme.colors.white, fontSize: 18, color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', width: "70%" }}>{item.name}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: "center", width: '20%' }}>
                                        <Image source={require('../assets/images/dollar.gif')} style={{ height: 20, width: 20 }} />
                                        <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%' }}>{formatNumber(item.coin + item.referCoin)} $</Text>
                                    </View>
                                </View>
                            )} />
                    </View>}
                </ScrollView>
            </View>
        </LinearGradient>
    )
}