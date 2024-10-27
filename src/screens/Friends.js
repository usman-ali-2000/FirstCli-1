import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { formatNumber } from "../assets/Data";

export default function Friends() {

    const [select, setSelect] = useState(1);

    const Friends = () => {
        return (
            <View style={{ width: '80%', flex: 1, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginTop: '5%', width: '100%' }}>
                        <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.green, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', marginRight: '2%', width: '10%', }}>No.</Text>
                        <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.green, fontFamily: 'Gilroy-Medium', paddingLeft: '2%' }}>Name</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '5%' }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", width: '100%' }}>
                            <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.grey, fontFamily: 'Gilroy-SemiBold', paddingLeft: '2%', marginRight: '2%', width: '10%' }}>1</Text>
                            <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.grey, fontFamily: 'Gilroy-Medium', paddingLeft: '2%' }}>Niaz Ahmed</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between', marginBottom: "5%", alignSelf: 'center' }}>
                    <TouchableOpacity style={{ width: '70%', height: 50, backgroundColor: theme.colors.green, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontFamily: "Gilroy-Medium", color: theme.colors.white }}>Invite Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: theme.colors.green, alignItems: 'center', justifyContent: 'center' }}>
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
                <Text style={{ color: theme.colors.red, textAlign: 'center', width: "90%", fontSize: 16, fontFamily: "Gilroy-SemiBold" , marginTop:'4%'}}>Earned from friends</Text>
                <Image source={require('../assets/images/coins.png')} style={{ height: 70, width: 70, marginTop: '5%' }} />
                <Text style={{ fontSize: 20, fontFamily: 'Gilroy-Bold', color: theme.colors.white, marginTop: '3%' }}>{formatNumber(total)} <Text style={{ color: theme.colors.green, fontFamily: 'Gilroy-Medium' }}>$</Text></Text>
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