import React from "react";
import { Text, View } from "react-native";
import Styles from "./Style";
import Header from "../../components/Header/Index";
import SettingItem from "../../components/SettingItem/Index";

const Settings=({navigation})=>{

    return(
        <View style={Styles.container}>
            <Header text="Settings" onpress={()=>navigation.goBack()}/>
            <SettingItem text="Privacy Policy" onpress={()=>navigation.navigate('PrivacyPolicy')}/>
            <SettingItem text="Term of Use" onpress={()=>navigation.navigate('Terms')}/>
        </View>
    )
}

export default Settings;