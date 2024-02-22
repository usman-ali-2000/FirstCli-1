import React from "react";
import { View, Text, Alert, ImageBackground, TouchableOpacity, ScrollView, FlatList } from "react-native";
import Styles from "./Style";
import Path from "../../components/Path/Index";
import Join from "../../components/Join/Index";
import FlatItem2 from "../../components/FlatItem2/Index";
import Contact from "../../components/Contact/Index";

const Detail =({navigation})=>{

    
   const  name = 'Perth Gandhi';
   const phone = '99999999999';
   const email= 'perthg@gmail.com';

    const Data = [
        { 
            id:0,
            image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
            heading: 'New Library At Fairfield Council',
            text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.',
            detail: '11 Court Roadd, Fairfield NSW, Australia',
            btn1:'See Details', 
            btn2:'View Maps' 
            },{ 
        id:1,
        image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
        heading: 'New Library At Fairfield Council',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.',
        detail: '11 Court Roadd, Fairfield NSW, Australia',
        btn1:'See Details', 
        btn2:'View NewsFeed' 
        },{ 
    id:2,
    image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
    heading: 'New Library At Fairfield Council',
    text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.',
    detail: '11 Court Roadd, Fairfield NSW, Australia',
    btn1:'See Details', 
    btn2:'View Forums' 
    
},{ 
    id:3,
    image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
    heading: 'New Library At Fairfield Council',
    text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including.',
    detail: '11 Court Roadd, Fairfield NSW, Australia',
    btn1:'See Details', 
    btn2:'View Surveys' 
    }
    ];

    const handleJoin=()=>{
Alert.alert('join pressed...');
    }
    
    const handleLogin=()=>{
        Alert.alert('login pressed...');
            }

            const handlePress1=()=>{
                navigation.navigate('Card');
                    }
        
    const handlePress2=(getItem)=>{
        if(getItem === 'View Forums'){
            navigation.navigate('Forums');
    }else if(getItem === 'View Surveys'){
        navigation.navigate('Surveys');
    }else if(getItem === 'View NewsFeed'){
        navigation.navigate('NewsFeed')
    }
            }
            
    const handlePressphone=()=>{
        Alert.alert('Pressphone pressed...');
            }
            
    const handlePressemail=()=>{
        navigation.navigate('ContactUs');
            }

            
    const renderItem = ({ item }) => (
        <View style={Styles.flatcontainer}>
        <FlatItem2 
        image={item.image} 
        heading={item.heading} 
        detail={item.detail} 
        btn1={item.btn1} 
        btn2={item.btn2} 
        press1={handlePress1}
        press2={()=>handlePress2(item.btn2)}/>
        </View>
    );

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.container}>
            <ImageBackground style={Styles.backimg} source={{uri:Data[0].image}}>
                <View style={Styles.backcontainer}>
                    <Text style={Styles.backheading} numberOfLines={2}>{Data[0].heading}</Text>
                    <Text style={Styles.backtext}                 
                        numberOfLines={6}>{Data[0].text}</Text>
                          <TouchableOpacity>
                          <View style={Styles.followcontainer}>
                            <Text style={Styles.followtxt}>Follow</Text>
                          </View>
                          </TouchableOpacity>
                </View>
            </ImageBackground>
            <Text style={Styles.heading}>Description</Text>
            <Text style={Styles.text}>{Data[0].text}</Text>
            <Join joinpress={handleJoin} loginpress={handleLogin}/>
            <View style={Styles.flatcontainer2}>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={Data}
            keyExtractor={(item)=>item.id}
            renderItem={renderItem}
            />
            </View>
            <Contact name={name} phone={phone} email={email} pressphone={handlePressphone} pressemail={handlePressemail} presscontactus={()=>navigation.navigate('ContactUs')}/>
        </View>
        </ScrollView>
    )
}

export default Detail;