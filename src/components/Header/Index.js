import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Styles from "./Style";

const Header=(props)=>{

    return(
        <View style={Styles.container}>
            <Pressable onPress={props.onpress}>
            <Image style={Styles.arrow} source={require('../../assets/images/left-arrow.png')}/>
            </Pressable>
            <Text style={Styles.text}>{props.text}</Text>
        </View>
    )
}
export default Header;