import { StyleSheet } from "react-native";
import { Fonts } from "../../Theme/Fonts";

const Styles = StyleSheet.create({
    container:{
        height:45,
        borderBottomWidth:1,
        width:'95%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderColor:'grey'
    },
    text:{
        fontSize:16,
        color:'black',
        fontFamily:Fonts.Gilroy_Bold,
    },
    arrow:{
        height:20,
        width:20
    }
})

export default Styles;