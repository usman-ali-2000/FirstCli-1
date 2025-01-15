import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import Clipboard from "@react-native-clipboard/clipboard";
import { launchImageLibrary } from "react-native-image-picker";
import { BaseUrl, CLOUDINARY_URL, sendEmail, sendNotification } from "../assets/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginInput from "../components/LoginInput";

export default function Payment({ navigation, route }) {

    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState(null);
    const [uploading, setUploading] = useState(false); // Track the uploading state

    const copyToClipboard = async (text) => {
        Clipboard.setString(text);
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    };


    const pickImage = async (no) => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
            includeBase64: false,
        });

        if (result.didCancel) {
            console.log('User canceled image picker');
        } else if (result.errorCode) {
            console.log('Error picking image:', result.errorMessage);
        } else {
            const uri = result.assets[0].uri;
            console.log('Selected image URI:', uri);
            if (no === 1) {
                setImage1(uri);
            }
        }
    };


    const handlePost = async (imageUrl) => {

        if (!imageUrl || !price) {
            Alert.alert('Please add data!');
            setUploading(false);
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('file', { uri: imageUrl, name: 'image.jpg', type: 'image/jpeg' });
        formData.append('upload_preset', 'bookshop');

        try {
            const response = await fetch(CLOUDINARY_URL, {
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                },
                method: 'POST',
            });

            const data = await response.json();
            console.log('Cloudinary response data:', data);
            if (data.secure_url) {
                const imageUrl = data.secure_url;
                console.log('Image uploaded successfully! URL:', imageUrl);
                return (imageUrl);
            } else {
                Alert.alert('Image upload failed.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {

        setUploading(true);
        const id = await AsyncStorage.getItem("id");
        const userId = await AsyncStorage.getItem("userId");

        const url1 = await handlePost(image1);

        console.log('images:', url1);

        if (!image1 || !price) {
            ToastAndroid.show('all fields are madatory', ToastAndroid.SHORT);
            setUploading(false);
            return;
        }

        const data = {
            image1: url1,
            payerId: id,
            referId: userId,
            price: price,
        };

        try {
            const response = await fetch(`${BaseUrl}/screenshot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            });

            const result = await response.json();
            console.log('Category added:', result);
            if (response.ok) {
                navigation.navigate('Home');
                await sendNotification('wingedx-admin', 'Payment Request', `payment request of ${price} $`, 'Screenshot');
                await sendEmail('wingedxnetwork@gmail.com', 'USDT Request', `you have USDT request for ${price} $ of Id ${userId} `);
                setImage1(null);
                setPrice('');
            }
        } catch (error) {
            console.error('Error submitting category:', error);
            Alert.alert('Failed to submit category');
        } finally {
            setUploading(false);
        }
    };


    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.white }}>
            <View style={{ height: 50, width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: '3%', marginLeft: '5%' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.black} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, marginTop: '3%', marginLeft: '30%' }}>Screenshot</Text>
            </View>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: '5%' }}>
                {image1 && <Image style={{ height: 200, width: '90%', marginTop: '5%', borderRadius: 10 }} source={{ uri: image1 }} resizeMode="contain" />}
                {!image1 && <View style={{ backgroundColor: theme.colors.lightGrey, width: "90%", marginTop: '5%', alignItems: 'center', justifyContent: 'center', height: 200, borderRadius: 10 }}>
                    <Icon name="image" size={26} color={theme.colors.darkGrey} />
                    <Text style={{ fontSize: 12, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, paddingTop: '2%' }}>Upload Screenshot</Text>
                </View>}
                <View style={{ width: '50%', alignItems: 'center', marginTop: '3%' }}>
                    <Button backgroundColor={theme.colors.purple} text="Upload Image" image={<Icon name="image" size={14} color={theme.colors.white} style={{ marginRight: '3%' }} />} onPress={() => pickImage(1)} />
                </View>
                <LoginInput
                    keyboardType="numeric"
                    text="Amount"
                    placeholder="Enter Amount in $"
                    value={price}
                    onChangeText={(txt) => setPrice(txt)}
                />
                {uploading ? <ActivityIndicator size={"large"} color={theme.colors.purple} /> : <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
                    <Button backgroundColor={theme.colors.purple} text="Send" onPress={() => handleSubmit()} />
                </View>}
            </ScrollView>
        </View>
    )
}