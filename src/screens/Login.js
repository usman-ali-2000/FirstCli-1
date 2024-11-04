import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import LoginInput from "../components/LoginInput";
import theme from "../Theme/GlobalTheme";
import Button from "../components/Button";
import { BaseUrl } from "../assets/Data";
import GetLocation from "../components/GeoLocation";
import StringAnimation from "./StringAnimation";
import SnakeGame from "./SnakeGame";
import { addEventListener } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(null);
    let unsubscribe = null;

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

    const checkConnection = () => {
        unsubscribe = addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected) {
                setIsConnected(true);
            } else {
                ToastAndroid.show('internet not connected!', ToastAndroid.SHORT);
            }
        });
    }
    useEffect(() => {
        // Subscribe to network state updates    
        checkConnection();
        // Unsubscribe
        if (unsubscribe) {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async () => {
        setLoading(true);

        checkConnection();
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
            console.log('response', json.user.id);
            await AsyncStorage.setItem("id", json.user.id);
            await AsyncStorage.setItem("userId", json.user.userId);
            await AsyncStorage.setItem("generatedId", json.user.generatedId);
            if (json?.user) {
                console.log('successfull login', json.user.email);
                navigation.replace('Home');
            }

        } catch (e) {
            console.log('Error during signin:', e);
            // Log any network or API errors
            Alert.alert('An error occurred during registration. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', backgroundColor: theme.colors.black, alignItems: 'center' }}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: '50%', }}>
                <LoginInput text="Email" placeholder="Enter Your Email" value={email} onChangeText={(text) => setEmail(text)} />
                <LoginInput text="Password" placeholder="Enter Your Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ width: '90%', alignItems: 'flex-end', marginTop: '2%' }}>
                    <Text style={{ color: theme.colors.red, fontSize: 15, textDecorationLine: 'underline' }}>forgot password</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '100%', alignItems: 'center', marginTop: '10%', marginBottom: '5%' }}>
                    {loading ? <ActivityIndicator size={"small"} color={theme.colors.blue} /> : <Button backgroundColor={theme.colors.green} text="Login" onPress={handleSubmit} />}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ alignSelf: 'center', marginRight: '5%', marginBottom: '10%', justifyContent: 'flex-end' }}>
                    <Text style={{ color: theme.colors.green, fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}