import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";
import LoginInput from "../components/LoginInput";
import Button from "../components/Button";
import { decrementNfuc, incrementNfuc, transferNfuc } from "../assets/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ManageCoin({ navigation, route }) {

    const types = route?.params?.type;

    const [generatedId, setGeneratedId] = useState(null);

    const getId = async () => {
        const generated = await AsyncStorage.getItem("generatedId");
        console.log('generated:', generated);
        setGeneratedId(generated);
    }

    useEffect(() => {
        getId();
        console.log('types:', types);
    }, [])

    const Nfuc = () => {

        const [coins, setCoins] = useState(null);
        const [id, setId] = useState(null);
        const [loading, setLoading] = useState(false);


        const handleSend = async () => {
            if (coins && id && generatedId) {
              setLoading(true);
              try {
                await transferNfuc(generatedId, id, Number(coins));
                console.log('id & coins:', id, Number(coins), generatedId);
                setCoins(null);
                setId(null);
              } catch (error) {
                console.error('Error during transfer:', error);
              } finally {
                setLoading(false);
              }
            } else {
              console.log('Missing required data');
            }
          };

        return (
            <View style={{ width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightPink, marginTop: '30%' }}>
                <LoginInput backgroundColor={theme.colors.white} text="Coins" placeholder="Enter Number of Coins" keyboardType="numeric" value={coins} onChangeText={(item) => setCoins(item)}  />
                <LoginInput backgroundColor={theme.colors.white} text="Receiver ID" placeholder="Enter Receiver ID" value={id} onChangeText={(item) => setId(item)} />
                <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    {loading ? <ActivityIndicator color={theme.colors.purple} /> : <Button text="Send" backgroundColor={theme.colors.purple} onPress={handleSend} />}
                </View>
            </View>
        )
    }

    const Wx = () => {
        return (
            <View style={{ width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightPink, marginTop: '60%' }}>
                <Text style={{ color: theme.colors.black, fontSize: 18, fontFamily: 'Gilroy-SemiBold' }}>Coming Soon!</Text>
            </View>
        )
    }

    const Usdt = () => {
        return (
            <View style={{ width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightPink, marginTop: '30%' }}>
                <LoginInput backgroundColor={theme.colors.white} text="Coins" placeholder="Enter Number of Coins" keyboardType="numeric" />
                <LoginInput backgroundColor={theme.colors.white} text="Receiver email" placeholder="Enter Receiver Email" />
                <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    <Button text="Withdraw" backgroundColor={theme.colors.purple} />
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
                {types === 'wx' && <Wx />}
                {types === 'usdt' && <Usdt />}
            </ScrollView>
        </View>
    )
}