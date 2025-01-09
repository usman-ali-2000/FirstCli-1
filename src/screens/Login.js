import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import LoginInput from "../components/LoginInput";
import theme from "../Theme/GlobalTheme";
import Button from "../components/Button";
import { BaseUrl, resetTimer } from "../assets/Data";
import GetLocation from "../components/GeoLocation";
import StringAnimation from "./StringAnimation";
import SnakeGame from "./SnakeGame";
import { addEventListener } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

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

    const generateUniqueId = async () => {
        try {
            const date = new Date();
            const dateString = date.toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD format

            // Atomically increment the count for the current date
            const counter = await AdminRegister.findOneAndUpdate(
                { date: dateString }, // Find document by today's date
                { $inc: { count: 1 } }, // Increment the `count` field
                { new: true, upsert: true } // Create a new document if it doesn't exist
            );

            // Generate the unique ID using the count
            const uniqueId = `${dateString}${String(counter.count).padStart(3, '0')}`;

            return uniqueId;
        } catch (error) {
            console.error("Error generating unique ID:", error);
            throw error;
        }
    };


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
            console.log('response', json.user.id, json.user.generatedId);
            await AsyncStorage.setItem("id", json.user.id);
            await AsyncStorage.setItem("userId", json.user.userId);
            await AsyncStorage.setItem("generatedId", json.user.generatedId);
            const newEndTime = moment().add(24, 'hours').format('MM/DD/YYYY HH : mm : ss');
            await AsyncStorage.setItem('endTime', newEndTime);
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
        <View style={{ flex: 1, width: '100%', justifyContent: 'space-between', backgroundColor: theme.colors.white, alignItems: 'center' }}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: '30%', }}>
                <Image source={require('../assets/images/sign-in.png')} style={{ height: 150, width: 150, marginTop: '5%' }} />
                <LoginInput text="Email" placeholder="Enter Your Email" value={email} onChangeText={(text) => setEmail(text)} backgroundColor={theme.colors.lightGrey} />
                <LoginInput text="Password" placeholder="Enter Your Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} backgroundColor={theme.colors.lightGrey} />
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ width: '90%', alignItems: 'flex-end', marginTop: '2%' }}>
                    <Text style={{ color: theme.colors.jetBlack, fontSize: 15, textDecorationLine: 'underline' }}>forgot password</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '100%', alignItems: 'center', marginTop: '10%', marginBottom: '5%' }}>
                    {loading ? <ActivityIndicator size={"small"} color={theme.colors.purple} /> : <Button backgroundColor={theme.colors.purple} text="Login" onPress={handleSubmit} />}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ alignSelf: 'center', marginRight: '5%', marginBottom: '10%', justifyContent: 'flex-end' }}>
                    <Text style={{ color: theme.colors.purple, fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}