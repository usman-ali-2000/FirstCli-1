import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";

export default function AboutUs({ navigation }) {

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.lightGrey }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.black} style={{ marginTop: '10%', marginLeft: '5%' }} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.black, fontSize: 18, fontFamily: 'Gilroy-Bold', marginLeft: '5%' }}>About Us</Text>
            </View>
            <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 22, marginTop: '5%' }}>About Us</Text>
            <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%', lineHeight: 18 }}>Welcome to <Text style={{ fontFamily: 'Gilroy-SemiBold' }}>WingedX </Text> – where innovation meets simplicity.</Text>
            <Text style={{ width: '90%', fontFamily: 'Gilroy-Medium', color: theme.colors.black, fontSize: 14, marginTop: '2%', lineHeight: 18 }}>
                At WingedX, we are dedicated to empowering users with tools that streamline everyday tasks and enhance productivity. Whether you're managing your schedule, staying connected, or achieving your personal goals, WingedX is your trusted companion every step of the way.
                Our app is designed with you in mind. With a user-friendly interface, cutting-edge features, and seamless functionality, WingedX transforms complex challenges into effortless solutions.
                We believe in a future where technology adapts to your needs, not the other way around. That’s why our team is constantly working to bring you the latest advancements, ensuring you stay ahead in an ever-evolving world.
                Join us on this journey, and let WingedX help you spread your wings toward success.</Text>
        </View>
    )
}