import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import FlatItem from "../components/FlatItem/Index";
import { BaseUrl } from "../assets/Data";
import Styles from "./Home/Style";

const ProductView = ({ navigation, route }) => {

    const [column, setColumn] = useState(2);
    const [data1, setData1] = useState([]);
    const name = route.params.category;

    const fetchData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/productCreate`);
            const json = await response.json();
            const productGet = await json.filter((item) => item.category === name);
            console.log('json:', productGet);
            setData1(productGet);
        } catch (e) {
            console.log('error fetching...', e);
            // console.log('url:',`${BaseUrl}/register`);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);



    const renderItem = ({ item }) => (
        <View style={Styles.flatcontainer}>
            <FlatItem
                image={item.imageUrl}
                heading={item.product}
                price={item.price}
            // text={item.text}
            // lastupdate={item.lastupdate}
            // onpress={() => handleLearnMore()}
            />
        </View>
    );

    const handleLearnMore = () => {
        navigation.navigate('Detail');
    }

    useEffect(() => {
        // console.log('data:', Data);
    }, [])

    return (
        <View style={Styles.container}>
            <Pressable onPress={() => navigation.navigate('Settings')}>
                <View style={Styles.header}>
                    <Image style={Styles.gear} source={require('../assets/images/gear.png')} />
                </View>
            </Pressable>
            <Text style={Styles.heading}>Products</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data1}
                keyExtractor={(item) => item.id}
                numColumns={column}
                renderItem={renderItem}
            />
        </View>
    )
}

export default ProductView;