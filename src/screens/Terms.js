import React from "react";
import { ScrollView, Text, ToastAndroid, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Clipboard from "@react-native-clipboard/clipboard";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Terms({navigation}) {

    const textToCopy = 'wingedxnetwork@gmail.com';

    const copyToClipboard = () => {
        Clipboard.setString(textToCopy);
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    };


    return (
        <View style={{ width: "100%", alignItems: 'center', flex: 1 }}>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: '5%' }}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{alignSelf:'flex-start', marginLeft:'5%', marginTop:'5%'}}>
                    <Icon name="arrow-left" size={18} color={theme.colors.black} />
                </TouchableOpacity>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>TERMS AND CONDITIONS</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>1. USE OF COIN</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '5%' }}>1.1 By using the Coin, you represent and warrant that:</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>You are at least 18 years old.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>You have the authority to enter into these Terms.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>You will comply with these Terms and applicable laws.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '5%' }}>2.1 You agree not to:</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Use the Coin for unlawful purposes..</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Exploit or manipulate the Coin's protocol.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Engage in market manipulation or fraudulent activities.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>2. RISK DISCLOSURE</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '5%' }}>1.1  You acknowledge that cryptocurrency investments carry risks, including:</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Market volatility.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Regulatory uncertainty.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Security risks.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '5%' }}>2.2  You understand that the Coin's value may fluctuate and that you may lose some or all of your investment.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>3. LIABILITY DISCLAIMER</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '5%' }}>3.1 The Developers disclaim all warranties, express or implied, including fitness for a particular purpose.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>The Developers shall not be liable for any damages, losses, or expenses arising from:</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Use or inability to use the Coin.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Transaction-related issues.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Fluctuations in market value.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Regulatory changes.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Security breaches.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Technical malfunctions.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>4. INDEMNIFICATION</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '5%' }}>4.1  You agree to indemnify, defend, and hold harmless the Developers from any claims, damages, or expenses arising from your use of the Coin.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>5. INTELLECTUAL PROPERTY</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>5.1 The Coin's intellectual property rights remain with the Developers.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>6. GOVERNING LAW</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>6.1 These Terms shall be governed by and construed in accordance with the laws of Jurisdiction.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>7. ENTIRE AGREEMENT</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>7.1 These Terms constitute the entire agreement between you and the Developers regarding your use of the Coin.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>8. CHANGES TO TERMS</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>8.1 The Developers reserve the right to modify or update these Terms at any time without prior notice.</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-Bold', color: theme.colors.black, fontSize: 18, marginTop: '5%' }}>9. CONTACT US</Text>
                <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>9.1 For questions or concerns, please contact.</Text>
                <TouchableOpacity onPress={copyToClipboard} style={{ alignSelf: 'flex-start' }}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline', alignSelf: 'flex-start', marginLeft: '5%' }}>wingedxnetwork@gmail.com</Text>
                </TouchableOpacity>
                {/* <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Use or inability to use the Coin.</Text> */}
                {/* <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Transaction-related issues.</Text> */}
                {/* <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Fluctuations in market value.</Text> */}
                {/* <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Regulatory changes.</Text> */}
                {/* <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Security breaches.</Text> */}
                {/* <Text style={{ width: '90%', fontFamily: 'Gilroy-SemiBold', color: theme.colors.black, fontSize: 14, marginTop: '1%' }}>Technical malfunctions.</Text> */}
            </ScrollView>
        </View>
    )
}