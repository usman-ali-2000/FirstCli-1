import React from "react";
import { ScrollView, Text, View } from "react-native";
import Styles from "./Style";
import Header from "../../components/Header/Index";
import SquareRadio from "../../components/SquareRadio/Index";

const PriavcyPolicy=({navigation})=>{

    return(
        <View style={Styles.container}>
            <Header text="Privacy Policy" onpress={()=>navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={Styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
               specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in
                 the 1960s {`\n`} with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus PageMaker including
                   versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                     text ever since the 1500s, when an unknown printer took a galley of type and 
                     scrambled it to make a type specimen book. It has survived not only five 
                     centuries, but also the leap into electronic typesetting, remaining essentially 
                     unchanged. {`\n`}  It was popularised in the 1960s with the release of Letraset sheets 
                     containing Lorem Ipsum passages, and more recently with desktop publishing software 
                     like Aldus PageMaker including versions of Lorem Ipsum.   Lorem Ipsum is simply 
                     dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                     industry's standard dummy text ever since the 1500s, {`\n`}  when an unknown printer took a 
                     galley of type and scrambled it to make a type specimen book. It has survived not only five 
                     centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                     sheets containing  {`\n`} Lorem Ipsum passages, and more recently with desktop publishing 
                     software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply 
                     dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                     industry's standard dummy text ever since the 1500s, when an unknown printer took a 
                     galley of type and scrambled it to make {`\n`}  a type specimen book. It has survived not only five 
                     centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                     sheets containing Lorem Ipsum passages, and more recently with desktop publishing 
                     software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                     <SquareRadio text="I agree to the Privacy Policy"/>
            </ScrollView>
        </View>
    )
}
export default PriavcyPolicy;