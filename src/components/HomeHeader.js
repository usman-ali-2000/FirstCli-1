import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import theme from "../Theme/GlobalTheme";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import { formatNumber } from "../assets/Data";


const HomeHeader = (props) => {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '95%' }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={props.onpress} style={{ borderWidth: 2, borderColor: theme.colors.red, borderRadius: 100, flexDirection: 'row' }}>
                    <Image style={styles.arrow} source={require('../assets/images/user.png')} />
                </TouchableOpacity>
                <View style={{ marginLeft: '2%', marginTop: '2%' }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Gilroy-Bold', color: theme.colors.grey }}>Niaz Ahmed</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.red }}>Level 22</Text>
                </View>
                <Icon name="check-circle" size={20} color={theme.colors.blue} style={{ marginLeft: "1%", marginTop: '3%' }} />
            </View>
            <View style={{flexDirection:'row', alignItems:'center', width:'30%', justifyContent:"flex-end", marginTop:'3%'}}>
                <Image source={require('../assets/images/dollar.gif')} style={{ height: 20, width: 20, marginRight:'3%' }} />
                <Text style={{fontSize:20, color:theme.colors.white, fontFamily:'Gilroy-SemiBold'}}>{formatNumber(5000)}</Text>
            </View>
        </View>
    )
}
export default HomeHeader;


const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '70%',
        flexDirection: 'row',
        // justifyContent:'space-between',
        alignItems: 'flex-start',
        padding: 10,
        elevation: 5,
        marginTop: '3%'
    },
    arrow: {
        height: 48,
        width: 48,
        borderRadius: 100,
        margin: 4
    },
    text: {
        width: '80%',
        textAlign: 'center',
        marginRight: '10%',
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    }
})