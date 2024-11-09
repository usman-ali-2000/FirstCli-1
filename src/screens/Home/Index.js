import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Pressable, ScrollView, Text, ToastAndroid, View } from "react-native";
import Styles from "./Style";
import FlatItem from "../../components/FlatItem/Index";
import { addAttempt, BaseUrl, getCurrentDate, offerData } from "../../assets/Data";
import SnakeGame from "../SnakeGame";
import { TouchableOpacity } from "react-native";
import theme from "../../Theme/GlobalTheme";
import FastImage from "react-native-fast-image";
import HomeHeader from "../../components/HomeHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentPosition } from "react-native-geolocation-service";
import Icon from "react-native-vector-icons/FontAwesome";
import NetInfo from '@react-native-community/netinfo';
import ImageSlider from "react-native-image-slider";

const Home = ({ navigation }) => {

    const [column, setColumn] = useState(2);
    const [data1, setData1] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [isConnected, setIsConnected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(null);
    const [position, setPosition] = useState(0);

    const fetchData = async () => {
        const id = await AsyncStorage.getItem("id");
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/register/${id}`);
            const json = await response.json();
            const date = getCurrentDate();
            console.log('json:', json.attempts, json.date, json.referCoin, `${date.day}/${date.month}/${date.year}`);
            setCoins(json.coin + json.referCoin);
            setAttempts(json.attempts);
            const formattedDate = `${date.day}/${date.month}/${date.year}`;
            if (json.date !== formattedDate) {
                console.log('json.date:', json.date, formattedDate, json.date === formattedDate);
                addAttempt(0, `${date.day}/${date.month}/${date.year}`);
            }
            const userId = await AsyncStorage.getItem("userId");
            console.log('id:', id);
            setData1(json);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log('error fetching...', e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const move = (index) => {
        const newPosition = index >= offerData.length ? 0 : index;
        setPosition(newPosition);
    };

    const renderItem = ({ item }) => (
        <View style={Styles.flatcontainer}>
            <FlatItem
                image={item.imageUrl}
                heading={item.category}
                onPress={() => navigation.navigate('ProductView', { category: item.category })}
            // text={item.text}
            // lastupdate={item.lastupdate}
            // onpress={() => handleLearnMore()}
            />
        </View>
    );

    const handleLearnMore = () => {
        navigation.navigate('Detail');
    }

    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
            console.log("Connection type:", state.type);
            console.log("Is connected?", state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);


    const handlePlay = async () => {
        if (isConnected) {
            await fetchData();
            await navigation.navigate('Game', { attempt: attempts });
        } else {
            ToastAndroid.show('internet not connected!', ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        // console.log('data:', Data);
    }, [])

    return (
        <View style={Styles.container}>
            <HomeHeader onpress={() => navigation.openDrawer()} coin={coins} />
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                {/* <Text style={{ fontSize: 40, color: theme.colors.red, fontFamily: 'Gilroy-Bold', alignSelf: 'center', marginTop: '30%' }}>Play Now!</Text> */}
                <View style={{ width: '100%', paddingRight: '5%', height: 130, marginTop: '10%' }}>
                    <ImageSlider
                        loopBothSides
                        images={offerData}
                        position={position}
                        onPositionChanged={setPosition}
                        customSlide={({ index, item }) => (
                            <View key={index} style={Styles.slide}>
                                <Image source={item} style={Styles.image} resizeMode="cover" />
                            </View>
                        )}
                        customButtons={(position) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between' }}>
                                {offerData.map((image, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        underlayColor="#ccc"
                                        onPress={() => move(index)}
                                        style={[
                                            {
                                                backgroundColor: position === index ? theme.colors.green : theme.colors.grey,
                                                marginTop: '2%',
                                                height: position === index ? 8 : 6,
                                                width: position === index ? 15 : 6,
                                                borderRadius: 5,
                                                margin: 5,
                                            },
                                        ]}
                                    />
                                ))}
                            </View>
                        )}
                    />
                </View>
                <Text style={{ color: theme.colors.grey, padding: 5, alignSelf: 'center', fontSize: 18, fontFamily: 'Gilroy-Bold', backgroundColor: 'rgba(0, 0, 0, 0.5)', elevation: 5, width: '90%', marginTop: '10%' }}>Community</Text>
                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginTop: '5%' }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: theme.colors.green, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Icon name="facebook" size={28} color={theme.colors.white} />
                        </TouchableOpacity>
                        <Text style={{ color: theme.colors.white, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Facebook</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: theme.colors.green, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Icon name="whatsapp" size={28} color={theme.colors.white} />
                        </View>
                        <Text style={{ color: theme.colors.white, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: theme.colors.green, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Icon name="instagram" size={28} color={theme.colors.white} />
                        </View>
                        <Text style={{ color: theme.colors.white, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Instagram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: theme.colors.green, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Icon name="twitter" size={28} color={theme.colors.white} />
                        </View>
                        <Text style={{ color: theme.colors.white, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Twitter</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginTop: '5%' }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ backgroundColor: theme.colors.green, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Icon name="facebook" size={28} color={theme.colors.white} />
                        </TouchableOpacity>
                        <Text style={{ color: theme.colors.white, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Facebook</Text>
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: theme.colors.green, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Icon name="whatsapp" size={28} color={theme.colors.white} />
                        </View>
                        <Text style={{ color: theme.colors.white, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: theme.colors.green, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Icon name="instagram" size={28} color={theme.colors.white} />
                        </View>
                        <Text style={{ color: theme.colors.white, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Instagram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <View style={{ backgroundColor: theme.colors.green, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                            <Icon name="twitter" size={28} color={theme.colors.white} />
                        </View>
                        <Text style={{ color: theme.colors.white, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Twitter</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', marginTop: '15%', }}>
                    {/* <FastImage source={require('../../assets/images/icon.gif')} style={{ height: 100, width: 100, alignSelf: 'center' }} /> */}
                    {loading || !isConnected ? <ActivityIndicator size={"large"} color={theme.colors.green} /> : <TouchableOpacity onPress={handlePlay} style={{ alignSelf: 'center', backgroundColor: theme.colors.green, height: 80, width: 80, borderRadius: 100, alignItems: 'center', justifyContent: 'space-evenly', elevation: 5, flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon name="gamepad" size={38} color={theme.colors.white} />
                            <Text style={{ fontSize: 12, color: theme.colors.white, fontFamily: 'Gilroy-SemiBold' }}>Play</Text>
                            {/* <Text style={{ fontSize: 10, color: theme.colors.white, fontFamily: 'Gilroy-SemiBold' }}>Game</Text> */}
                        </View>
                    </TouchableOpacity>}
                </View>
            </ScrollView>
        </View>
    )
}

export default Home;