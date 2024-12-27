import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import LoginInput from "../components/LoginInput";
import theme from "../Theme/GlobalTheme";
import Button from "../components/Button";
import { BaseUrl } from "../assets/Data";
import GetLocation from "../components/GeoLocation";
import StringAnimation from "./StringAnimation";
import SnakeGame from "./SnakeGame";

export default function ChangePassword({ navigation, route }) {

    const email = route.params.email;

    const [password, setPassword] = useState('');
    const [confirm, setConfrim] = useState('');
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

        if (password !== confirm) {
            ToastAndroid.show('password not match with confirm password', ToastAndroid.SHORT);
            setLoading(false);
            return;
        }

        const data = {
            password:password,
        };

        try {
            const response = await fetch(`${BaseUrl}/register/${email}`, {
                method: 'PATCH',
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
            if (json) {
                // console.log('successfull login', json.user.email);
                navigation.replace('Login');
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
            <View style={{ width: '100%', alignItems: 'center', marginTop: '50%', }}>
                <LoginInput text="Password" placeholder="Enter Your Password" value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                <LoginInput text="Confirm Password" placeholder="Enter Your Password" value={confirm} secureTextEntry={true} onChangeText={(text) => setConfrim(text)} />
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ width: '100%', alignItems: 'center', marginTop: '10%', marginBottom: '10%' }}>
                    {loading ? <ActivityIndicator size={"small"} color={theme.colors.blue} /> : <Button backgroundColor={theme.colors.darkYellow} text="Confirm" onPress={handleSubmit}/>}
                </View>
                {/* <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ alignSelf: 'center', marginRight: '5%', marginBottom: '10%', justifyContent: 'flex-end' }}>
                    <Text style={{ color: theme.colors.darkYellow, fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}></Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}