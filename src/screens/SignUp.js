import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import LoginInput from "../components/LoginInput";
import theme from "../Theme/GlobalTheme";
import Button from "../components/Button";
import { BaseUrl } from "../assets/Data";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignUp({ navigation }) {

    const [name, setName] = useState('');
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
            ToastAndroid.show("Please accept the terms & conditions", ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        // Validation
        if (!name || !email || !password) {
            ToastAndroid.show("All fields are mandatory", ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            ToastAndroid.show("Please enter a valid email", ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        if (password !== confirm) {
            ToastAndroid.show("Password and confirm password must match", ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        const data = {
            email,
        };

        try {
            console.log("Sending data:", data); // Add logging to see the payload sent

            const response = await fetch(`${BaseUrl}/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();
            console.log("Response JSON:", json); // Log the response from the server

            if (response.ok) {
                ToastAndroid.show('OTP Sent!', ToastAndroid.SHORT);
                navigation.navigate('EnterOTP', {
                    name,
                    email,
                    referalId,
                    password,
                    otp: json.otp, // Pass OTP directly from the response
                });
            } else if (response.status === 400) {
                ToastAndroid.show('Email already exists!', ToastAndroid.SHORT);
            } else {
                Alert.alert('Registration failed', json.msg || 'Please try again');
            }
        } catch (e) {
            console.error('Error during signup:', e); // Log any network or API errors
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
                <Text style={{ fontSize: 28, fontFamily: 'Gilroy-Bold', color: theme.colors.black }}>Signup new account</Text>
                <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, marginLeft: '2%', marginTop: '5%' }}>Your Connection is secure with us</Text>
                <Image source={require('../assets/images/evaluation.png')} style={{ height: 100, width: 100, marginTop:'5%' }} />
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingBottom: '5%' }}>
                    <LoginInput text="Name" placeholder="Enter Your Name" value={name} onChangeText={(text) => setName(text)} backgroundColor={theme.colors.lightGrey} />
                    {/* <LoginInput text="Phone" placeholder="Enter Your Phone Number" value={phone} onChangeText={(text) => setPhone(text)} keyboardType="numeric" backgroundColor={theme.colors.lightGrey} /> */}
                    <LoginInput text="Email" placeholder="Enter Your Email" value={email} onChangeText={(text) => setEmail(text)} backgroundColor={theme.colors.lightGrey} />
                    {!isValid && <Text style={{ color: theme.colors.red, fontSize: 14, fontFamily: 'Gilroy-Medium', width: '90%', paddingTop: '2%', paddingLeft: '2%' }}>Email is not correct!</Text>}
                    <LoginInput text="Referal Id (optional)" placeholder="Enter Referal Id (optional)" value={referalId} onChangeText={(text) => setReferalId(text)} backgroundColor={theme.colors.lightGrey} />
                    <LoginInput text="Password" placeholder="Enter Your Password" value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} backgroundColor={theme.colors.lightGrey} />
                    <LoginInput text="Confirm Password" placeholder="Confirm Password" value={confirm} secureTextEntry={true} onChangeText={(text) => setConfirm(text)} backgroundColor={theme.colors.lightGrey} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Terms')} style={{ alignSelf: 'flex-start', marginLeft: '5%', paddingTop: '2%' }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Medium', color: theme.colors.jetBlack, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                </TouchableOpacity>
                <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', marginTop: '5%' }}>
                    <TouchableOpacity onPress={() => setAccept(!accept)} style={{ borderWidth: 1, borderColor: theme.colors.jetBlack, height: 15, width: 15, alignItems: 'center', justifyContent: 'center' }}>
                        {accept && <Icon name="check" size={10} color={theme.colors.jetBlack} />}
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Medium', color: theme.colors.jetBlack, marginLeft: '2%' }}>Accept Terms & Conditions</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    {loading ? <ActivityIndicator size={"small"} color={theme.colors.purple} /> : <Button backgroundColor={theme.colors.purple} text="SignUp" onPress={handleCheckEmail} />}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: '2%', alignSelf: 'center', marginRight: '5%', marginBottom: '10%' }}>
                    <Text style={{ color: theme.colors.purple, fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}>Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
