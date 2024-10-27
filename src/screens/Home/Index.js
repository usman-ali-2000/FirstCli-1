import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import Styles from "./Style";
import FlatItem from "../../components/FlatItem/Index";
import { BaseUrl } from "../../assets/Data";
import SnakeGame from "../SnakeGame";
import { TouchableOpacity } from "react-native";
import theme from "../../Theme/GlobalTheme";
import FastImage from "react-native-fast-image";
import HomeHeader from "../../components/HomeHeader";

const Home = ({ navigation }) => {

    const [column, setColumn] = useState(2);
    const [data1, setData1] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/category`);
            const json = await response.json();
            console.log('json:', json);
            setData1(json);
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
                heading={item.category}
                onPress={() => navigation.navigate('ProductView', { category: item.category })}
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
            <HomeHeader onpress={()=>navigation.openDrawer()}/>
            <Text style={{ fontSize: 40, color: theme.colors.red, fontFamily: 'Gilroy-Bold', alignSelf:'center', marginTop:'30%' }}>Play Now!</Text>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', height: '50%', marginBottom: '10%' }}>
                <FastImage source={require('../../assets/images/icon.gif')} style={{ height: 150, width: 150, alignSelf: 'center' }} />
                <TouchableOpacity onPress={()=>navigation.navigate('Game')} style={{ alignSelf: 'center', backgroundColor: theme.colors.green, height: 50, width: '70%', borderRadius: 10, alignItems: 'center', justifyContent: 'center', elevation: 5, }}>
                    <Text style={{ fontSize: 20, color: theme.colors.white, fontFamily: 'Gilroy-SemiBold' }}>Play</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home;