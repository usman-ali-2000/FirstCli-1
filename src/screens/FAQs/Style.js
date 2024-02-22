import { StyleSheet, View, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    dropDownButton: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 5,
        marginTop: '4%',
        paddingHorizontal: '3.5%',
        backgroundColor: 'white',
        borderRadius: 12,
        height:'100%',
        backgroundColor:'white'
    },
    CollaspsedStyle: {
        flex: 1,
        marginTop: '4%',
        paddingVertical:5,
        paddingHorizontal: '2.5%',
        alignSelf: 'center',
        width: '90%',
        backgroundColor:'white',
        borderRadius: 12,
        height:'100%',

    },
    Answer: {
        fontSize: 12,
        color:'grey'
    },
    detailLabel: {
        color: 'black',
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
    },
    CollapseContainer:{
        width:'100%',
        backgroundColor:'white'
    },
    Container:{
        height:'100%',
        backgroundColor:'white'
    }

})
export default styles;