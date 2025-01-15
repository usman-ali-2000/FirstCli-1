import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Linking, ScrollView, Text, ToastAndroid, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import { TouchableOpacity } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import { addCoins, addReferCoins, BaseUrl } from "../assets/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import Working from "./Working";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Task({ navigation }) {

    const [select, setSelect] = useState(1);
    const [isConnected, setIsConnected] = useState(null);
    const [notViewed, setNotViewed] = useState([]);
    const [viewed, setViewed] = useState([]);
    const [loading, setLoading] = useState(false);
    const [accType, setAccType] = useState(null);

    const fetchTask = async () => {
        try {
            setLoading(true);
            const id = await AsyncStorage.getItem("id");
            const response = await fetch(`${BaseUrl}/task/${id}`);
            const json = await response.json();
            console.log('json task:', json);
            setNotViewed(json.notViewedTasks);
            setViewed(json.viewedTasks);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log('error fetching task', e);
        }
    }


    const fetchAccType = async () => {
        try {
            setLoading(true);
            const id = await AsyncStorage.getItem("id");
            const response = await fetch(`${BaseUrl}/register/${id}`);
            const json = await response.json();
            console.log('json task:', json.accType);
            setAccType(json.accType);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log('error fetching task', e);
        }
    }

    useEffect(() => {
        fetchTask();
    }, []);

    const handleNonWorking = () => {
        if (accType === "non-working" || accType === "fresh") {
            navigation.navigate('Working', { type: "non-working" });
        } else {
            Alert.alert("Use another email for non-working account");
        }
    }
    const handleWorking = () => {
        if (accType === "working" || accType === "fresh") {
            navigation.navigate('Working', { type: "working" });
        } else {
            Alert.alert("Use another email for working account");
        }
    }


    const openLink = async (webUrl) => {
        try {
            await Linking.openURL(webUrl);
        } catch (error) {
            Alert.alert('Failed to open link', error.message);
        }
    };



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

    async function updatePostView(postId, userId) {
        try {
            const response = await fetch(`${BaseUrl}/task/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            const data = await response.json();
            console.log('Post updated successfully:', data);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    }



    const handleTask = async (url, postId) => {
        try {
            const id = await AsyncStorage.getItem("id");
            if (isConnected) {
                openLink(url);
                updatePostView(postId, id);
                addCoins(50);
                addReferCoins(50 * 3 / 100);
                fetchTask();
            } else {
                ToastAndroid.show('internet not connected!', ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log('error in task', e);
        }
    }

    const handleComplete = () => {
        ToastAndroid.show('Already done', ToastAndroid.SHORT);
    }

    const Pending = () => {
        return (
            <>
                {
                    notViewed.length === 0 ? <Text style={{ color: theme.colors.white, marginTop: '50%', fontSize: 20, fontFamily: 'Gilroy-SemiBold' }}>No Task Yet!</Text> :
                        <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                            <FlatList
                                style={{ width: '100%' }}
                                contentContainerStyle={{ alignItems: 'center' }}
                                data={notViewed}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleTask(item.link, item._id)} style={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: '5%', backgroundColor: theme.colors.white, borderRadius: 8, elevation: 5, justifyContent: "space-between", paddingTop: 10, paddingLeft: 10 }}>
                                        <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                                            <Image source={require('../assets/images/task.png')} style={{ height: 40, width: 40 }} />
                                        </View>
                                        <View style={{ flexDirection: 'column', paddingLeft: '4%', width: '80%', alignSelf: 'flex-ends' }}>
                                            <Text style={{ colors: theme.colors.white, fontSize: 16, color: theme.colors.purple, fontFamily: 'Gilroy-SemiBold', }}>{item.heading}</Text>
                                            <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.red, fontFamily: 'Gilroy-Medium', paddingTop: '1%' }}>{item.subHeading}</Text>
                                            <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.white, fontFamily: 'Gilroy-Medium', padding: '1%', backgroundColor: theme.colors.green, width: 100, textAlign: 'center', alignSelf: 'flex-end', borderBottomRightRadius: 4, borderTopLeftRadius: 8, marginTop: 5 }}>pending</Text>
                                        </View>
                                    </TouchableOpacity>
                                )} />
                        </View>
                }
            </>
        )
    }
    const Complete = () => {
        return (
            <>
                {
                    viewed.length === 0 ? <Text style={{ color: theme.colors.white, marginTop: '50%', fontSize: 20, fontFamily: 'Gilroy-SemiBold' }}>No Task Completed Yet!</Text> :
                        <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                            <FlatList
                                style={{ width: '100%' }}
                                contentContainerStyle={{ alignItems: 'center' }}
                                data={viewed}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleComplete()} style={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: '5%', backgroundColor: theme.colors.white, borderRadius: 8, elevation: 5, justifyContent: "space-between", paddingTop: 10, paddingLeft: 10 }}>
                                        <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                                            <Image source={require('../assets/images/task.png')} style={{ height: 40, width: 40 }} />
                                        </View>
                                        <View style={{ flexDirection: 'column', paddingLeft: '4%', width: '80%', alignSelf: 'flex-ends' }}>
                                            <Text style={{ colors: theme.colors.white, fontSize: 16, color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', }}>{item.heading}</Text>
                                            <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.red, fontFamily: 'Gilroy-Medium', paddingTop: '1%' }}>{item.subHeading}</Text>
                                            <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.white, fontFamily: 'Gilroy-Medium', padding: '1%', backgroundColor: theme.colors.red, width: 100, textAlign: 'center', alignSelf: 'flex-end', borderBottomRightRadius: 4, borderTopLeftRadius: 8, marginTop: 5 }}>Completed</Text>
                                        </View>
                                    </TouchableOpacity>
                                )} />
                        </View>
                }
            </>
        )

    }

    return (
        <LinearGradient colors={[theme.colors.lightPink, theme.colors.lightPink, theme.colors.lightPink,]} style={{ width: '100%', flex: 1, alignItems: 'center' }}>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start', marginTop: '2%', }}>
                    <Icon name="chevron-left" size={16} color={theme.colors.purple} style={{  marginLeft: '5%' }} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.purple, fontSize: 20, fontFamily: 'Gilroy-SemiBold', marginLeft: '5%' }}>Tasks</Text>
            </View>
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.purple, backgroundColor: theme.colors.white, height: 50, borderRadius: 12, marginTop: '10%' }}>
                        <TouchableOpacity onPress={() => setSelect(1)} style={{
                            width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 1 ? theme.colors.purple : theme.colors.white
                            , height: 50, borderRadius: 12
                        }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Gilroy-SemiBold', color: select === 1 ? theme.colors.white : theme.colors.purple }}>Pending</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelect(2)} style={{
                            width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 2 ? theme.colors.purple : theme.colors.white
                            , height: 50, borderRadius: 12
                        }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Gilroy-SemiBold', color: select === 2 ? theme.colors.white : theme.colors.purple }}>Completed</Text>
                        </TouchableOpacity>
                    </View>
                    {loading ? <ActivityIndicator color={theme.colors.purple} style={{ marginTop: '50%' }} /> : <>
                        {select === 1 && <Pending />}
                        {select === 2 && <Complete />}
                    </>}
                </ScrollView>
            </View>
        </LinearGradient>
    )
}