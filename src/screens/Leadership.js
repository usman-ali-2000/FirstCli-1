import React from "react";
import { Image, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";

export default function Leadership() {

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.black }}>
            <Image source={require('../assets/images/friends.png')} style={{ height: 100, width: 100, marginTop: '20%' }} />
            <Text style={{ colors: theme.colors.white, fontSize: 20, color: theme.colors.white, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', marginTop:'5%' }}>Top Contributors</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%', marginTop: '5%' }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.grey, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', marginRight: '2%', width: '10%' }}>1</Text>
                    <Image source={require('../assets/images/friend.png')} style={{ height: 25, width: 25 }} />
                    <Text style={{ colors: theme.colors.white, fontSize: 18, color: theme.colors.grey, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%' }}>Niaz Ahmed</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Image source={require('../assets/images/dollar.gif')} style={{ height: 20, width: 20 }} />
                    <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.grey, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%' }}>200 $</Text>
                </View>
            </View>
        </View>
    )
}