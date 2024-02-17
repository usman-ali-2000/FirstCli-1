import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Styles from "./Style";
import ForumPoint from "../../components/ForumPoint/Index";

const Forums=()=>{

    const [comment, setComment] = useState('');
    const [commentData, setCommentData] = useState([
        {   id:0,
            name: 'kajal',
            comment:'Grateful to be part of this forum discussing the Waverley Aged Care Council Project. Your diverse perspectives and insights are invaluable in community where our seniors thrive. Lets continue meaningful dialogue!'
        }
    ])
    
    const handleComment=(txt)=>{
        setComment(txt);
    }

    const handleSubmit=()=>{
        const commentArr = [
            ...commentData,
            {
                   id:1,
                name: 'kajal',
                comment: comment
            }
        ]
            setCommentData(commentArr);
            setComment('');
    }

    const Data = [
        { 
            id:0,
            heading: 'Waverley Aged Care Forum: Engage, Share, Connect',
            text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    
        }]

        const Data2 = [
            {
                name:'Introduction:',
                detail:'share a bit about yourself and your connection to aged care in Waverley'
            },{
                name:'Community Insight:',
                detail:'share your thoughts on current state of aged care services in our community.'
            },{
                name:'Wellness Tips and Tricks:',
                detail:'Exchange tips for promoting health and wellness among seniors'
            }
        ]

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View  style={Styles.container}>
            <Text style={Styles.heading}>{Data[0].heading}</Text>
            <Text style={Styles.date}>Created 2 weeks ago</Text>
            <Text style={Styles.detail}>{Data[0].text}</Text>
            {Data2.map((item)=><ForumPoint name={item.name} detail={item.detail} />)}
            <Text style={Styles.comment}>Comments<Text style={Styles.star}>*</Text></Text>
            <TextInput 
            style={Styles.input}
            textAlignVertical="top"
            value={comment}
            onChangeText={handleComment}
            />
            <TouchableOpacity onPress={handleSubmit}>
            <View style={Styles.submitcontainer}>
                <Text style={Styles.submit}>Submit</Text>
            </View>
            </TouchableOpacity>
            <Text style={Styles.commentnumbers}>{commentData.length === 0 ?'':commentData.length}Comment</Text>
            {commentData.map((item)=>
            <View>
            <Text style={Styles.name}>{item.name}:</Text>
            <Text style={Styles.commenttext}>{item.comment}</Text>
        </View>
            )}
        </View>
        </ScrollView>
    )
}
export default Forums;