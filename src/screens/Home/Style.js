import React from "react";
import { Fonts } from "../../Theme/Fonts";
import theme from "../../Theme/GlobalTheme";


const Styles = {
    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: theme.colors.black,
        // justifyContent: 'space-between'
        // alignItems: 'center',
    },
    heading: {
        fontSize: 25,
        fontFamily: Fonts.Gilroy_Bold,
        padding: 10,
        color: 'black',
        width: '90%',

    },
    flatcontainer: {
        alignItems: 'center',
        marginTop: 20,
        width: '46%',
        marginLeft: '2%',
        borderRadius: 8
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        elevation: 5
    },
    gear: {
        height: 30,
        width: 30,
        margin: 15
    },
    slide: {
        backgroundColor: theme.colors.black,
        padding: 5,
        paddingLeft: 15,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 100,
        borderRadius: 15,
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 30,
        borderRightWidth: 60,
        borderBottomWidth: 80,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#4A90E2',
    }
}

export default Styles;