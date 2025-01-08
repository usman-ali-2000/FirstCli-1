import React, { useEffect, useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { BaseUrl, planData } from "../assets/Data";
import LinearGradient from "react-native-linear-gradient";
import CustomAlert from "../components/CustomAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import { useEvent } from "react-native-reanimated";

export default function Working(props) {

    const navigation = useNavigation();

    // const type = route?.params?.type;
    const [price, setPrice] = useState(null);
    const [coins, setCoins] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const handleNavigation = () => {
        console.log('type:', props.type);
        if (price && coins) {
            navigation.navigate('Payment', { coins: coins, price: price, type: props.type });
        } else {
            ToastAndroid.show("Please Select Option", ToastAndroid.SHORT);
        }
    }

    const handleConfirm = async () => {

        setLoading(true);
        const id = await AsyncStorage.getItem("id");
        const userId = await AsyncStorage.getItem("userId");

        if (!id) {
            ToastAndroid.show("error in buying nfuc", ToastAndroid.SHORT);
            return;
        }
        let acctype = null;
        if (props.type === 'working') {
            acctype = 'working'
        } else if (props.type === 'non-working') {
            acctype = 'non-working'
        } else {
            acctype = 'fresh'
        }
        try {
            const response = await fetch(`${BaseUrl}/register/dollarToNfuc/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    coins: coins,
                    amount: price,
                    accType: acctype,
                    referid: userId,
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Coins added successfully:", data);
                // ToastAndroid.show("nfuc added successfully", ToastAndroid.SHORT);
                setModalVisible(true);
            } else if (response.status === 400) {
                ToastAndroid.show("insufficient balance", ToastAndroid.SHORT);
            } else if (response.status === 404) {
                ToastAndroid.show("user not found", ToastAndroid.SHORT);
            }
            else {
                const errorData = await response.json();
                console.error("Failed to add coins:", errorData);
                ToastAndroid.show("error buying nfuc", ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log('error buying nfuc', e);
            ToastAndroid.show("error buying nfuc", ToastAndroid.SHORT);
        } finally {
            setShowAlert(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setModalVisible(false);
        }, ((3000)));
    }, [modalVisible])

    const handleAlert = (price, coins) => {
        setShowAlert(!showAlert);
        setPrice(price);
        setCoins(coins);
    }

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.white }}>
            <View style={{ flex: 1, width: "100%", alignItems: 'center', justifyContent: 'space-between', }}>
                <View style={{ width: "100%", alignItems: 'center' }}>
                    {planData.map((item) => (
                        <TouchableOpacity onPress={() => { handleAlert(item.amount, item.coins); }} style={{ width: '100%', alignItems: 'center' }}>
                            <LinearGradient colors={['skyblue', theme.colors.blue]}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0 }}
                                style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.colors.purple, padding: '8%', borderRadius: 20, marginTop: '5%' }}>
                                <View style={{ width: '48%', alignItems: 'flex-start' }}>
                                    <Text style={{ fontSize: 16, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, lineHeight: 20, textAlign: 'left' }}>Nfuc: {item.coins}</Text>
                                    <Text style={{ fontSize: 16, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, lineHeight: 20, textAlign: 'left' }}>The amount staked: ${item.amount}</Text>
                                    <View style={{ padding: 10, borderRadius: 100, backgroundColor: theme.colors.lightBlue, marginTop: 10 }}>
                                        <Text style={{ color: theme.colors.white, fontSize: 14, fontFamily: 'Gilroy-SemiBold' }}>Buy Now</Text>
                                    </View>
                                </View>
                                <View style={{ width: '48%', alignItems: 'center' }}>
                                    <Image source={require('../assets/images/robot.png')} style={{ height: 80, width: 80 }} />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ marginTop: "5%", width: '100%', alignItems: 'center' }}>
                    <Button backgroundColor={theme.colors.lightBlue} text="Recharge" onPress={() => {
                        handleNavigation();
                    }} />
                </View>
            </View>
            <CustomAlert
                visible={showAlert}
                onCancel={() => setShowAlert(false)}
                title={`Amount ${price}$`}
                message={`Are you sure to buy ${coins} Nfuc`}
                onConfirm={handleConfirm}
                loading={loading}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flex: 1, width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '80%', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.colors.white, borderRadius: 30, padding: '5%', paddingTop: '15%', paddingBottom: '15%' }}>
                        <FastImage source={require('../assets/images/tick.gif')} style={{ height: 100, width: 100 }} />
                        <Text style={{ fontSize: 20, fontFamily: 'Gilroy-Bold', color: theme.colors.black }}>Success</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}