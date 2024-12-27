import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";
import LoginInput from "../components/LoginInput";
import Button from "../components/Button";

export default function ManageCoin({ navigation, route }) {

    const types = route?.params?.type;

    useEffect(() => {
        console.log('types:', types);
    }, [])

    const Nfuc = () => {
        return (
            <View style={{ width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightPink, marginTop: '30%' }}>
                <LoginInput backgroundColor={theme.colors.lightPink} text="Coins" placeholder="Enter Number of Coins" keyboardType="numeric" />
                <LoginInput backgroundColor={theme.colors.lightPink} text="Receiver email" placeholder="Enter Receiver Email" />
                <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    <Button text="Send" backgroundColor={theme.colors.purple} />
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightPink }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: '5%', backgroundColor: theme.colors.lightPink, borderBottomWidth: 0, borderColor: theme.colors.purple }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={18} color={theme.colors.black} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, marginLeft: '10%' }}>{types}</Text>
            </View>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                {types === 'nfuc' && <Nfuc />}
            </ScrollView>
        </View>
    )
}