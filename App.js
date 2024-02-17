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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({})