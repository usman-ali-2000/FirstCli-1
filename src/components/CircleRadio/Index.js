import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Styles from "./Style";

const CircleRadio=(props)=>{

    const [condition, setCondition] = useState(false);
    const handleCondition=()=>{
        if(condition){
            setCondition(false);
        }else{
            setCondition(true);
        }
    }
    return(
        <Pressable style={Styles.container} onPress={handleCondition}>
            <View style={condition?Styles.circle1:Styles.circle}/>
            <Text style={Styles.text}>{props.text}</Text>
        </Pressable>
        )
}

export default CircleRadio;