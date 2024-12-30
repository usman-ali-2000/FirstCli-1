import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../Theme/GlobalTheme";

export default function History({ navigation }) {

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding:'5%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'flex-start' }}>
                    <Icon name="chevron-left" size={18} color={theme.colors.black} style={{ marginTop: '10%', marginLeft: '5%' }} />
                </TouchableOpacity>
                <Text style={{ color: theme.colors.black, fontSize: 18, fontFamily: 'Gilroy-SemiBold', marginLeft: '5%' }}>History</Text>
            </View>
        </View>
    )
}