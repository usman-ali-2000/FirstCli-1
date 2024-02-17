import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Styles from "./Style";
import MapView, { Marker } from "react-native-maps";

const CardDetail=()=>{
    const Data = [
        { 
            id:0,
            image:'https://community.connectivesphere.com/images/projects/21_10067.jpg',
            heading: 'Harmony Haven Community Park Groundbreaking Ceremony',
            text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including jfogjeo gjgoei gj .',
            detail: '11 Court Roadd, Fairfield NSW, Australia',
            year:'2024',
            month:'February',
            day: 'SAT',
            date:'10th',
            time:'03:30 pm - 06:30 pm'

    }];

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.container}>
            <Image source={{uri: Data[0].image}} style={Styles.image}/>
            <Text style={Styles.date}>{Data[0].date} {Data[0].month}</Text>
            <Text style={Styles.heading}>{Data[0].heading}</Text>
            <View style={Styles.btncontainer}>
                <Text style={Styles.btntxt}>Get Tickets</Text>
            </View>
                <View style={Styles.container2}>
                    <View style={Styles.calendarcontainer}> 
                    <View style={Styles.calendar}>
                    <Image source={require('../../assets/images/calendar.png')} style={Styles.calendarimg}/>
                    <Text style={Styles.calendarheading}> Date & Time</Text>
                    </View>
                    <Text style={Styles.duration}>Sat 10th Feb 2024, 3:30 pm - 6:30 pm</Text>
                    <Text style={Styles.add}>Add To Calendar </Text>
                    </View>
                    <View style={Styles.calendarcontainer2}> 
                    <View style={Styles.calendar}>
                    <Image source={require('../../assets/images/Location.png')} style={Styles.calendarimg}/>
                    <Text style={Styles.calendarheading}>Location</Text>
                    </View>
                    <Text style={Styles.duration}>Harmony Haven Community Hall</Text>
                    <Text style={Styles.add}>Add To Calendar </Text>
                    </View>
                </View>
                <Text style={Styles.descheading}>Event Description</Text>
                <Text style={Styles.desc}>{Data[0].text}</Text>
                <Text style={Styles.descheading}>Location</Text>
                <Text style={Styles.desc}>{Data[0].heading}</Text>
                <Text style={Styles.add}>Get Directions</Text>
                <View style={Styles.mapcontainer}>
                    <MapView
                    style={Styles.map}
                     initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                        <Marker
                            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                            title="Marker Title"
                            description="Marker Description"
                        />
                        </MapView>
                </View>
                 </View>
        </ScrollView>
    )
}

export default CardDetail;