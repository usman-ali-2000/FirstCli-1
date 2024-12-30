import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import theme from "../Theme/GlobalTheme";


const LoginInput = (props) => {

    return (
        <View style={[styles.container, { backgroundColor: props.backgroundColor ? props.backgroundColor1 : theme.colors.white }]}>
            <Text style={[styles.text]}>{props.text}</Text>
            <View style={[styles.inputContainer, { backgroundColor: props.backgroundColor ? props.backgroundColor : theme.colors.white }]}>
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={theme.colors.black}
                    style={styles.input}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    secureTextEntry={props?.secureTextEntry}
                    keyboardType={props?.keyboardType} />
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


    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 47,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        borderColor: theme.colors.darkGrey,
    },
    input: {
        height: 52,
        color: theme.colors.black,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        textAlignVertical: 'center',
        paddingTop: 15,
        width: '100%',
        paddingLeft:10
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
        color: theme.colors.jetBlack,
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