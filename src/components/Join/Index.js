import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Styles from "./Style";

const Join =(props)=>{

    return(
        <View style={Styles.container}>
            <Image style={Styles.image} source={require('../../assets/images/chat.png')}/>
            <Text style={Styles.heading}>Join the discussion</Text>
            <Text style={Styles.text}>Create an account or log in to share your thoughts and ideas</Text>
                         <View style={Styles.container2}>
                         <TouchableOpacity onPress={props.joinpress}>
                          <View style={Styles.btncontainer}>
                            <Text style={Styles.btntxt}>Join</Text>
                          </View>
                          </TouchableOpacity>
                         <TouchableOpacity onPress={props.loginpress}>
                          <View style={Styles.btncontainer2}>
                            <Text style={Styles.btntxt}>Log In</Text>
                          </View>
                          </TouchableOpacity>
                          </View>
        </View>
    )
}

export default Join;