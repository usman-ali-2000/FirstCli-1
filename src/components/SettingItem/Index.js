import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Styles from "./Style";

const SettingItem=(props)=>{

    return(
        <Pressable style={Styles.container} onPress={props.onpress}>
            <Text style={Styles.text}>{props.text}</Text>
            <Image style={Styles.arrow} source={require('../../assets/images/chevron.png')}/>
        </Pressable>
    )
}
export default SettingItem;