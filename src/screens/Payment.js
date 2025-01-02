import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "../components/Button";
import Clipboard from "@react-native-clipboard/clipboard";
import { launchImageLibrary } from "react-native-image-picker";
import { BaseUrl, CLOUDINARY_URL, sendEmail } from "../assets/Data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Payment({ navigation, route }) {

    const coins = route?.params?.coins;
    const price = route?.params?.price;
    const type = route?.params?.type;

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
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
            } else {
                setImage2(uri);
            }
        }
    };


    const handlePost = async (imageUrl) => {
        if (!imageUrl) {
            Alert.alert('Please select an image first!');
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
            // setImage1(null);
            // setImage2(null);
            if (data.secure_url) {
                const imageUrl = data.secure_url;
                console.log('Image uploaded successfully! URL:', imageUrl);
                return (imageUrl);
                Alert.alert('Image uploaded successfully!');
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
        const userId = await AsyncStorage.getItem("generatedId");

        const url1 = await handlePost(image1);
        const url2 = await handlePost(image2);

        console.log('images:', url1, url2);
        const data = {
            image1: url1,
            image2: url2,
            payerId: id,
            referId: userId,
            coins: coins,
            price: price,
            type: type
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
            await sendEmail('wingedxnetwork@gmail.com', 'Nfuc Request', `you have Nfuc request for ${price} $ of Id ${userId} `);
            setImage1(null);
            setImage2(null);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error submitting category:', error);
            Alert.alert('Failed to submit category');
        } finally {
            setUploading(false);
        }
    };


    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightPink }}>
            <View style={{ height: 50, width: '100%', alignItems: 'center', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: '3%', marginLeft: '5%' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.black} />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, marginTop: '3%', marginLeft: '30%' }}>Payment</Text>
            </View>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: '5%' }}>
                <View style={{ backgroundColor: theme.colors.purple, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 50, borderWidth: 2, borderColor: theme.colors.white, zIndex: 2, position: 'absolute', top: "3%" }}>
                    <Icon name="dollar" size={26} color={theme.colors.white} />
                </View>
                <View style={{ width: '90%', backgroundColor: theme.colors.white, padding: 10, marginTop: "12%", borderRadius: 10, alignItems: 'center', justifyContent: "center" }}>
                    <View style={{ padding: "5%", width: '48%', alignItems: 'center', borderRadius: 15, width: '100%' }}>
                        <Text style={{ paddingLeft: 5, fontSize: 18, fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, maxWidth: '90%', textAlign: 'center', marginTop: '10%' }}>Order Amount</Text>
                        <Text style={{ paddingLeft: 5, fontSize: 20, fontFamily: 'Gilroy-Bold', color: theme.colors.purple, maxWidth: '90%', textAlign: 'center', marginTop: '3%', }}>{price} USDT</Text>
                        <TouchableOpacity onPress={() => copyToClipboard('abcdef')} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', marginTop: '5%' }}>
                            <Text style={{ paddingLeft: 5, fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, }}>Order ID:795748098305730</Text>
                            <Icon name="copy" size={14} color={theme.colors.darkGrey} style={{ marginLeft: '2%' }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '90%', backgroundColor: theme.colors.white, paddingTop: 20, paddingBottom: 20, marginTop: "5%", borderRadius: 10, alignItems: 'center', justifyContent: "center" }}>
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Bold', width: '90%', color: theme.colors.black }}>Please pay in following way</Text>
                    <View style={{ height: 1, width: '90%', marginTop: '5%', marginBottom: '2%', backgroundColor: theme.colors.darkGrey }} />
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', width: '90%', color: theme.colors.black, paddingTop: '5%' }}>Contract Address:</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', width: '90%', color: theme.colors.purple, paddingTop: '3%' }}>TjogjRjoigjFjgoijGjfoghijro</Text>
                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
                        <Button backgroundColor={theme.colors.purple} text="Copy" image={<Icon name="copy" size={14} color={theme.colors.white} style={{ marginRight: '2%' }} />} onPress={() => copyToClipboard('abcdef')} />
                    </View>
                </View>
                {image1 && <Image style={{ height: 200, width: '90%', marginTop: '5%' }} source={{ uri: image1 }} resizeMode="contain" />}
                <View style={{ width: '70%', alignItems: 'center', marginTop: '3%' }}>
                    <Button backgroundColor={theme.colors.purple} text="Upload 1st" image={<Icon name="upload" size={14} color={theme.colors.white} style={{ marginRight: '2%' }} />} onPress={() => pickImage(1)} />
                </View>
                {image2 && <Image style={{ height: 200, width: '90%', marginTop: '5%' }} source={{ uri: image2 }} resizeMode="contain" />}
                <View style={{ width: '70%', alignItems: 'center', marginTop: '3%' }}>
                    <Button backgroundColor={theme.colors.purple} text="Upload 2nd" image={<Icon name="upload" size={14} color={theme.colors.white} style={{ marginRight: '2%' }} />} onPress={() => pickImage(2)} />
                </View>
                {uploading ? <ActivityIndicator size={"large"} color={theme.colors.purple} /> : <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
                    <Button backgroundColor={theme.colors.purple} text="Send" onPress={() => handleSubmit()} />
                </View>}
            </ScrollView>
        </View>
    )
}