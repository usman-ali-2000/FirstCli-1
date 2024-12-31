import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../Theme/GlobalTheme";
import LoginInput from "../components/LoginInput";
import { BaseUrl, fetchData } from "../assets/Data";
import NetInfo from '@react-native-community/netinfo';

export default function Help({ navigation }) {
    const [email, setEmail] = useState(null);
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
        const data = await fetchData();
        setEmail(data.email);
        console.log(data.email);
    };


    useEffect(() => {
        fetchUserData();
    }, []);

    const sendEmail = async () => {
        setLoading(true);
        const connection = await NetInfo.fetch().then(state => state.isConnected);
        if (!connection) {
            ToastAndroid.show("No internet", ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        if (!email || !subject || !text) {
            console.log(email);
            ToastAndroid.show("All fields are mandatory", ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        const url = `${BaseUrl}/send-email`;
        const emailData = {
            email: email,
            text: `${text} from: ${email}`,
            subject: subject,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                ToastAndroid.show("Email sent successfully", ToastAndroid.SHORT);
                setSubject('');
                setText('');
            } else {
                ToastAndroid.show("Failed to send email", ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show("Error sending email", ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.white }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.black} style={{ marginTop: '10%', marginLeft: '5%' }} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.black, fontSize: 18, fontFamily: 'Gilroy-SemiBold', marginLeft: '5%' }}>Help & Support</Text>
            </View>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontFamily: 'Gilroy-Bold', color: theme.colors.black }}>Send your query</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, width: '90%', marginTop: '5%' }}>your email: {email}</Text>
                <LoginInput
                    text="Subject"
                    placeholder="Enter subject"
                    value={subject}
                    onChangeText={setSubject}
                />
                <TextInput
                    placeholder="Enter your Text"
                    placeholderTextColor={theme.colors.black}
                    style={{ width: '90%', borderWidth: 1, marginTop: '5%', borderRadius: 3, marginLeft: '2%', borderColor: theme.colors.darkGrey, height: 150, paddingLeft: 10, fontSize: 14 }}
                    textAlignVertical="top"
                    value={text}
                    onChangeText={setText}
                />
                {loading ? <ActivityIndicator color={theme.colors.purple} /> : <TouchableOpacity onPress={sendEmail} style={{ backgroundColor: theme.colors.purple, padding: 10, width: 80, height: 40, alignItems: 'center', borderRadius: 5, marginTop: '5%' }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.white }}>Send</Text>
                </TouchableOpacity>}
            </ScrollView>
        </View>
    );
}
