import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Collapsible from 'react-native-collapsible'


const CollapsableView = (props) => {
    const { onPress, question, answer, style, collapsed, arrowIcon } = props
    return (
        <View>
            <TouchableOpacity style={[styles.dropDownButton, style]} onPress={onPress}>
                <View style={styles.openDropDowninner}>
                    <View style={{ width: '94%' }}>
                        <Text style={styles.detailLabel}>{question}</Text>
                    </View>
                </View>
                {arrowIcon}
            </TouchableOpacity >

            <Collapsible collapsed={collapsed} duration={550}>
                <View style={styles.CollaspsedStyle}>
                    <Text style={styles.Answer}>{answer}</Text>
                </View>
            </Collapsible>
        </View>
    )
}

export default CollapsableView

const styles = StyleSheet.create({
    dropDownButton: {
        flexDirection:'column',
        width: '100%',
        alignSelf: 'center',
        paddingVertical:5,
        marginTop: '4%',
        paddingHorizontal: '3.5%',
        borderRadius: 12,
        backgroundColor:'white',
        flexDirection:'row'
    },
    CollaspsedStyle: {
        flex: 1,
        marginTop: '4%',
        paddingVertical:5,
        paddingHorizontal: '2.5%',
        alignSelf: 'center',
        width: '100%',
        backgroundColor:'white',
        borderRadius: 12,

    },
    Answer: {
        fontSize: 15,
        color:'grey'
    },
    detailLabel: {
      color:'black'
    },
    openDropDowninner: {
        flex: 1,
        flexDirection:'column'
    },
    toparrow:{
        height:20,
        width:20
    },
    downarrow:{
        height:20,
        width:20
    }

})