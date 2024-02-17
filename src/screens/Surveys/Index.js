import React from "react";
import { View, Text, ScrollView } from "react-native";
import Styles from "./Style";
import SquareRadio from "../../components/SquareRadio/Index";
import CircleRadio from "../../components/CircleRadio/Index";

const Surveys=()=>{

    
    const Data = [
        { 
            id:0,
            heading: 'Waverley Aged Care Survey: Engage, Share, Connect',
            text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.',
    
        }]


    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.container}>
            <Text style={Styles.heading}>{Data[0].heading}</Text>
            <Text style={Styles.desc1}>Dear Waverley Residents,</Text>
            <Text style={Styles.desc1}>{Data[0].text}</Text>
            <Text style={Styles.question} >Are you aware of existing aged care services in Waverley?</Text>
            <SquareRadio text="Yes"/>
            <SquareRadio text="No"/>
            <Text style={Styles.question} >If yes, which services are you familiar with or have utilized? (Select all that apply)</Text>
            <CircleRadio text="Home Assistance"/>
            <CircleRadio text="Health Check-ups"/>
            <CircleRadio text="Social Events"/>
            <Text style={Styles.question} >How important do you think regular health check-ups and wellness programs are for seniors?</Text>
            <SquareRadio text="Not important at all"/>
            <SquareRadio text="Slightly important"/>
            <SquareRadio text="Moderatelt important"/>
            <SquareRadio text="Very important"/>
            <Text style={Styles.question} >Do you believe technology workshops for seniors are important for connectivity and access to online resources?</Text>
            <CircleRadio text="Yes"/>
            <CircleRadio text="No"/>
            <View style={Styles.submitcontainer}>
                <Text style={Styles.submit}>Submit</Text>
            </View>
            </View>
            </ScrollView>
    )
}
export default Surveys;