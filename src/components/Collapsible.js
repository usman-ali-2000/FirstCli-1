import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import theme, { colors } from "../Theme/GlobalTheme";
// import { wp } from "../assets/Data";

export default function Collapsible1(props) {
    
    const { heading, text, content, onSelect } = props;
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState('');

    const toggleCollapsed = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleSelect = (item) => {
        setSelected(item);
        setIsCollapsed(true);
        if (onSelect) {
          onSelect(item);
        }
      };

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.textHeading}>{heading}</Text>
            <TouchableOpacity onPress={toggleCollapsed} style={styles.ButtonContainer}>
                <Text style={styles.dropDownText}>{selected !== ''? selected : text}</Text>
                {isCollapsed ? <Image style={styles.arrow} source={require('../assets/images/down-arrow.png')} /> :
                    <Image style={styles.arrow} source={require('../assets/images/top-arrow.png')} />}
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                <View style={styles.content}>
                    {content?.map((item, index) => (
                        <TouchableOpacity onPress={()=>{setIsCollapsed(true); handleSelect(item);}}>
                        <Text key={index} style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Collapsible>
        </View>
    );
}

const styles = StyleSheet.create({
    textHeading:{
        width:'90%',
        fontSize: 12,
        fontFamily: 'Gilroy-SemiBold',
        padding: '1%',
        paddingLeft: 0,
        color: theme.colors.darkGrey,
        marginBottom: 5,
        marginTop:'5%'
    },
    arrow:{
        height:20,
        width:20
    },
    ButtonContainer:{
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:1,
        borderRadius:3,
        height:48,
        padding:10,
        backgroundColor:theme.colors.white,
        borderColor:theme.colors.grey,
    },
    content: {
        padding: 10,
        borderRadius: 5,
        margin:10,
        backgroundColor:theme.colors.white,
        elevation:5,
        width:300,
    },
    dropDownText:{
        fontSize:14,
        fontFamily:'Gilroy-Medium',
        width:'75%',
        paddingLeft:'3%',
        color:theme.colors.grey,
    },
    itemText: {
        fontSize: 14,
        fontFamily: 'Gilroy-Regular',
        color: theme.colors.darkGrey,
        marginBottom: 5,
        padding:5,
        width:'100%',
    }
});
