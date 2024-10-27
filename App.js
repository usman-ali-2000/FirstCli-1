import { Image, StyleSheet, Text, View } from 'react-native'
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
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import AddCategory from './src/screens/AddCategory';
import Product from './src/screens/Product';
import ProductView from './src/screens/ProductView';
import MyOrders from './src/screens/MyOrders';
import BottomNav from './src/navigations/BottomNav';
import 'react-native-gesture-handler';
import SnakeGame from './src/screens/SnakeGame';
import { createDrawerNavigator } from '@react-navigation/drawer';
import theme from './src/Theme/GlobalTheme';
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.jetBlack,
        },
      }}
      drawerContent={({navigation}) => (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5%', height: 100 }}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{ borderWidth: 2, borderColor: theme.colors.red, borderRadius: 100, flexDirection: 'row', height: 52, width: 52, alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ height: 48, width: 48, borderRadius: 100, padding: 2 }} source={require('./src/assets/images/user.png')} />
            </TouchableOpacity>
            <View style={{ marginLeft: '5%', marginTop: '2%' }}>
              <Text style={{ fontSize: 18, fontFamily: 'Gilroy-Bold', color: theme.colors.grey }}>Niaz Ahmed</Text>
              <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.red }}>Level 22</Text>
            </View>
          </View>
        </>
      )}
    >
      <Drawer.Screen
        options={{
          // drawerActiveBackgroundColor: theme.colors.white,
          headerShown: false,
          drawerLabelStyle: {
            fontSize: 12,
            fontFamily: "OpenSans-Medium",
            color: theme.colors.white,
            borderWidth: 1,
            borderColor: theme.colors.white,
            // marginTop:200
            // height:50,
            // width:'100%', 
          },
        }}
        name="Home" component={BottomNav}
      />
    </Drawer.Navigator>
  );
};

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name='Home'
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Game'
          component={SnakeGame}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name='Detail'
          component={Detail}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='Card'
          component={Card}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='CardDetail'
          component={CardDetail}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='Forums'
          component={Forums}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='Surveys'
          component={Surveys}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='NewsFeed'
          component={NewsFeed}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='Settings'
          component={Settings}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='PrivacyPolicy'
          component={PriavcyPolicy}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='Terms'
          component={Terms}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='ContactUs'
          component={ContactUs}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='AddCategory'
          component={AddCategory}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='Product'
          component={Product}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='ProductView'
          component={ProductView}
          options={{ headerShown: false }}
        /> */}
        {/* <Stack.Screen
          name='MyOrders'
          component={MyOrders}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({})