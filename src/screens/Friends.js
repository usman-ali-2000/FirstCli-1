import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, ToastAndroid, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BaseUrl, formatNumber } from "../assets/Data";
import Share from 'react-native-share';
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Friends() {

    const [select, setSelect] = useState(1);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(null);


    const fetchData = async () => {
        try {
            setLoading(true);
            const generatedId = await AsyncStorage.getItem("generatedId");
            const response = await fetch(`${BaseUrl}/register`);
            const json = await response.json();
            const friendData = await json.filter((item) => item.userId === generatedId);
            setFriends(friendData);
            console.log('json:', friendData);
            setLoading(false);
        } catch (e) {
            console.log('error fetching friends', e);
            setLoading(false);
        }
    }

    const fetchReferCoin = async () => {
        const id = await AsyncStorage.getItem("id");
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/register/${id}`);
            const json = await response.json();
            console.log('json:', json.referCoin);
            setCoins(json.referCoin);
        } catch (e) {
            setLoading(false);
            console.log('error fetching...', e);
        }
    }

    useEffect(() => {
        fetchData();
        fetchReferCoin();
    }, []);

    const shareWithOptions = async () => {
        try {
            const result = await Share.open({
                title: 'Check this out!',
                message: 'Here is an interesting link for you.',
                url: 'https://www.example.com',
                failOnCancel: false, // Prevents throwing an error if the user cancels the share action
            });
            console.log('Shared successfully:', result);
        } catch (error) {
            if (error.message !== 'User did not share') {
                console.error('Error sharing:', error.message);
            }
        }
    };

    const textToCopy = 'Hello, this text is copied to the clipboard!';

    const copyToClipboard = () => {
        Clipboard.setString(textToCopy);
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    };





    const Friends = () => {
        return (
            <View style={{ width: '80%', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    {!loading && friends.length !== 0 && <View style={{ flexDirection: 'row', alignItems: "center", marginTop: '5%', width: '100%' }}>
                        <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.green, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', marginRight: '2%', width: '10%', }}>No.</Text>
                        <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.green, fontFamily: 'Gilroy-Medium', paddingLeft: '2%' }}>Name</Text>
                    </View>}
                    {loading ? <ActivityIndicator size={"large"} color={theme.colors.green} style={{ marginTop: '30%' }} /> : friends.length === 0 ? <Text style={{ color: theme.colors.white, alignSelf: 'center', fontSize: 20, marginTop: '30%' }}>No Friends Yet!</Text> : <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%' }}
                        data={friends}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', marginTop: '5%' }}>
                                <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.grey, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', marginRight: '2%', width: '10%' }}>{index + 1}</Text>
                                <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.grey, fontFamily: 'Gilroy-Medium', paddingLeft: '2%' }}>{item.name}</Text>
                            </View>
                        )} />}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between', marginBottom: "5%", alignSelf: 'center' }}>
                    <TouchableOpacity onPress={shareWithOptions} style={{ width: '70%', height: 50, backgroundColor: theme.colors.green, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontFamily: "Gilroy-Medium", color: theme.colors.white }}>Invite Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={copyToClipboard} style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: theme.colors.green, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="copy" size={20} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const Coins = () => {

        const [total, setTotal] = useState(52000);

        return (
            <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.black }}>
                <Text style={{ color: theme.colors.red, textAlign: 'center', width: "90%", fontSize: 16, fontFamily: "Gilroy-SemiBold", marginTop: '4%' }}>Earned from friends</Text>
                <Image source={require('../assets/images/coins.png')} style={{ height: 70, width: 70, marginTop: '5%' }} />
                {loading ? <ActivityIndicator size={"large"} color={theme.colors.green} /> : <Text style={{ fontSize: 20, fontFamily: 'Gilroy-Bold', color: theme.colors.white, marginTop: '3%' }}>{coins && formatNumber(coins)} <Text style={{ color: theme.colors.green, fontFamily: 'Gilroy-Medium' }}>$</Text></Text>}
            </View>
        )
    }

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.black }}>
            <Text style={{ color: theme.colors.white, textAlign: 'center', width: "90%", fontSize: 20, fontFamily: "Gilroy-SemiBold", marginTop: '20%' }}>Invite Friends <Image source={require('../assets/images/friend.png')} style={{ height: 20, width: 20 }} /> & Get Rewards</Text>
            <Text style={{ color: theme.colors.white, textAlign: 'center', width: "90%", fontSize: 14, fontFamily: "Gilroy-Mediums" }}>Invite Friends and get 50 coins for each</Text>
            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors, backgroundColor: theme.colors.grey, height: 50, borderRadius: 12, marginTop: '10%' }}>
                <TouchableOpacity onPress={() => setSelect(1)} style={{
                    width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 1 ? theme.colors.green : theme.colors.grey
                    , height: 50, borderRadius: 12
                }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Gilroy-SemiBold', color: select === 1 ? theme.colors.white : theme.colors.black }}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelect(2)} style={{
                    width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 2 ? theme.colors.green : theme.colors.grey
                    , height: 50, borderRadius: 12
                }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Gilroy-SemiBold', color: select === 2 ? theme.colors.white : theme.colors.black }}>Coins</Text>
                </TouchableOpacity>
            </View>
            {select === 1 && <Friends />}
            {select === 2 && <Coins />}
        </View>
    )
}