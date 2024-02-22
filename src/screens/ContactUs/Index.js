import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Styles from "./Style";
import Header from "../../components/Header/Index";
import Input from "../../components/Input/Index";

const ContactUs=({navigation})=>{

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleFirstName=(txt)=>{
        setFirstName(txt);
    }
    
    const handleLastName=(txt)=>{
        setLastName(txt);
    }
    
    const handleEmail=(txt)=>{
        setEmail(txt);
    }
    
    const handleMessage=(txt)=>{
        setMessage(txt);
    }

    const handleSend=()=>{
        setEmail('');
        setFirstName('');
        setLastName('');
        setMessage('');
    }

    return(
        <View style={Styles.container}>
            <Header text="Contact Us" onpress={()=>navigation.goBack()}/>
            <View style={Styles.container2}>
            <View style={Styles.firstinput}>
            <Input text="First Name" value={firstName} onchange={handleFirstName}/>
            </View>
            <View style={Styles.lastinput}>
            <Input text="Last Name" value={lastName} onchange={handleLastName}/>
            </View>
            </View>
            <View style={Styles.emailcontainer}>
            <View style={Styles.email}>
            <Input text="Email" value={email} onchange={handleEmail}/>
            </View>
            </View>
            <View style={Styles.messagecontainer}>
            <View style={Styles.message}>
            <Input text="Message" value={message} onchange={handleMessage}/>
            </View>
            </View>
            <TouchableOpacity style={Styles.btncontainer} onPress={handleSend}>
                <Text style={Styles.btntext}>Send Message</Text>
            </TouchableOpacity>
            </View>
    )
}
export default ContactUs;