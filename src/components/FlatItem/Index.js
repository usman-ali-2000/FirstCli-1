import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Styles from "./Style";

function FlatItem(props){

    return(
        <View style={Styles.container}>
            {props.image ? <Image style={Styles.image} source={{uri:props.image}}/>:<View style={Styles.image} />}
            <Text style={Styles.heading}>{props.heading}</Text>
            <Text style={Styles.txt}
            numberOfLines={5}>{props.text}</Text>
            <Text style={Styles.lastupdate}>Last update {props.lastupdate} ago</Text>
            <TouchableOpacity onPress={props.onpress}>
            <View style={Styles.button}>
                <Text style={Styles.btntxt}>Learn More</Text>
                <Image style={Styles.arrow} source={require('../../assets/images/arrow-right.png')}/>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default FlatItem;