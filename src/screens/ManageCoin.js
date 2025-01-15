import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";
import LoginInput from "../components/LoginInput";
import Button from "../components/Button";
import { decrementNfuc, fetchData, incrementNfuc, sendEmail, sendNotification, transferNfuc, withdraw } from "../assets/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/CustomAlert";
import CollapsableView from "../components/CollapsableView/Index";

export default function ManageCoin({ navigation, route }) {

    const types = route?.params?.type;

    const [generatedId, setGeneratedId] = useState(null);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    const getId = async () => {
        const generated = await AsyncStorage.getItem("generatedId");
        console.log('generated:', generated);
        setGeneratedId(generated);
        const data = await fetchData();
        setUserData(data);
        console.log(data);
    }

    useEffect(() => {
        getId();
        console.log('types:', types);
    }, [])

    const Nfuc = () => {

        const [coins, setCoins] = useState(null);
        const [id, setId] = useState(null);
        const [loading, setLoading] = useState(false);
        const [showAlert, setShowAlert] = useState(false);

        // receiverId, heading, subHeading, path, seen

        const handleSend = async () => {
            if (coins && id && generatedId) {
                setLoading(true);
                try {
                    const transfer = await transferNfuc(generatedId, id, Number(coins));
                    if (transfer) {
                        await sendNotification(id, 'You have received coins', `you have received ${coins}`, 'Wallet');
                        console.log('id & coins:', id, Number(coins), generatedId);
                        setCoins(null);
                        setId(null);
                    } else {
                        ToastAndroid.show('error transfer...', ToastAndroid.SHORT);
                    }
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
                <LoginInput backgroundColor={theme.colors.white} text="Coins" placeholder="Enter Number of Coins" keyboardType="numeric" value={coins} onChangeText={(item) => setCoins(item)} />
                <LoginInput backgroundColor={theme.colors.white} text="Receiver ID" placeholder="Enter Receiver ID" value={id} onChangeText={(item) => setId(item)} />
                <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    {loading ? <ActivityIndicator color={theme.colors.purple} /> : <Button text="Send" backgroundColor={theme.colors.purple} onPress={() => setShowAlert(true)} />}
                </View>
                <CustomAlert
                    title="Send Nfuc"
                    message="Are sure to send nfuc"
                    visible={showAlert}
                    onCancel={() => setShowAlert(false)}
                    onConfirm={handleSend}
                />
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

        const [amount, setAmount] = useState(null);
        const [loading, setLoading] = useState(false);
        const [address, setAddress] = useState(null);
        const [isCollapsed, setIsCollapsed] = useState(false);
        const [selected, setSelected] = useState('');

        const handleSend = async () => {

            if (amount > userData.usdt) {
                ToastAndroid.show("Insufficient amount", ToastAndroid.SHORT);
                return;
            }
            if (generatedId && amount > 0 && amount <= userData.usdt) {
                setLoading(true);
                try {
                    const success = await withdraw(generatedId, 'wingedx-admin', Number(amount), address, selected);
                    if (success) {
                        await sendNotification('wingedx-admin', 'You have withdraw request', `you have received withdraw request for ${amount} $`, 'Withdraw');
                        await sendEmail('wingedxnetwork@gmail.com', 'Withdraw Request', `you have withdraw request ${amount} $`);
                        console.log('id & coins:', Number(amount), generatedId);
                        setAddress('');
                        setAmount(null);
                    }
                } catch (error) {
                    console.error('Error during transfer:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                ToastAndroid.show("Missing required data", ToastAndroid.SHORT);
                console.log('Missing required data');
            }
        };

        return (
            <View style={{ width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightPink, marginTop: '30%' }}>
                <LoginInput backgroundColor={theme.colors.white} text="Amount" placeholder="Enter Amount in $" keyboardType="numeric" value={amount} onChangeText={(txt) => setAmount(txt)} />
                <Text style={{ fontSize: 12, fontFamily: 'Gilroy-SemiBold', color: theme.colors.jetBlack, marginTop: '4%', width: '88%' }}>Select Account</Text>
                <CollapsableView
                    question="Select Account"
                    answer={['Binance', 'OKX']}
                    collapsed={isCollapsed}
                    selected={selected}
                    onSelect={(value) => {
                        setSelected(value); // Update selected value
                        setIsCollapsed(true); // Close the dropdown
                    }}
                    onPress={() => setIsCollapsed(!isCollapsed)}
                    arrowIcon={
                        <Icon
                            name={isCollapsed ? 'chevron-down' : 'chevron-up'}
                            size={12}
                            color="black"
                            style={{ marginRight: '5%' }}
                        />
                    }
                    style={{ width: '100%', height: 45, alignItems: 'center' }}
                />
                <LoginInput backgroundColor={theme.colors.white} text="Address" placeholder="Enter address" value={address} onChangeText={(txt) => setAddress(txt)} />
                {loading ? <ActivityIndicator color={theme.colors.purple} /> : <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    <Button text="Withdraw" backgroundColor={theme.colors.purple} onPress={handleSend} />
                </View>}
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
                {/* {types === 'nfuc' && <Nfuc />}
                {types === 'wx' && <Wx />}
                {types === 'usdt' && <Usdt />} */}
                <Text style={{ fontSize: 18, fontFamily: 'Gilroy-Bold', color: theme.colors.purple, marginTop: '70%' }}>Coming Up on</Text>
                <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, marginTop: '2%' }}>22 Jan, 2025</Text>
            </ScrollView>
        </View>
    )
}