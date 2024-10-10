import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import LoginInput from "../components/LoginInput";
import theme from "../Theme/GlobalTheme";
import Button from "../components/Button";
import { BaseUrl } from "../assets/Data";

export default function Login({ navigation }) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        setLoading(true);

        // Validation
        if (!email || !password) {
            Alert.alert('All fields are mandatory');
            setLoading(false);
            return;
        }

        const data = {
            email,
            password,
        };

        try {
            const response = await fetch(`${BaseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            console.log("Response JSON:", json);  // Log the response from the server

            if (response.status === 400) {
                Alert.alert('invalid credentials');
            }
            console.log('response', json);
            if (json?.user) {
                console.log('successfull login', json.user.email);
                navigation.replace('Home');
            }

        } catch (e) {
            console.log('Error during signin:', e);  // Log any network or API errors
            Alert.alert('An error occurred during registration. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'center', backgroundColor: theme.colors.white, alignItems: 'center' }}>
            <LoginInput text="Email" placeholder="Enter Your Email" value={email} onChangeText={(text) => setEmail(text)} />
            <LoginInput text="Password" placeholder="Enter Your Password" value={password} onChangeText={(text) => setPassword(text)} />
            <View style={{ width: '100%', alignItems: 'center', marginTop: '10%' }}>
                {loading ? <ActivityIndicator size={"small"} color={theme.colors.blue} /> : <Button text="Login" onPress={handleSubmit} />}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: '2%', alignSelf: 'center', marginRight: '5%' }}>
                <Text style={{ color: theme.colors.blue, fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline' }}>SignUp</Text>
            </TouchableOpacity>
        </View>
    )
}