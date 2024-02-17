import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Styles from "./Style";

const SquareRadio=(props)=>{

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
            {condition?<Image style={Styles.check} source={require('../../assets/images/check.png')}/>:<View style={Styles.square}/>}
            <Text style={Styles.text}>{props.text}</Text>
        </Pressable>
        )
}

export default SquareRadio;