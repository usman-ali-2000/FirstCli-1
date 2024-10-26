import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import { TouchableOpacity } from "react-native";

export default function Profile() {

    const [total, setTotal] = useState(5000);

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.black }}>
            <Image source={require('../assets/images/coins.png')} style={{height:100, width:100, marginTop:'20%'}}/>
            <Text style={{fontSize:28, fontFamily:'Gilroy-Bold', color:theme.colors.white, marginTop:'5%'}}>{total.toLocaleString()} <Text style={{color:theme.colors.green, fontFamily:'Gilroy-Medium'}}>$</Text></Text>
        </View>
    )
}