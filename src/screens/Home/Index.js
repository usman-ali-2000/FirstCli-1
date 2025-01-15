import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Pressable, RefreshControl, ScrollView, Text, ToastAndroid, View } from "react-native";
import Styles from "./Style";
import FlatItem from "../../components/FlatItem/Index";
import { addAttempt, BaseUrl, formatNumber, getCurrentDate, NfucMenu, openLink, UsdtMenu, WxMenu } from "../../assets/Data";
import SnakeGame from "../SnakeGame";
import { TouchableOpacity } from "react-native";
import theme from "../../Theme/GlobalTheme";
import FastImage from "react-native-fast-image";
import HomeHeader from "../../components/HomeHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentPosition } from "react-native-geolocation-service";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import NetInfo from '@react-native-community/netinfo';
import ImageSlider from "react-native-image-slider";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import CustomAlert from "../../components/CustomAlert";
import CircularProgress from "../../components/CircularProgress";

const Home = ({ navigation }) => {

    const [column, setColumn] = useState(2);
    const [data1, setData1] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [isConnected, setIsConnected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [coins, setCoins] = useState(null);
    const [position, setPosition] = useState(0);
    const [name, setName] = useState('');
    const [links, setLinks] = useState({});
    const [bannerData, setBannerData] = useState([]);
    const [nfuc, setNfuc] = useState(0);
    const [usdt, setUsdt] = useState(0);
    const [accType, setAccType] = useState(null);
    const [generatedId, setGeneratedId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [logoutAlert, setLogoutAlert] = useState(false);
    const [versionAlert, setVersionAlert] = useState(false);
    const [openMenu, setOpenMenu] = useState({
        m1: false,
        m2: false,
        m3: false,
    })

    const targetDate = new Date("2025-02-28T00:00:00");

    const calculateRemainingTime = () => {
        const now = new Date().getTime();
        const target = targetDate.getTime();
        return target - now;
    };

    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(calculateRemainingTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));


    const fetchLink = async () => {
        try {
            const response = await fetch(`${BaseUrl}/asset`);
            // const response2 = await fetch(`${BaseUrl}/banner`);
            const jsondata = await response.json();
            // const json = await response2.json();
            // setBannerData(json.banners);
            setLinks(jsondata.assets[0]);
            if (jsondata.assets[0].version !== 1) {
                setVersionAlert(true);
            }
            console.log('data:', jsondata.assets[0]);
        } catch (e) {
            console.log('error fetching links...', e);
        }
    }

    const fetchData = async () => {
        const id = await AsyncStorage.getItem("id");
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/register/${id}`);
            const json = await response.json();
            const date = getCurrentDate();
            console.log('json:', json.name, json.attempts, json.date, json.referCoin, `${date.day}/${date.month}/${date.year}`);
            setCoins(formatNumber(json.coin + json.referCoin));
            setAttempts(json.attempts);
            setNfuc(formatNumber(json.nfuc + json.nfucRefer));
            setUsdt(formatNumber(json.usdt + json.usdtRefer));
            setName(json.name);
            setAccType(json.accType);
            setGeneratedId(json.generatedId);
            const formattedDate = `${date.day}/${date.month}/${date.year}`;
            if (json.date !== formattedDate) {
                console.log('json.date:', json.date, formattedDate, json.date === formattedDate);
                addAttempt(0, `${date.day}/${date.month}/${date.year}`);
            }
            const userId = await AsyncStorage.getItem("userId");
            // console.log('id:', id, json.nfucRefer );
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

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    useEffect(() => {
        fetchLink();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); // Show the refresh spinner
        setTimeout(() => {
            fetchData();
            setRefreshing(false); // Hide the refresh spinner
        }, 2000); // Simulate a network request delay
    };


    const move = (index) => {
        const newPosition = index >= bannerData?.length ? 0 : index;
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


    return (
        <LinearGradient colors={[theme.colors.lightGrey, theme.colors.lightGrey, theme.colors.lightGrey,]} style={{ width: '100%', flex: 1 }}>
            <View style={Styles.container}>
                <HomeHeader
                    onpress={() => navigation.openDrawer()}
                    rightPress={() => navigation.navigate('Notification')}
                    accType={accType}
                    name={name}
                    coin={coins}
                    generatedId={generatedId} />
                <ScrollView style={{ width: '100%', backgroundColor: 'transparent' }} contentContainerStyle={{ alignItems: 'center' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.purple} colors={[theme.colors.lightGrey, theme.colors.darkGrey, theme.colors.purple]} />}>
                    <LinearGradient colors={[theme.colors.purple, '#662d91']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0 }}
                        style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.colors.purple, padding: '8%', borderRadius: 10, marginTop: '5%' }}>
                        <View style={{ width: '48%', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.white, lineHeight: 30, textAlign: 'left' }}>Available </Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.white, lineHeight: 30, textAlign: 'left' }}>USDT:</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.white, lineHeight: 30 }}>{usdt}</Text>
                        </View>
                        <View style={{ width: '48%', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.white, lineHeight: 30, textAlign: 'left' }}>Available </Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.white, lineHeight: 30, textAlign: 'left' }}>NFUC:</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.white, lineHeight: 30 }}>{nfuc}</Text>
                        </View>
                    </LinearGradient>
                    <View style={{ width: '90%', alignItems: 'center', backgroundColor: theme.colors.white, marginTop: '5%', paddingBottom: '5%', borderRadius: 6, elevation: 5 }}>
                        <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Bold', color: theme.colors.black, marginTop: '5%', width: '90%' }}>Nfuc having countdown</Text>
                        <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '5%' }}>
                            <CircularProgress size={60} progress={days} totalProgress={45} color={theme.colors.purple} total={'days'} backgroundColor="#d3d3d3" strokeWidth={6} />
                            <CircularProgress size={60} progress={hours} totalProgress={24} color={theme.colors.green} total={'hrs'} backgroundColor="#d3d3d3" strokeWidth={6} />
                            <CircularProgress size={60} progress={minutes} totalProgress={60} color={theme.colors.darkYellow} total={'mins'} backgroundColor="#d3d3d3" strokeWidth={6} />
                        </View>
                    </View>
                    {/* {bannerData?.length > 0 ? <View style={{ width: '95%', paddingRight: '2%', height: 130, backgroundColor: theme.colors.lightGrey, marginTop: '5%' }}>
                        <ImageSlider
                            // autoPlayWithInterval={5000}
                            loopBothSides={false}
                            images={bannerData.length > 0 ? bannerData : []}
                            position={position}
                            onPositionChanged={setPosition}
                            customSlide={({ index, item }) => (
                                <View key={index} style={Styles.slide}>
                                    <Image source={{ uri: item?.banner }} style={Styles.image} resizeMode="cover" />
                                </View>
                            )}
                            customButtons={() => (
                                <View style={{ height: 0, width: 0 }} />
                            )}
                        // customButtons={(position) => (
                        //     <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between' }}>
                        //         {bannerData?.map((image, index) => (
                        //             <TouchableOpacity
                        //                 key={index}
                        //                 onPress={() => move(index)}
                        //                 style={[{
                        //                     backgroundColor: position === index ? theme.colors.purple : theme.colors.white,
                        //                     marginTop: '2%',
                        //                     height: position === index ? 8 : 6,
                        //                     width: position === index ? 15 : 6,
                        //                     borderRadius: 5,
                        //                     margin: 5,
                        //                 }]}
                        //             />
                        //         ))}
                        //     </View>
                        // )}
                        />
                    </View> : <View style={{ width: '100%', height: 130, alignItems: 'center', justifyContent: 'center', marginBottom: '5%' }}><ActivityIndicator color={theme.colors.purple} /></View>} */}
                    <View style={{ width: "90%", alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: "3%", }}>
                        <View style={{ width: '48%' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Deposit')} style={{ marginRight: '5%', backgroundColor: theme.colors.white, padding: '7%', borderRadius: 10, width: '100%', flexDirection: 'row', alignItems: 'center', elevation: 2 }}>
                                <Image source={require('../../assets/images/deposit.png')} style={{ height: 40, width: 40 }} />
                                <Text style={{ color: theme.colors.black, fontFamily: 'Gilroy-Bold', fontSize: 16, textAlign: 'center', width: '60%' }}>Deposit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '48%' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageCoin', { type: 'usdt' })} style={{ marginRight: '5%', backgroundColor: theme.colors.white, padding: '7%', borderRadius: 10, width: '100%', flexDirection: 'row', alignItems: 'center', elevation: 2 }}>
                                <Image source={require('../../assets/images/payout.png')} style={{ height: 40, width: 40 }} />
                                <Text style={{ color: theme.colors.black, fontFamily: 'Gilroy-Bold', fontSize: 16, textAlign: 'center', width: '60%' }}>Payout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ color: theme.colors.purple, padding: 5, alignSelf: 'center', fontSize: 18, fontFamily: 'Gilroy-Bold', backgroundColor: 'rgba(0, 0, 0, 0)', width: '90%', marginTop: '5%' }}>Basic Tools</Text>
                    <View style={{ width: '90%', alignItems: 'center', backgroundColor: theme.colors.white, padding: '5%', borderRadius: 10, marginTop: '5%', elevation: 0, marginBottom: '0%' }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginTop: '5%' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={{ alignItems: 'center', width: '30%' }}>
                                <View style={{ backgroundColor: 'orange', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5 }}>
                                    <Icon name="bell" size={22} color={theme.colors.white} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Notification</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Help')} style={{ alignItems: 'center', width: '30%' }}>
                                <View style={{ backgroundColor: theme.colors.blue, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5 }}>
                                    <Icon name="support" size={20} color={theme.colors.white} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold', textAlign: 'center' }}>Customer Service</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('Guide') }} style={{ alignItems: 'center', width: '30%' }}>
                                <View style={{ backgroundColor: 'rgb(222, 49, 99)', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5 }}>
                                    <Icon name="book" size={20} color={theme.colors.white} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold', textAlign: 'center' }}>Beginners Guide</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginTop: '5%' }}>
                            <TouchableOpacity onPress={() => { navigation.navigate('AboutUs') }} style={{ alignItems: 'center', width: '30%' }}>
                                <View style={{ backgroundColor: theme.colors.green, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5 }}>
                                    <MaterialIcon name="info" size={22} color={theme.colors.white} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>About Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Task')} style={{ alignItems: 'center', width: '30%' }}>
                                <View style={{ backgroundColor: theme.colors.purple, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5 }}>
                                    <MaterialIcon name="article" size={20} color={theme.colors.white} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Task</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Friends')} style={{ alignItems: 'center', width: '30%' }}>
                                <View style={{ backgroundColor: theme.colors.darkGrey, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5 }}>
                                    <Icon name="envelope" size={18} color={theme.colors.white} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Invite</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginTop: '5%' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageCoin', { type: 'nfuc' })} style={{ alignItems: 'center', width: '30%' }}>
                                <View style={{ backgroundColor: theme.colors.blue, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5 }}>
                                    <Icon name="share" size={20} color={theme.colors.white} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Send Nfuc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Wallet')} style={{ alignItems: 'center', width: '30%' }}>
                                <View style={{ backgroundColor: theme.colors.darkYellow, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5 }}>
                                    <MaterialIcon name="wallet" size={20} color={theme.colors.white} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Wallet</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLogoutAlert(true)} style={{ alignItems: 'center', width: '30%' }}>
                                <View style={{ backgroundColor: theme.colors.red, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 50, elevation: 5 }}>
                                    <MaterialIcon name="logout" size={18} color={theme.colors.white} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ color: theme.colors.purple, padding: 5, alignSelf: 'center', fontSize: 18, fontFamily: 'Gilroy-Bold', backgroundColor: 'rgba(0, 0, 0, 0)', width: '90%', marginTop: '5%' }}>Community</Text>
                    {loading ? (<ActivityIndicator color={theme.colors.purple} style={{ marginTop: "10%" }} />) : (<View style={{ width: '90%', alignItems: 'center', backgroundColor: theme.colors.white, padding: '5%', borderRadius: 10, marginTop: '5%', elevation: 0, marginBottom: '10%' }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: '5%' }}>
                            <TouchableOpacity onPress={() => { isConnected && openLink(links.facebook) }} style={{ alignItems: 'center', width: '25%' }}>
                                <View style={{ backgroundColor: theme.colors.white, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 5 }}>
                                    <Icon name="facebook" size={28} color={'blue'} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { isConnected && openLink(links.whatsapp) }} style={{ alignItems: 'center', width: '25%' }}>
                                <View style={{ backgroundColor: theme.colors.white, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 5 }}>
                                    <Icon name="whatsapp" size={28} color={theme.colors.green} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Whatsapp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { isConnected && openLink(links.instagram) }} style={{ alignItems: 'center', width: '25%' }}>
                                <View style={{ backgroundColor: theme.colors.white, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 5 }}>
                                    <Icon name="instagram" size={28} color={'rgb(222, 49, 99)'} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Instagram</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { isConnected && openLink(links.twitter) }} style={{ alignItems: 'center', width: '25%' }}>
                                <View style={{ backgroundColor: theme.colors.white, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 5 }}>
                                    <Icon name="twitter" size={28} color={theme.colors.blue} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Twitter</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: '5%' }}>
                            <TouchableOpacity onPress={() => { isConnected && openLink(links.tiktok) }} style={{ alignItems: 'center', width: '25%' }}>
                                <View style={{ backgroundColor: theme.colors.white, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 5 }}>
                                    <MaterialIcon name="tiktok" size={28} color={theme.colors.black} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>TikTok</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { isConnected && openLink(links.youtube) }} style={{ alignItems: 'center', width: '25%' }}>
                                <View style={{ backgroundColor: theme.colors.white, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 5 }}>
                                    <Icon name="youtube" size={22} color={theme.colors.red} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Youtube</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { isConnected && openLink(links.telegram) }} style={{ alignItems: 'center', width: '25%' }}>
                                <View style={{ backgroundColor: theme.colors.white, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 5 }}>
                                    <Icon name="telegram" size={22} color={theme.colors.blue} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Telegram</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { isConnected && openLink(links.discord) }} style={{ alignItems: 'center', width: '25%' }}>
                                <View style={{ backgroundColor: theme.colors.white, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 5 }}>
                                    <MaterialIcon name="discord" size={28} color={'purple'} />
                                </View>
                                <Text style={{ color: theme.colors.darkGrey, paddingTop: 5, fontSize: 12, fontFamily: 'Gilroy-SemiBold' }}>Discord</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)}
                </ScrollView>
                <CustomAlert
                    title={"Logout"}
                    message={"Do you want to logout!"}
                    visible={logoutAlert}
                    onCancel={() => setLogoutAlert(false)}
                    onConfirm={async () => {
                        await AsyncStorage.removeItem("id");
                        await navigation.replace("Login");
                        setLogoutAlert(false);
                    }}
                />
                <CustomAlert
                    title={"New Version"}
                    message={"Download latest version of WingedX \n \n Confirm -> to Download latest version"}
                    hideCancel={true}
                    visible={versionAlert}
                    onConfirm={() => { links && openLink(links.appIcon) }}
                />
            </View>
        </LinearGradient>
    )
}

export default Home;