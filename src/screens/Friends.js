import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, Text, ToastAndroid, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BaseUrl, formatNumber } from "../assets/Data";
import Share from 'react-native-share';
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get('window');

export default function Friends() {

    const [select, setSelect] = useState(1);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(null);
    const [assets, setAssets] = useState({});


    const fetchData = async () => {
        try {
            setLoading(true);
            const generatedId = await AsyncStorage.getItem("generatedId");
            const response = await fetch(`${BaseUrl}/register`);
            const response2 = await fetch(`${BaseUrl}/asset`);
            const json = await response.json();
            const json2 = await response2.json();
            const friendData = await json.filter((item) => item.userId === generatedId);
            setAssets(json2?.assets[0]);
            setFriends(friendData);
            console.log('json:', friendData, json2.assets[0]);
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
            const id = await AsyncStorage.getItem("generatedId");
            const result = await Share.open({
                title: 'Check this out!',
                message: `Here is an interesting link for you. with referal id ${id}`,
                url: assets?.appIcon,
                failOnCancel: false, // Prevents throwing an error if the user cancels the share action
            });
            console.log('Shared successfully:', result);
        } catch (error) {
            if (error.message !== 'User did not share') {
                console.error('Error sharing:', error.message);
            }
        }
    };


    const copyToClipboard = async () => {

        const id = await AsyncStorage.getItem("generatedId");
        const textToCopy = `Here is an interesting link ${assets?.appIcon} for you. with referal id ${id}`;
        Clipboard.setString(textToCopy);
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    };





    const Friends = () => {
        return (
            <View style={{ width: '80%', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    {!loading && friends.length !== 0 && <View style={{ flexDirection: 'row', alignItems: "center", marginTop: '5%', width: '100%' }}>
                        <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.purple, fontFamily: 'Gilroy-Bold', paddingLeft: '2%', marginRight: '2%', width: '15%', }}>No.</Text>
                        <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.purple, fontFamily: 'Gilroy-Bold', paddingLeft: '2%', width: '85%' }}>Name</Text>
                    </View>}
                    {loading ? <ActivityIndicator size={"large"} color={theme.colors.purple} style={{ marginTop: '30%' }} /> : friends.length === 0 ? <Text style={{ color: theme.colors.white, alignSelf: 'center', fontSize: 20, marginTop: '30%' }}>No Friends Yet!</Text> : <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ width: '100%' }}
                        data={friends}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', alignItems: "center", width: '100%', marginTop: '5%' }}>
                                <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', marginRight: '2%', width: '15%' }}>{index + 1}</Text>
                                <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', width:'85%' }}>{item.name}</Text>
                            </View>
                        )} />}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: width * 0.6, justifyContent: 'space-between', marginBottom: "5%", alignSelf: 'center', zIndex: 3, position: 'absolute', top: height * 0.50 }}>
                    <LinearGradient colors={[theme.colors.purple, theme.colors.purple, theme.colors.purple,]} style={{ width: '70%', height: 50, borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.white }}>
                        <TouchableOpacity onPress={shareWithOptions}>
                            <Text style={{ fontSize: 20, fontFamily: "Gilroy-Medium", color: theme.colors.white }}>Invite Friends</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient colors={[theme.colors.purple, theme.colors.purple, theme.colors.purple,]} style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: theme.colors.lightyYellow, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.white }}>
                        <TouchableOpacity onPress={copyToClipboard}>
                            <Icon name="copy" size={20} color={theme.colors.white} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        )
    }

    const Coins = () => {
        return (
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <Text style={{ color: theme.colors.red, textAlign: 'center', width: "90%", fontSize: 16, fontFamily: "Gilroy-SemiBold", marginTop: '4%' }}>Earned from friends/referrals</Text>
                <Image source={require('../assets/images/coins.png')} style={{ height: 70, width: 70, marginTop: '5%' }} />
                {loading ? <ActivityIndicator size={"large"} color={theme.colors.purple} /> : <Text style={{ fontSize: 20, fontFamily: 'Gilroy-Bold', color: theme.colors.black, marginTop: '3%' }}>{coins && formatNumber(coins)} <Text style={{ color: theme.colors.purple, fontFamily: 'Gilroy-Medium' }}>$</Text></Text>}
            </View>
        )
    }

    return (
        <LinearGradient colors={[theme.colors.white, theme.colors.white, theme.colors.white,]} style={{ width: '100%', flex: 1 }}>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                <Text style={{ color: theme.colors.black, textAlign: 'center', width: "90%", fontSize: 20, fontFamily: "Gilroy-SemiBold", marginTop: '20%' }}>Invite Friends <Image source={require('../assets/images/friend.png')} style={{ height: 20, width: 20 }} /> & Get Rewards</Text>
                <Text style={{ color: theme.colors.black, textAlign: 'center', width: "90%", fontSize: 14, fontFamily: "Gilroy-Mediums",textDecorationStyle:'solid' }}>Invite Friends and get 50 coins for each</Text>
                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors, backgroundColor: theme.colors.white, height: 50, borderRadius: 12, marginTop: '10%' }}>
                    <TouchableOpacity onPress={() => setSelect(1)} style={{
                        width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 1 ? theme.colors.purple : theme.colors.white, height: 50, borderRadius: 12
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Gilroy-SemiBold', color: select === 1 ? theme.colors.white : theme.colors.purple }}>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelect(2)} style={{
                        width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 2 ? theme.colors.purple : theme.colors.white
                        , height: 50, borderRadius: 12
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Gilroy-SemiBold', color: select === 2 ? theme.colors.white : theme.colors.purple }}>Coins</Text>
                    </TouchableOpacity>
                </View>
                {select === 1 && <Friends />}
                {select === 2 && <Coins />}
            </View>
        </LinearGradient>
    )
}