import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Styles from "./Style";
import ForumPoint from "../../components/ForumPoint/Index";

const NewsFeed=()=>{

    
    const Data = [
        { 
            id:0,
            image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
            heading: 'New Library At Fairfield Council',
            text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.',
            },
            { 
                id:1,
                image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
                heading: 'New Library At Fairfield',
                text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
                },
                { 
                    id:2,
                    image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
                    heading: 'New Library At Fairfield',
                    text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
                    }]

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.container}>
            <Image style={Styles.image} source={{uri: Data[0].image}}/>
            <Text style={Styles.heading}>{Data[0].heading}</Text>
            {Data.map((item)=><ForumPoint name={item.heading} detail={item.text}/>)}
            <Text style={Styles.comment}>Comments<Text style={Styles.star}>*</Text></Text>
            <TextInput 
            style={Styles.input}
            textAlignVertical="top"
            />
            <TouchableOpacity>
            <View style={Styles.submitcontainer}>
                <Text style={Styles.submit}>Submit</Text>
            </View>
            </TouchableOpacity>

        </View>
        </ScrollView>
    )
}
export default NewsFeed;