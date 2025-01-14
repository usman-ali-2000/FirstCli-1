import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import theme from './src/Theme/GlobalTheme';
import { TouchableOpacity } from 'react-native';
import EnterOTP from './src/screens/EnterOTP';
import ForgotPassword from './src/screens/ForgotPassword';
import ForgotOTP from './src/screens/ForgotOTP';
import ChangePassword from './src/screens/ChangePassword';
import Splash from './src/screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Wallet from './src/screens/Wallet';
import Terms from './src/screens/Terms';
import Working from './src/screens/Working';
import Payment from './src/screens/Payment';
import { BaseUrl } from './src/assets/Data';
import Icon from "react-native-vector-icons/FontAwesome";
import Task from './src/screens/Task';
import { MenuProvider } from 'react-native-popup-menu';
import ManageCoin from './src/screens/ManageCoin';
import History from './src/screens/History';
import Notification from './src/screens/Notification';
import Help from './src/screens/Help';
import CustomAlert from './src/components/CustomAlert';
import Deposit from './src/screens/Depost';
import Guide from './src/screens/Guide';
import AboutUs from './src/screens/AboutUs';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



const MyDrawer = () => {

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const id = await AsyncStorage.getItem("id");
    try {
      setLoading(true);
      const response = await fetch(`${BaseUrl}/register/${id}`);
      const json = await response.json();
      console.log('json:', json);
      setUserData(json);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('error fetching...', e);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  const hanldeLogout = async () => {
  }



  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.white,
        },
      }}
      drawerContent={({ navigation }) => (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: '5%', height: 100 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ borderWidth: 2, borderColor: theme.colors.purple, borderRadius: 100, flexDirection: 'row', height: 52, width: 52, alignItems: 'center', justifyContent: 'center', }}>
              <Image style={{ height: 48, width: 48, borderRadius: 100, padding: 2 }} source={require('./src/assets/images/user.png')} />
            </TouchableOpacity>
            <View style={{ marginLeft: '5%', marginTop: '2%', width: '70%', }}>
              <Text style={{ fontSize: 18, fontFamily: 'Gilroy-Bold', color: theme.colors.black, width: '90%' }}>{userData?.name}</Text>
              <Text style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold', color: theme.colors.darkGrey, }}>ID: {userData?.generatedId}</Text>
              <Text style={{ fontSize: 14, fontFamily: 'Gilroy-Bold', color: theme.colors.purple, width: '90%' }}>Level {userData?.accType === 'fresh' ? 0 : userData?.accType === 'working' ? 'A' : 'B'}</Text>
            </View>
          </View>
          <CustomAlert
            title="Logout"
            message="Are you sure you want to logout?"
            onCancel={() => setShowModal(false)}
            onConfirm={async () => {
              await AsyncStorage.removeItem("id");
              await navigation.replace("Login");
              setShowModal(false);
            }}
            visible={showModal}
          />
          <View style={{ width: '100%', alignItems: 'center', borderTopWidth: 0, borderBottomWidth: 0, borderColor: theme.colors.white }}>
            <TouchableOpacity onPress={() => navigation.navigate('Wallet')} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%', }}>
              <MaterialIcon name="wallet" size={26} color={theme.colors.darkGrey} />
              <Text style={{ fontSize: 16, color: theme.colors.darkGrey, marginLeft: '5%', fontFamily: 'Gilroy-SemiBold' }}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ManageCoin', { type: 'nfuc' })} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%', }}>
              <Icon name="share" size={24} color={theme.colors.darkGrey} />
              <Text style={{ fontSize: 16, color: theme.colors.darkGrey, marginLeft: '5%', fontFamily: 'Gilroy-SemiBold' }}>Share Nfuc</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Help')} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%', }}>
              <MaterialIcon name="help" size={26} color={theme.colors.darkGrey} />
              <Text style={{ fontSize: 16, color: theme.colors.darkGrey, marginLeft: '5%', fontFamily: 'Gilroy-SemiBold' }}>Help / Support</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(true)} style={{ flexDirection: 'row', alignItems: 'center', width: '100%', padding: '5%', }}>
              <MaterialIcon name="logout" size={22} color={theme.colors.red} />
              <Text style={{ fontSize: 16, color: theme.colors.red, marginLeft: '5%', fontFamily: 'Gilroy-Bold' }}>Logout</Text>
            </TouchableOpacity>
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
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Splash'
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SignUp'
            component={SignUp}
            options={{ headerShown: false }}
          />
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
          <Stack.Screen
            name='EnterOTP'
            component={EnterOTP}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ForgotPassword'
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ForgotOTP'
            component={ForgotOTP}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ChangePassword'
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Wallet'
            component={Wallet}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Terms'
            component={Terms}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Working'
            component={Working}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Payment'
            component={Payment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Task'
            component={Task}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ManageCoin'
            component={ManageCoin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='History'
            component={History}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Notification'
            component={Notification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Help'
            component={Help}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Deposit'
            component={Deposit}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Guide'
            component={Guide}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='AboutUs'
            component={AboutUs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  )
}

export default App;

const styles = StyleSheet.create({})