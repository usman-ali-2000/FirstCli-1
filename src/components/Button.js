import React from "react";
import { Text, TouchableOpacity } from "react-native";
import theme from "../Theme/GlobalTheme";

export default function Button(props) {

    return (
        <TouchableOpacity onPress={props.onPress} style={{ width: '90%', alignItems: 'center', backgroundColor:props.backgroundColor, height: 50, justifyContent: 'center', alignSelf: 'center', marginTop: '5%', borderRadius: 8 }}>
            <Text style={{ color: theme.colors.white }}>
                {props.text}
            </Text>
        </TouchableOpacity>
    )
}