import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../Theme/GlobalTheme";
import { BaseUrl, timeAgo, updateNotification } from "../assets/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Notification({ navigation }) {

    const [id, setId] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchNotification = async () => {
        try {
            setLoading(true);
            const id = await AsyncStorage.getItem('generatedId');
            console.log('id:', id);
            const response = await fetch(`${BaseUrl}/notification/${id}`);
            if (response.ok) {
                const json = await response?.json();
                setData(json || []);
            }
            console.log('json:', response.ok);
        } catch (e) {
            console.log('error fetching data', e);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchNotification()
    }, []);

    const onRefresh = () => {
        setRefreshing(true); // Show the refresh spinner
        setTimeout(() => {
            fetchNotification();
            setRefreshing(false); // Hide the refresh spinner
        }, 2000); // Simulate a network request delay
    };


    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightGrey }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.black} style={{ marginTop: '10%', marginLeft: '5%' }} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.black, fontSize: 18, fontFamily: 'Gilroy-SemiBold', marginLeft: '5%' }}>Notifications</Text>
            </View>
            {loading ? <ActivityIndicator size={"large"} color={theme.colors.purple} style={{ marginTop: '60%' }} /> :
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.purple}
                            colors={[theme.colors.lightGrey, theme.colors.darkGrey, theme.colors.purple]}
                        />
                    } style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: '5%' }}>
                    {data?.length === 0 ? <Text style={{ fontSize: 20, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, marginTop: '50%' }}>No Notification</Text> :
                        data?.map((item, index) => (
                            <TouchableOpacity key={item._id || index} onPress={() => { updateNotification(item._id, { seen: true }); item.path && navigation.navigate(item?.path) }} style={{ flexDirection: 'column', alignItems: 'center', width: '90%', justifyContent: 'space-between', marginTop: '3%', padding: '3%', borderRadius: 5, backgroundColor: theme.colors.white, elevation: item.seen ? 0 : 5 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, width: '90%', textAlign: 'left' }}>{item.heading}</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'Gilroy-Medium', color: theme.colors.darkGrey, width: '90%', textAlign: 'left' }}>{item.subHeading}</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'Gilroy-Medium', color: theme.colors.black, width: '90%', textAlign: 'right' }}>{item.timestamp && timeAgo(item.timestamp)}</Text>
                            </TouchableOpacity>
                        ))}
                </ScrollView>}
        </View>
    )
}