import React, { useState } from "react";
import { View, Text, Image, Pressable, ToastAndroid } from "react-native";
import { StyleSheet } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { BaseUrl, formatNumber } from "../assets/Data";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";


const HomeHeader = (props) => {

    const [unseen, setUnseen] = useState(0);

    const fetchNotification = async () => {
        try {
            const id = await AsyncStorage.getItem('generatedId');
            const response = await fetch(`${BaseUrl}/notification/${id}`);
            const json = await response.json();
            const notiNum = await json.filter((item) => item.seen === false);
            setUnseen(notiNum.length);
            // console.log('json:', notiNum.length);
        } catch (e) {
            console.log('error fetching data', e);
        }
    }
    useEffect(() => {
        fetchNotification()
    }, [unseen]);


    const copyToClipboard = async () => {
        const textToCopy = `${props?.generatedId}`;
        Clipboard.setString(textToCopy);
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor:theme.colors.lightGrey, paddingLeft:'2%', paddingRight:'5%', }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={props.onpress} style={{ borderWidth: 3, borderColor: theme.colors.purple, borderRadius: 100, flexDirection: 'row' }}>
                    <Image style={styles.arrow} source={require('../assets/images/user.png')} />
                </TouchableOpacity>
                <View style={{ marginLeft: '2%', marginTop: '2%' }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Gilroy-Bold', color: theme.colors.black }}>{props.name}</Text>
                    <TouchableOpacity onPress={() => copyToClipboard('abcdef')} style={{ flexDirection: 'row', alignItems: 'center', marginTop: '1%', width: '90%' }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, }}>ID: {props?.generatedId}</Text>
                        <Icon name="copy" size={14} color={theme.colors.darkGrey} style={{ marginLeft: '3%' }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.purple }}>Level {props?.accType === 'fresh' ? 0 : props?.accType === 'working' ? 'A' : 'B'}</Text>
                </View>
                <Icon name="check-circle" size={20} color={theme.colors.purple} style={{ marginLeft: "2%", marginTop: '3%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: "flex-end", marginTop: '3%' }}>
                <TouchableOpacity onPress={props.rightPress}>
                    {unseen > 0 && <View style={styles.numberContainer}>
                        <Text style={styles.number}>{unseen}</Text>
                    </View>}
                    <Icon name="bell" size={24} color={theme.colors.yellow} style={{ marginLeft: '3%' }} />
                </TouchableOpacity>
                {/* <TouchableOpacity
                <TouchableOpacity onPress={props.rightPress} style={{ marginRight: '5%', backgroundColor: theme.colors.white, padding: 5, borderRadius: 5, width: 60 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Image source={require('../assets/images/crown.png')} style={{ height: 10, width: 10 }} />
                        <Text style={{ color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', fontSize: 10, }}>nfuc</Text>
                    </View>
                    <Text style={{ color: theme.colors.black, fontFamily: 'Gilroy-Bold', fontSize: 12, textAlign: 'center', width: '100%' }}>{props.nfuc}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={props.rightPress} style={{ marginRight: '5%' }}>
                    <Image source={require('../assets/images/wallet.png')} style={{ height: 30, width: 30 }} />
                </TouchableOpacity> */}
                {/* <Image source={require('../assets/images/dollar.gif')} style={{ height: 20, width: 20, marginRight: '3%' }} />
                <Text style={{ fontSize: 20, color: theme.colors.white, fontFamily: 'Gilroy-SemiBold' }}>{props.coin && formatNumber(props.coin)}</Text> */}
            </View>
        </View>
    )
}
export default HomeHeader;


const styles = StyleSheet.create({
    container: {
        width: '70%',
        flexDirection: 'row',
        // justifyContent:'space-between',
        alignItems: 'flex-start',
        padding: 10,
        elevation: 5,
        marginTop: '3%'
    },
    arrow: {
        height: 48,
        width: 48,
        borderRadius: 100,
        margin: 4
    },
    text: {
        width: '80%',
        textAlign: 'center',
        marginRight: '10%',
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    numberContainer: {
        height: 14,
        width: 14,
        backgroundColor: theme.colors.purple,
        color: theme.colors.white,
        borderRadius: 13,
        position: 'absolute',
        zIndex: 2,
        marginLeft: 15,
        alignItems: 'center'
    },
    number: {
        fontSize: 6,
        textAlign: 'center',
        fontFamily: 'Gilroy-Regular',
        color: theme.colors.white,
        paddingTop: 2,
        paddingLeft: 2
    }
})