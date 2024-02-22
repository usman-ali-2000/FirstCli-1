import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";
import Styles from "./Style";

const Input=(props)=>{


    return(
        <View style={Styles.container}>
            <Text style={Styles.text}>{props.text}</Text>
            <TextInput
            textAlignVertical="top"
            style={Styles.textinput}
            multiline={true}
            value={props.value}
            onChangeText={props.onchange}
            />
        </View>
    )
}
export default Input;