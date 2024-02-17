import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Styles from "./Style";

const FlatItem2=(props)=>{

    return(
        <View style={Styles.container}>
            <View style={Styles.container2}>
            {props.image?<Image style={Styles.image} source={{uri:props.image}}/>:<View style={Styles.image}/>}
            <View style={Styles.container3}>
            <Text style={Styles.heading} numberOfLines={1}>{props.heading}</Text>
            <Text style={Styles.detail} numberOfLines={1}>{props.detail}</Text>
        </View>
        </View>
                        <View style={Styles.container2}>
                         <TouchableOpacity onPress={props.press1}>
                          <View style={Styles.btncontainer}>
                            <Text style={Styles.btntxt}>{props.btn1}</Text>
                          </View>
                          </TouchableOpacity>
                         <TouchableOpacity onPress={props.press2}>
                          <View style={Styles.btncontainer2}>
                            <Text style={Styles.btntxt2}>{props.btn2}</Text>
                          </View>
                          </TouchableOpacity>
        </View>
        </View>
    )
}

export default FlatItem2;