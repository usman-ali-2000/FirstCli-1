import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../Theme/GlobalTheme";
import { BaseUrl, timeAgo } from "../assets/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function History({ navigation }) {

    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const id = await AsyncStorage.getItem('generatedId');
            const response = await fetch(`${BaseUrl}/transhistory/${id}`);
            const json = await response.json();
            setData(json);
            console.log('json:', json);
        } catch (e) {
            console.log('error fetching data', e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchHistory()
    }, []);

    const onRefresh = () => {
        setRefreshing(true); // Show the refresh spinner
        setTimeout(() => {
            fetchHistory();
            setRefreshing(false); // Hide the refresh spinner
        }, 2000); // Simulate a network request delay
    };


    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightGrey }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.black} style={{ marginTop: '10%', marginLeft: '5%' }} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.black, fontSize: 18, fontFamily: 'Gilroy-SemiBold', marginLeft: '5%' }}>History</Text>
            </View>
            {loading ? <ActivityIndicator size={"large"} color={theme.colors.purple} style={{ marginTop: '60%' }} /> :
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.purple}
                            colors={[theme.colors.lightGrey, theme.colors.darkGrey, theme.colors.purple]} // Android spinner colors
                        />
                    }
                    style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: '5%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between', marginTop: '5%', padding: '2%', borderRadius: 5, backgroundColor: theme.colors.white, elevation: 5, backgroundColor: theme.colors.purple }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Bold', color: theme.colors.white, width: '30%', textAlign: 'center' }}>Time</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Bold', color: theme.colors.white, width: '30%', textAlign: 'center' }}>Transaction</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Bold', color: theme.colors.white, width: '30%', textAlign: 'center' }}>Amount/Coins</Text>
                    </View>
                    {data.map((item) => (<View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-between', marginTop: '3%', padding: '5%', borderRadius: 5, backgroundColor: theme.colors.white, elevation: 5 }}>
                        <Text style={{ fontSize: 12, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, width: '30%', textAlign: 'center' }}>{item.timestamp && timeAgo(item.timestamp)}</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, width: '30%', textAlign: 'center' }}>{item.usdt ? item.pending ? "pending" : "withdraw" : item.receiver === id ? 'Receive' : "Send"}</Text>
                        <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, width: '30%', textAlign: 'center' }}>{item.usdt ? `${item.usdt} $` : `${item.nfuc} Nfuc`}</Text>
                    </View>))}
                </ScrollView>}
        </View>
    )
}