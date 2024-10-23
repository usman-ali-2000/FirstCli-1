import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../Theme/GlobalTheme";
import Home from "../screens/Home/Index";

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
          height: 60,
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
          tabBarActiveBackgroundColor: theme.colors.white,
          tabBarActiveTintColor: theme.colors.green,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                style={styles.home}
                source={require("../assets/images/homeSmile.png")}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Gilroy-SemiBold",
                  marginTop: "2%",
                  color: focused ?theme.colors.blue : theme.colors.grey,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
        name="Home"
        component={Home}
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
