import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Alert, TextInput, TouchableOpacity } from "react-native";
import Header from "../components/Header/Index";
import { launchImageLibrary } from "react-native-image-picker";
import Button from "../components/Button";
import theme from "../Theme/GlobalTheme";
import { BaseUrl } from "../assets/Data";
import Collapsible1 from "../components/Collapsible";

export default function Product({ navigation }) {

    const [imageUri, setImageUri] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [category, setCategory] = useState('');
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState(null);
    const [data1, setData1] = useState([]);

    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dve7g3iz6/upload";

    const fetchData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/category`);
            const json = await response.json();
            const categoryNames = json.map(item => item.category);
            console.log('json:', categoryNames);
            setData1(categoryNames);
        } catch (e) {
            console.log('error fetching...', e);
            // console.log('url:',`${BaseUrl}/register`);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const pickImage = async () => {
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
            setImageUri(uri);
        }
    };

    const handlePost = async () => {
        if (!imageUri) {
            Alert.alert('Please select an image first!');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('file', { uri: imageUri, name: 'image.jpg', type: 'image/jpeg' });
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
                handleSubmit(imageUrl);
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

    const handleSubmit = async (imageUrl) => {

        const data = { imageUrl: imageUrl, category: category, product: product, price: price };

        console.log('imageUrl:', imageUrl);
        if (!imageUrl) {
            return;
        }

        try {
            const response = await fetch(`${BaseUrl}/productcreate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log('product added:', result);

            setCategory('');
            setImageUri(null);
            setPrice(null);
            setProduct('');
        } catch (error) {
            console.error('Error submitting product:', error);
            Alert.alert('Failed to submit product');
        }
    };

    const handleSelectItem = (item) => {
        // console.log("Selected item:", item);
        setCategory(item);

    };

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
            <Header text="Product" onpress={() => navigation.goBack()} />

            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <Text>No image selected</Text>
            )}

            <Collapsible1
                heading="Choose Your Category"
                text="Select a category"
                content={data1 && data1}
                onSelect={handleSelectItem} // Optional: pass a function to handle selection
            />

            <TextInput
                style={{
                    height: 50,
                    width: '90%',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: 'grey',
                    paddingLeft: 10,
                    marginTop: '5%',
                }}
                placeholder="Enter product"
                value={product}
                onChangeText={(text) => setProduct(text)}
            />
            <TextInput
                style={{
                    height: 50,
                    width: '90%',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: 'grey',
                    paddingLeft: 10,
                    marginTop: '5%',
                }}
                placeholder="Enter Price"
                keyboardType="numeric"
                value={price}
                onChangeText={(text) => setPrice(text)}
            />

            <TouchableOpacity style={{ marginTop: '5%' }} onPress={pickImage}>
                <Text style={{ color: theme.colors.blue, textDecorationLine: 'underline' }}>Select Image</Text>
            </TouchableOpacity>

            <Button text={uploading ? "Uploading..." : "Upload Image"} onPress={handlePost} disabled={uploading} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: '90%',
        resizeMode: 'cover',
        marginVertical: 20,
    },
});
