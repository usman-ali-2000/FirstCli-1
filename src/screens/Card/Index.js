import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Image, FlatList, TouchableOpacity } from "react-native";
import Styles from "./Style";

const Card=({navigation})=>{

 const [no, setNo] = useState(7);
 const [id, setId] = useState();

 const handleNo=(id)=>{
    setNo(no+4);
    setId(id);
 }

    const Data = [
        { 
            id:0,
            image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
            heading: 'Harmony Haven Community Park Groundbreaking Ceremony',
            text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including jfogjeo gjgoei gj .',
            detail: '11 Court Roadd, Fairfield NSW, Australia',
            year:'Feb 2024',
            day: 'SAT',
            date:'10',
            time:'03:30 pm - 06:30 pm'

    },{ 
        id:1,
        image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
        heading: 'Harmony Haven Community Park Groundbreaking Ceremony',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.',
        detail: '11 Court Roadd, Fairfield NSW, Australia',
        year:'Feb 2024',
        day: 'SAT',
        date:'10',
        time:'03:30 pm - 06:30 pm'

}
];


const renderItem = ({ item, index }) => (
    <View style={Styles.container}>
        <View style={Styles.header}>
        <Text style={Styles.year}>{item.year}</Text>
        </View>
        <Text style={Styles.day}>{item.day}</Text>
        <Text style={Styles.date}>{item.date}</Text>
        <Text style={Styles.time}>{item.time}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('CardDetail')}>
        <Text style={Styles.heading}>{item.heading}</Text>
        </TouchableOpacity>
        <Text style={Styles.text} numberOfLines={item.id === id? no : 7}>{item.text}</Text>
        <Pressable onPress={()=>handleNo(item.id)}>
        <Text style={Styles.showmore}>Show More</Text>
        </Pressable>
        <Image source={{uri:item.image}} style={Styles.image}/>
    </View>
);

    return(
        <FlatList
        showsVerticalScrollIndicator={false}
        data={Data}
        keyExtractor={(item, index)=>item.id}
        renderItem={renderItem}
        />
    )
}
export default Card;