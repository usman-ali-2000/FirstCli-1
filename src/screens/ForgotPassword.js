import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import LoginInput from "../components/LoginInput";
import theme from "../Theme/GlobalTheme";
import Button from "../components/Button";
import { BaseUrl } from "../assets/Data";
import GetLocation from "../components/GeoLocation";
import StringAnimation from "./StringAnimation";
import SnakeGame from "./SnakeGame";

export default function ForgotPassword({ navigation }) {


    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/register`);
            const json = await response.json();
            console.log('json:', json);
        } catch (e) {
            console.log('error fetching...', e);
            // console.log('url:',`${BaseUrl}/register`);
        }
    }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    const handleSubmit = async () => {
        setLoading(true);

        // Validation
        if (!email) {
            ToastAndroid.show('enter your email', ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        const data = {
            email
        };
        try {
            const response = await fetch(`${BaseUrl}/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            console.log("Response JSON:", json);  // Log the response from the server
            const otp = json.otp;

            if (response.status === 200) {
                ToastAndroid.show('OTP Sent!', ToastAndroid.SHORT);
                navigation.navigate('ForgotOTP',{email: email, otp: otp });  // Automatically redirect to login after successful registration
            } else if(response.status === 400 ) {
                // Handle unsuccessful registration
                ToastAndroid.show('Email Already Exist!', ToastAndroid.SHORT);
            }else {
                Alert.alert('Registration failed', json.msg || 'Please try again');
            }

        } catch (e) {
            console.log('Error during signup:', e);  // Log any network or API errors
            Alert.alert('An error occurred during registration. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', backgroundColor: theme.colors.black, alignItems: 'center' }}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: '70%', }}>
                <LoginInput text="Email" placeholder="Enter Your Email" value={email} onChangeText={(text) => setEmail(text)} />
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '100%', alignItems: 'center', marginTop: '10%', marginBottom: '10%' }}>
                    {loading ? <ActivityIndicator size={"small"} color={theme.colors.blue} /> : <Button backgroundColor={theme.colors.green} text="Send" onPress={handleSubmit} />}
                </View>
            </View>
        </View>
    )
}