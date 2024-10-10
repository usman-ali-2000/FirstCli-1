import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
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
            name,
            phone: Number(phone),
            email,
            password,
        };

        try {
            console.log("Sending data:", typeof data.phone);  // Add logging to see the payload sent
            const response = await fetch(`${BaseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            console.log("Response JSON:", json);  // Log the response from the server

            if (response.status === 201) {
                Alert.alert('Successfully Registered');
                navigation.navigate('Login');  // Automatically redirect to login after successful registration
            } else {
                // Handle unsuccessful registration
                Alert.alert('Registration failed', json.msg || 'Please try again');
            }

        } catch (e) {
            console.log('Error during signup:', e);  // Log any network or API errors
            Alert.alert('An error occurred during registration. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', backgroundColor: theme.colors.white, alignItems: 'center' }}>
            <LoginInput text="Name" placeholder="Enter Your Name" value={name} onChangeText={(text) => setName(text)} />
            <LoginInput text="Phone" placeholder="Enter Your Phone Number" value={phone} onChangeText={(text) => setPhone(text)} keyboardType="numeric" />
            <LoginInput text="Email" placeholder="Enter Your Email" value={email} onChangeText={(text) => setEmail(text)} />
            <LoginInput text="Password" placeholder="Enter Your Password" value={password} onChangeText={(text) => setPassword(text)} />
            <LoginInput text="Confirm Password" placeholder="Confirm Password" value={confirm} onChangeText={(text) => setConfirm(text)} />
            <View style={{ width: '100%', alignItems: 'center', marginTop: '10%' }}>
                {loading ? <ActivityIndicator size={"small"} color={theme.colors.blue}/> : <Button text="SignUp" onPress={handleSubmit} />}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: '2%', alignSelf: 'center', marginRight: '5%' }}>
                <Text style={{ color: theme.colors.blue, fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline' }}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}
