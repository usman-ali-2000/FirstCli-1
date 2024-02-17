import React from "react";
import { Text, View } from "react-native";
import Styles from "./Style";

const ForumPoint=(props)=>{

    return(
        <View style={Styles.container}>
            <Text style={Styles.name}>{props.name}</Text>
            <Text style={Styles.detail}>{props.detail}</Text>
        </View>
    )
}
export default ForumPoint;