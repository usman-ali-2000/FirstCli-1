import React, { useEffect, useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function Working(props) {

    const navigation = useNavigation();

    // const type = route?.params?.type;
    const [price, setPrice] = useState(null);
    const [coins, setCoins] = useState(0);
    // const [modalVisible, setModalVisible] = useState(false);


    const handleNavigation = () => {
        console.log('type:', props.type);
        if (price && coins) {
            navigation.navigate('Payment', { coins: coins, price: price, type: props.type });
        } else {
            ToastAndroid.show("Please Select Option", ToastAndroid.SHORT);
        }
    }

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightPink }}>
            {/* <View style={{ height: 50, width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: '3%', marginLeft: '5%' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.purple} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: 'Gilroy-Bold', color: theme.colors.purple, marginTop: '3%', marginLeft: '30%' }}>Recharge</Text>
            </View> */}
            <View style={{ flex: 1, width: "100%", alignItems: 'center', justifyContent: 'space-between', }}>
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={{ width: "100%", alignItems: 'center' }}>
                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '10%' }}>
                            <TouchableOpacity onPress={() => { setPrice(7); setCoins(100000) }} style={{ padding: "5%", width: '48%', alignItems: 'center', backgroundColor: price === 7 ? 'rgba(128, 0, 128, 0.3)' : 'rgba(255, 255, 255, 0.3)', borderRadius: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                    <Image source={require('../assets/images/crown.png')} style={{ height: 20, width: 20 }} />
                                    <Text style={{ paddingLeft: 5, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, maxWidth: '90%', textAlign: 'center' }}>100,000</Text>
                                </View>
                                <Text style={{ paddingLeft: 5, fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, paddingTop: '5%' }}>$ 7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setPrice(21); setCoins(300000) }} style={{ padding: "5%", width: '48%', alignItems: 'center', backgroundColor: price === 21 ? 'rgba(128, 0, 128, 0.3)' : 'rgba(255, 255, 255, 0.3)', borderRadius: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                    <Image source={require('../assets/images/crown.png')} style={{ height: 20, width: 20 }} />
                                    <Text style={{ paddingLeft: 5, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, maxWidth: '90%', textAlign: 'center' }}>300,000</Text>
                                </View>
                                <Text style={{ paddingLeft: 5, fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, paddingTop: '5%' }}>$ 21</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '5%' }}>
                            <TouchableOpacity onPress={() => { setPrice(63); setCoins(900000) }} style={{ padding: "5%", width: '48%', alignItems: 'center', backgroundColor: price === 63 ? 'rgba(128, 0, 128, 0.3)' : 'rgba(255, 255, 255, 0.3)', borderRadius: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                    <Image source={require('../assets/images/crown.png')} style={{ height: 20, width: 20 }} />
                                    <Text style={{ paddingLeft: 5, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, maxWidth: '90%', textAlign: 'center' }}>900,000</Text>
                                </View>
                                <Text style={{ paddingLeft: 5, fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, paddingTop: '5%' }}>$ 63</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setPrice(189); setCoins(2700000) }} style={{ padding: "5%", width: '48%', alignItems: 'center', backgroundColor: price === 189 ? 'rgba(128, 0, 128, 0.3)' : 'rgba(255, 255, 255, 0.3)', borderRadius: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                    <Image source={require('../assets/images/crown.png')} style={{ height: 20, width: 20 }} />
                                    <Text style={{ paddingLeft: 5, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, maxWidth: '90%', textAlign: 'center' }}>2,700,000</Text>
                                </View>
                                <Text style={{ paddingLeft: 5, fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, paddingTop: '5%' }}>$ 189</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '5%' }}>
                            <TouchableOpacity onPress={() => { setPrice(567); setCoins(8100000) }} style={{ padding: "5%", width: '48%', alignItems: 'center', backgroundColor: price === 567 ? 'rgba(128, 0, 128, 0.3)' : 'rgba(255, 255, 255, 0.3)', borderRadius: 15 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                    <Image source={require('../assets/images/crown.png')} style={{ height: 20, width: 20 }} />
                                    <Text style={{ paddingLeft: 5, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, maxWidth: '90%', textAlign: 'center' }}>8,100,000</Text>
                                </View>
                                <Text style={{ paddingLeft: 5, fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, paddingTop: '5%' }}>$ 567</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: "20%", width: '100%', alignItems: 'center' }}>
                        <Button backgroundColor={theme.colors.purple} text="Recharge" onPress={() => {
                            handleNavigation();
                        }} />
                    </View>
                </ScrollView>
            </View>
            {/* <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // handleBackButton();
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ flex: 1, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: theme.colors.lightPink, height: '50%', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                    </View>
                </Pressable>
            </Modal> */}
        </View>
    )
}