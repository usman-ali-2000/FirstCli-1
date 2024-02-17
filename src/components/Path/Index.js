import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Styles from "./Style";

const Path=(props)=>{

    return(
        <View style={Styles.container}>
        <TouchableOpacity onPress={props.onpress}>
            <Text style={Styles.txt}>Home / Projects</Text>
            <Text style={Styles.txt2}> /{props.heading} </Text>
            </TouchableOpacity>
        </View>
    )
}
export default Path;