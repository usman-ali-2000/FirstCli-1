import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Guide({ navigation }) {

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightGrey }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.black} style={{ marginTop: '10%', marginLeft: '5%' }} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.black, fontSize: 18, fontFamily: 'Gilroy-Bold', marginLeft: '5%' }}>Beginner's Guide</Text>
            </View>
            <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 16, marginTop: '5%' }}>Deposit instructions</Text>
            <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%', lineHeight: 18 }}><Text style={{ fontFamily: 'Gilroy-SemiBold' }}>Minimum deposit:</Text> $7. Deposits below $7 will not be credited.</Text>
            <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%', lineHeight: 18 }}><Text style={{ fontFamily: 'Gilroy-SemiBold' }}>Deposit currency:</Text> Please deposit using Scan or TRC20-USDT . Before transferring, please carefully check the USDT currency you choose to avoid asset loss.</Text>
            <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%', lineHeight: 18 }}><Text style={{ fontFamily: 'Gilroy-SemiBold' }}>Check before making a transfer:</Text> Before making a transfer, please double-check the accuracy of the transfer address to ensure that it is correct.</Text>
            <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%', lineHeight: 18 }}><Text style={{ fontFamily: 'Gilroy-SemiBold' }}>Transfer Confirmation:</Text> Once the transfer is successful, please wait 5-30 minutes. After that, click on the "I have topped up" button to refresh the page to check your balance.</Text>
        </View>
    )
}