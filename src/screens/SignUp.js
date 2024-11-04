import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import LoginInput from "../components/LoginInput";
import theme from "../Theme/GlobalTheme";
import Button from "../components/Button";
import { BaseUrl } from "../assets/Data";

export default function SignUp({ navigation }) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [referalId, setReferalId] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
        setLoading(true);

        // Validation
        if (!name || !phone || !email || !password) {
            Alert.alert('All fields are mandatory');
            setLoading(false);
            return;
        }

        if (password !== confirm) {
            Alert.alert('Password and confirm password should be the same');
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
                navigation.navigate('EnterOTP',{name:name, phone:phone, email:email, referalId:referalId, password:password, otp:otp
                    
                 });  // Automatically redirect to login after successful registration
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
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', backgroundColor: theme.colors.black, alignItems: 'center' }}>
            <ScrollView style={{ width: '100%', paddingTop:'10%' }} contentContainerStyle={{ alignItems: 'center' }}>
                <LoginInput text="Name" placeholder="Enter Your Name" value={name} onChangeText={(text) => setName(text)} />
                <LoginInput text="Phone" placeholder="Enter Your Phone Number" value={phone} onChangeText={(text) => setPhone(text)} keyboardType="numeric" />
                <LoginInput text="Email" placeholder="Enter Your Email" value={email} onChangeText={(text) => setEmail(text)} />
                <LoginInput text="Referal Id" placeholder="Enter Referal Id" value={referalId} onChangeText={(text) => setReferalId(text)} />
                <LoginInput text="Password" placeholder="Enter Your Password" value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                <LoginInput text="Confirm Password" placeholder="Confirm Password" value={confirm} secureTextEntry={true} onChangeText={(text) => setConfirm(text)} />
                <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    {loading ? <ActivityIndicator size={"small"} color={theme.colors.blue} /> : <Button backgroundColor={theme.colors.green} text="SignUp"  onPress={handleSubmit} />}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: '2%', alignSelf: 'center', marginRight: '5%' }}>
                    <Text style={{ color: theme.colors.green, fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}>Login</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
