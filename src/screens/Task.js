import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import { TouchableOpacity } from "react-native";

export default function Task() {
    const [select, setSelect] = useState(1);

    return (
        <View style={{ flex: 1, width: '100%', alignItems: 'center', backgroundColor: theme.colors.black }}>
            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors, backgroundColor: theme.colors.grey, height: 50, borderRadius: 12, marginTop: '10%' }}>
                <TouchableOpacity onPress={() => setSelect(1)} style={{
                    width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 1 ? theme.colors.green : theme.colors.grey
                    , height: 50, borderRadius: 12
                }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Gilroy-SemiBold', color: select === 1 ? theme.colors.white : theme.colors.black }}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelect(2)} style={{
                    width: '50%', alignItems: 'center', justifyContent: 'center', backgroundColor: select === 2 ? theme.colors.green : theme.colors.grey
                    , height: 50, borderRadius: 12
                }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Gilroy-SemiBold', color: select === 2 ? theme.colors.white : theme.colors.black }}>Complete</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: '10%', backgroundColor: theme.colors.grey, borderRadius: 8, elevation: 5, justifyContent:"space-between", paddingTop:10, paddingLeft:10 }}>
                <View style={{width:'20%', alignItems:'center', justifyContent:'center', marginBottom:5}}>
                <Image source={require('../assets/images/task.png')} style={{ height: 40, width: 40 }} />
                </View>
                <View style={{ flexDirection: 'column', paddingLeft: '4%', width: '80%', alignSelf:'flex-ends' }}>
                    <Text style={{ colors: theme.colors.white, fontSize: 18, color: theme.colors.black, fontFamily: 'Gilroy-SemiBold', }}>Subscribe My Youtube</Text>
                    <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.red, fontFamily: 'Gilroy-Medium', paddingTop: '1%' }}>Subscribe and watch video</Text>
                    <Text style={{ colors: theme.colors.white, fontSize: 14, color: theme.colors.white, fontFamily: 'Gilroy-Medium', padding: '1%', backgroundColor:select === 1?theme.colors.red:theme.colors.green, width:100, textAlign:'center' , alignSelf:'flex-end', borderBottomRightRadius:4, borderTopLeftRadius:8, marginTop:5}}>{select === 1?'pending':'completed'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}