import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Home from "../screens/Home/Index";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AddCategory from "../screens/AddCategory";
import Friends from "../screens/Friends";
import Leadership from "../screens/Leadership";
import Profile from "../screens/Profile";
import Task from "../screens/Task";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  //   const [userId, setUserId] = useState(null);

  //   // Fetch the id from AsyncStorage
  //   useEffect(() => {
  //     const fetchUserId = async () => {
  //       const id = await AsyncStorage.getItem("id");
  //       setUserId(id);
  //     };
  //     fetchUserId();
  //   }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: '8%',
          backgroundColor:theme.colors.black
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            height: "40%",
            fontSize: 12,
            fontFamily: "OpenSans-Regular",
          },
          tabBarActiveBackgroundColor: theme.colors.black,
          tabBarInactiveBackgroundColor:theme.colors.black,
          tabBarActiveTintColor: theme.colors.green,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Icon name="home" size={28} color={focused ? theme.colors.green : theme.colors.white} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Gilroy-SemiBold",
                  color: focused ? theme.colors.green : theme.colors.white,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            height: "40%",
            fontSize: 12,
            fontFamily: "OpenSans-Regular",
          },
          tabBarActiveBackgroundColor: theme.colors.black,
          tabBarInactiveBackgroundColor:theme.colors.black,
          tabBarActiveTintColor: theme.colors.green,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MaterialIcon name="attribution" size={28} color={focused ? theme.colors.green : theme.colors.white} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Gilroy-SemiBold",
                  color: focused ? theme.colors.green : theme.colors.white,
                }}>
                  Friends
              </Text>
            </View>
          ),
        }}
        name="Friends"
        component={Friends}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            height: "40%",
            fontSize: 12,
            fontFamily: "OpenSans-Regular",
          },
          tabBarActiveBackgroundColor: theme.colors.black,
          tabBarInactiveBackgroundColor:theme.colors.black,
          tabBarActiveTintColor: theme.colors.green,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MaterialIcon name="article" size={26} color={focused ? theme.colors.green : theme.colors.white} />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Gilroy-SemiBold",
                  color: focused ? theme.colors.green : theme.colors.white,
                }}>
                  Task
              </Text>
            </View>
          ),
        }}
        name="Task"
        component={Task}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabelStyle: {
            height: "40%",
            fontSize: 12,
            fontFamily: "OpenSans-Regular",
          },
          tabBarActiveBackgroundColor: theme.colors.black,
          tabBarInactiveBackgroundColor:theme.colors.black,
          tabBarActiveTintColor: theme.colors.green,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
             <MaterialIcon name="ads-click" size={28} color={focused ? theme.colors.green : theme.colors.white} />
             <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Gilroy-SemiBold",
                  color: focused ? theme.colors.green : theme.colors.white,
                }}>
                  Leadership
              </Text>
            </View>
          ),
        }}
        name="Leadership"
        component={Leadership}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  home: {
    height: 24,
    width: 24,
    marginTop: "2%",
  },
  profile: {
    height: 21,
    width: 16,
  },
  activity: {
    height: 22,
    width: 16,
  },
});
