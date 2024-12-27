import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import LoginInput from "../components/LoginInput";
import theme from "../Theme/GlobalTheme";
import Button from "../components/Button";
import { BaseUrl } from "../assets/Data";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignUp({ navigation }) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [referalId, setReferalId] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [accept, setAccept] = useState(false);


    const handleSubmit = async () => {
        setLoading(true);

        if (!accept) {
            ToastAndroid.show("Please Accept...", ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        // Validation
        if (!name || !phone || !email || !password) {
            ToastAndroid.show("All fields are mandator", ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        if (password !== confirm) {
            ToastAndroid.show("Password and confirm password should be the same", ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        const data = {
            email,
        };

        try {
            console.log("Sending data:", typeof data.phone);  // Add logging to see the payload sent
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
                navigation.navigate('EnterOTP', {
                    name: name, phone: phone, email: email, referalId: referalId, password: password, otp: otp

                });  // Automatically redirect to login after successful registration
            } else if (response.status === 400) {
                // Handle unsuccessful registration
                ToastAndroid.show('Email Already Exist!', ToastAndroid.SHORT);
            } else {
                Alert.alert('Registration failed', json.msg || 'Please try again');
            }

        } catch (e) {
            console.log('Error during signup:', e);  // Log any network or API errors
            Alert.alert('An error occurred during registration. Please try again later.');
        }
        setLoading(false);
    };


    const validateEmail = (email) => {
        // Simple regex pattern for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCheckEmail = () => {
        if (validateEmail(email)) {
            handleSubmit();
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', backgroundColor: theme.colors.white, alignItems: 'center' }}>
            <ScrollView style={{ width: '100%', paddingTop: '10%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: '5%' }}>
                <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.white, borderRadius: 14, borderColor: theme.colors.darkYellow, paddingBottom: '5%' }}>
                    <LoginInput text="Name" placeholder="Enter Your Name" value={name} onChangeText={(text) => setName(text)} />
                    <LoginInput text="Phone" placeholder="Enter Your Phone Number" value={phone} onChangeText={(text) => setPhone(text)} keyboardType="numeric" />
                    <LoginInput text="Email" placeholder="Enter Your Email" value={email} onChangeText={(text) => setEmail(text)} />
                    {!isValid && <Text style={{ color: theme.colors.red, fontSize: 14, fontFamily: 'Gilroy-Medium', width: '90%', paddingTop: '2%', paddingLeft: '2%' }}>Email is not correct!</Text>}
                    <LoginInput text="Referal Id" placeholder="Enter Referal Id" value={referalId} onChangeText={(text) => setReferalId(text)} />
                    <LoginInput text="Password" placeholder="Enter Your Password" value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                    <LoginInput text="Confirm Password" placeholder="Confirm Password" value={confirm} secureTextEntry={true} onChangeText={(text) => setConfirm(text)} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Terms')} style={{ alignSelf: 'flex-start', marginLeft: '5%', paddingTop: '2%' }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Medium', color: theme.colors.darkYellow, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                </TouchableOpacity>
                <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginTop: '5%' }}>
                    <TouchableOpacity onPress={() => setAccept(!accept)} style={{ borderWidth: 1, borderColor: theme.colors.darkYellow, height: 15, width: 15, alignItems: 'center', justifyContent: 'center' }}>
                        {accept && <Icon name="check" size={10} color={theme.colors.darkYellow} />}
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Medium', color: theme.colors.grey, marginLeft: '2%' }}>Accept Terms & Conditions</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    {loading ? <ActivityIndicator size={"small"} color={theme.colors.blue} /> : <Button backgroundColor={theme.colors.darkYellow} text="SignUp" onPress={handleCheckEmail} />}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: '2%', alignSelf: 'center', marginRight: '5%', marginBottom: '10%' }}>
                    <Text style={{ color: theme.colors.darkYellow, fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}>Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
