import React from "react";
import { Fonts } from "../../Theme/Fonts";
import theme from "../../Theme/GlobalTheme";


const Styles = {
    container:{
        height:'100%',
        width:'100%',
        flexDirection:'column',
        backgroundColor:theme.colors.black,
        justifyContent:'space-between'
        // alignItems: 'center',
    },
    heading:{
        fontSize:25,
        fontFamily:Fonts.Gilroy_Bold,
        padding:10,
        color: 'black' ,
        width:'90%',
        
    },
    flatcontainer:{
        alignItems:'center',
        marginTop:20, 
        width:'46%',
        marginLeft:'2%',
        borderRadius:8
    },
    header:{
        width:'100%',
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        backgroundColor:'white',
        elevation:5    
    },
    gear:{
        height:30,
        width:30,
        margin:15
    }
}

export default Styles;