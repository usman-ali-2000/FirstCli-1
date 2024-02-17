import React from "react";
import { View, Text, Pressable } from "react-native";
import Styles from "./Style";

const Contact=(props)=>{

    return(
        <View style={Styles.container}>
            <View style={Styles.container1}>
            <Text style={Styles.heading}> Contact Us</Text>
            </View>
            <Text style={Styles.text}>Reach out to us if you have any query or want more information regarding the project.</Text>
            <Text style={Styles.text2}>Name      <Text>{props.name}</Text></Text>
            <Text style={Styles.text2}>Phone     <Pressable onPress={props.pressphone}><Text style={Styles.highlight}>{props.phone}</Text></Pressable></Text>
            <Text style={Styles.text2}>Email      <Pressable onPress={props.pressemail}><Text style={Styles.highlight}>{props.email}</Text></Pressable></Text>
        </View>
    )
}
export default Contact;