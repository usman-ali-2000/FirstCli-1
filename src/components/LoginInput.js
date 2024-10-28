import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";


const LoginInput = (props) => {

    return (
        <View style={styles.container}>
            <Text style={[styles.text]}>{props.text}</Text>
            <View style={[styles.inputContainer]}>
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={theme.colors.grey}
                    style={styles.input}
                    onChangeText={props.onChangeText}
                    value={props.value} 
                    keyboardType={props?.keyboardType}/>
            </View>
        </View>
    )
}
export default LoginInput

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '5%',
        alignSelf: 'flex-start',
        marginLeft: '6%',
        backgroundColor:theme.colors.black,

    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 47,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderColor: theme.colors.grey,
        backgroundColor:theme.colors.black,
    },
    input: {
        height: 52,
        color: theme.colors.white,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'center',
        paddingTop: 15,
        width: '100%'
    },
    eye: {
        height: 14,
        width: 21,
        marginRight: 10
    },
    text: {
        width: '100%',
        fontSize: 12,
        fontFamily: 'Gilroy-SemiBold',
        padding: '1%',
        paddingLeft: 0,
        color: theme.colors.green,
    },
    warningContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: '2%',
        alignItems: 'center'
    },
    warn: {
        height: 16,
        width: 15
    },
    warningText: {
        color: theme.colors.red,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        paddingLeft: 5
    }
})