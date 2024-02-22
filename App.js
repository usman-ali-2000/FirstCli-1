import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home/Index';
import Detail from './src/screens/Detail/Index';
import Card from './src/screens/Card/Index';
import CardDetail from './src/screens/CardDetail/Index';
import Forums from './src/screens/Forums/Index';
import Surveys from './src/screens/Surveys/Index';
import NewsFeed from './src/screens/NewsFeed/Index';
import Settings from './src/screens/Settings/Index';
import PriavcyPolicy from './src/screens/PrivacyPolicy/Index';
import Terms from './src/screens/Terms/Index';
import ContactUs from './src/screens/ContactUs/Index';
import FAQs from './src/screens/FAQs/Index';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name='Home'
        component={Home}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Detail'
        component={Detail}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Card'
        component={Card}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='CardDetail'
        component={CardDetail}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Forums'
        component={Forums}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Surveys'
        component={Surveys}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='NewsFeed'
        component={NewsFeed}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Settings'
        component={Settings}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='PrivacyPolicy'
        component={PriavcyPolicy}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Terms'
        component={Terms}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='ContactUs'
        component={ContactUs}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='FAQs'
        component={FAQs}
        options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({})