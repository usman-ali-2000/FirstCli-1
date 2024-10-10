import React from "react";
import { Fonts } from "../../Theme/Fonts";

const Styles = {
    container: {
        flexDirection: 'column',
        width: '98%',
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 8
    },
    image: {
        width: '100%',
        height: 120,
        borderTopRightRadius:8,
        borderTopLeftRadius:8,
    },
    heading: {
        fontSize: 20,
        fontFamily: Fonts.Gilroy_Bold,
        color: '#0066b2',
        width: '90%',
        margin: 10,
        marginTop:'2%',
    },
    txt: {
        fontSize: 16,
        fontFamily: Fonts.Gilroy_SemiBold,
        color: 'black',
        margin: 10,
        width: '90%',
        marginTop:'0%',
    },
    lastupdate: {
        padding: 10,
        color: 'grey',
        paddingTop:'0%',
        fontSize:20,
        fontWeight:'bold',
    },
    arrow: {
        height: 10,
        width: 10,
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 2
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#002D62',
        width: 130,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    btntxt: {
        color: 'white',
    }
}

export default Styles;