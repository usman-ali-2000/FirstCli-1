import React, { useState } from "react";
import { Dimensions, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../Theme/GlobalTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";
import Button from "../components/Button";



export default function Deposit({ navigation }) {
    const [select, setSelect] = useState(1);
    const { height, width } = Dimensions.get('window');

    const copyToClipboard = async (text) => {

        const id = await AsyncStorage.getItem("generatedId");
        Clipboard.setString(text);
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    };


    const BinanceData = () => {
        return (
            <View style={{ width: "100%", alignItems: 'center', marginTop: '10%' }}>
                <Text style={{ color: theme.colors.black, fontSize: 22, fontFamily: "Gilroy-Bold" }}>Binance</Text>
                <Image source={require('../assets/images/binanceQr.jpg')} style={{ height: height * 1 / 2.5, width: height * 1 / 2.5 }} />
                <TouchableOpacity onPress={() => copyToClipboard('TVM16PNABgBWiAV9fLJuYCgKwvotborjmR')} style={{ backgroundColor: theme.colors.lightGrey, padding: 10, flexDirection: 'row', alignItems: 'center', width: '90%', borderRadius: 10 }}>
                    <Text style={{ width: '90%', fontSize: 13, color: theme.colors.black }}>TVM16PNABgBWiAV9fLJuYCgKwvotborjmR</Text>
                    <Icon name="copy" size={20} color={theme.colors.darkGrey} />
                </TouchableOpacity>
            </View>
        )
    }
    const OkxData = () => {
        return (
            <View style={{ width: "100%", alignItems: 'center', marginTop: '10%' }}>
                <Text style={{ color: theme.colors.black, fontSize: 22, fontFamily: "Gilroy-Bold" }}>OKX</Text>
                <Image source={require('../assets/images/okxQr.jpg')} style={{ height: height * 1 / 2.5, width: height * 1 / 2.5 }} />
                <TouchableOpacity onPress={() => copyToClipboard('TEy3cLV5SVaF4RJAKzfyspNKoSyDt2vuN8')} style={{ backgroundColor: theme.colors.lightGrey, padding: 10, flexDirection: 'row', alignItems: 'center', width: '90%', borderRadius: 10 }}>
                    <Text style={{ width: '90%', fontSize: 13, color: theme.colors.black }}>TEy3cLV5SVaF4RJAKzfyspNKoSyDt2vuN8</Text>
                    <Icon name="copy" size={20} color={theme.colors.darkGrey} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.white }}>
            <Text style={{ color: theme.colors.black, width: "90%", fontSize: 22, fontFamily: "Gilroy-SemiBold", marginTop: '5%', }}>Deposit</Text>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: '10%' }}>
                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', height: 50, borderRadius: 12, marginTop: '10%', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => setSelect(1)} style={{ width: '45%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 1 ? theme.colors.purple : theme.colors.lightGrey, height: 50, borderRadius: 50 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Gilroy-SemiBold', color: select === 1 ? theme.colors.white : theme.colors.purple }}>Binance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelect(2)} style={{ width: '45%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 2 ? theme.colors.purple : theme.colors.lightGrey, height: 50, borderRadius: 50 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Gilroy-SemiBold', color: select === 2 ? theme.colors.white : theme.colors.purple }}>OKX</Text>
                    </TouchableOpacity>
                </View>
                {select === 1 && <BinanceData />}
                {select === 2 && <OkxData />}
                <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    <Button onPress={() => navigation.navigate('Payment')} backgroundColor={theme.colors.purple} text={"Send Screeshot"} />
                </View>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 16, marginTop: '5%' }}>Deposit instructions</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%' }}>Minimum deposit: $7. Deposits below $7 will not be credited.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%' }}>Deposit currency: Please deposit using Scan or TRC20-USDT . Before transferring, please carefully check the USDT currency you choose to avoid asset loss.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%' }}>Check before making a transfer: Before making a transfer, please double-check the accuracy of the transfer address to ensure that it is correct.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%' }}>Transfer Confirmation: Once the transfer is successful, please wait 5-30 minutes. After that, click on the "I have topped up" button to refresh the page to check your balance.</Text>
            </ScrollView>
        </View>
    )
}