import React, { useEffect } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import Styles from "./Style";
import FlatItem from "../../components/FlatItem/Index";

const Home=({navigation})=>{

    const Data = [
        { 
            id:0,
            image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
            heading: 'New Library At Fairfield Council',
            text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            lastupdate:'3 days',
        },
                { 
            id:1,
            image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
            heading: 'New Library At Fairfield Council',
            text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            lastupdate:'3 days',
        }

    ];

    const renderItem = ({ item }) => (
        <View style={Styles.flatcontainer}>
        <FlatItem
            image={item.image} 
            heading={item.heading} 
            text={item.text} 
            lastupdate={item.lastupdate}
            onpress={()=>handleLearnMore()}
        />
        </View>
    );

    const handleLearnMore=()=>{
        navigation.navigate('Detail');
    }

    useEffect(()=>{
        // console.log('data:', Data);
    },[])

    return(
        <View style={Styles.container}>
            <Text style={Styles.heading}>Projects Open For Feedback</Text>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            keyExtractor={(item)=>item.id}
            renderItem={renderItem}
            />
        </View>
    )
}

export default Home;