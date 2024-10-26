import React from "react";
import { Image, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import { TouchableOpacity } from "react-native";

export default function Task() {

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.black }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: '10%', backgroundColor: theme.colors.grey, padding: 10, borderRadius: 8, elevation: 5 }}>
                <Image source={require('../assets/images/task.png')} style={{ height: 40, width: 40 }} />
                <View style={{ flexDirection: 'column', paddingLeft: '4%', width: '80%', }}>
                    <Text style={{ colors: theme.colors.white, fontSize: 18, color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', }}>Subscribe My Youtube</Text>
                    <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.red, fontFamily: 'Gilroy-Medium', paddingTop: '1%' }}>Subscribe and watch video</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: '5%', backgroundColor: theme.colors.grey, padding: 10, borderRadius: 8, elevation: 5 }}>
                <Image source={require('../assets/images/task.png')} style={{ height: 40, width: 40 }} />
                <View style={{ flexDirection: 'column', paddingLeft: '4%', width: '80%', }}>
                    <Text style={{ colors: theme.colors.white, fontSize: 18, color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', }}>Subscribe My Youtube</Text>
                    <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.red, fontFamily: 'Gilroy-Medium', paddingTop: '1%' }}>Subscribe and watch video</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}